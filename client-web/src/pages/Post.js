import React, { useState, useEffect } from 'react'
import server from "../apis/server"
import BodyText from "../components/Typography/BodyText"
import Thread from './Thread';
import { getDateString, getYear, getMonthIndex, getDate } from "../components/Date/getDateString"

import './Post.css'

const Post = (props) => {
    const [postDetailData, setPostDetailData] = useState([])
    const [postIdFromUrl, setPostIdFromUrl] = useState(props.match.params.postId)
    const [editMode, setEditMode] = useState(false)
    const [textTitle, setTextTitle] = useState('')
    const [textContent, setTextContent] = useState('')

    useEffect(() => {
        server
        .get(`/posts/${postIdFromUrl}`) //  TO DO: key value로 받으면 되겠다. -> 고민해보기
        .then(res => res)
        .then(data => setPostDetailData(data.data.postDetail[0]))


    }, [])

    useEffect(() => {
        setTextTitle(postDetailData.title)
        setTextContent(postDetailData.contents)
    }, [postDetailData])
    

    const handleTitleChange = (e) => {
        setTextTitle(e.target.value)
    }

    const handleContentChange = (e) => {
        setTextContent(e.target.value)
    }

    const saveChanges = (e, editMode) => {
        setEditMode(editMode)

        if(!editMode) { //true
            if(textTitle == "" || textContent == "") {
                alert("제목과 내용을 모두 작성하셔야 글 수정이 가능합니다!");
                return setEditMode(true);
            }
            else {
                const postInitalData = {
                    // userId: `${localStorage.getItem("id")}`,
                    title: `${textTitle}`,
                    contents: `${textContent}`,
                    timeStamp: getDateString(),
                    id: `${postIdFromUrl}`
                    // id autoincrease
                }
    
                server
                .put(`/posts`, { ...postInitalData})
                .then(res => res)
            }
        }

    }
    return (
        <div>
            <section className="wrap-real-post common-left">
                <div className="wrap-post-info">
                    <div>
                        {editMode ? 
                        <input type="text" value={`${textTitle}`} onChange={(e) => handleTitleChange(e)} />
                        : <h3 className="header-font-style titleText">{textTitle == '' ? postDetailData.title : textTitle}</h3>
                        }
                    </div>
                    <div className="post-info">
                        {postDetailData ? <span>{postDetailData.timeStamp}</span> : <span>NO TIMESTAMP</span>}
                        <button onClick={(e) => saveChanges(e,!editMode)}>{editMode ? 'SAVE POST' : 'EDIT POST'}</button>
                    </div>
                </div>
                <hr className="hr-divider"/>
                <div className="content-box">
                {editMode ? 
                    <textarea type="text" value={`${textContent}`} onChange={(e) => handleContentChange(e)} />
                   : <BodyText size={16} text={textContent == '' ? postDetailData.contents: textContent}/>
                }
                </div>
            </section>
            <Thread postId={props.match.params.postId} />
        </div>
    )
}

export default Post
