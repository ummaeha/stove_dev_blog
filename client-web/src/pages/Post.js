import React, { useState, useEffect } from 'react'
import server from "../apis/server"
import HeaderText from "../components/Typography/HeaderText"
import BodyText from "../components/Typography/BodyText"
import Thread from './Thread';

const Post = (props) => {
    const [postDetailData, setPostDetailData] = useState([])
    const [postIdFromUrl, setPostIddFromUrl] = useState(props.match.params.postId)

    useEffect(() => {
        server
        .get(`http://localhost:4000/posts/${postIdFromUrl}`) //  TO DO: key value로 받으면 되겠다. -> 고민해보기
        .then(res => res)
        .then(data => setPostDetailData(data.data.postDetail[0]))
    }, [])

    return (
        <div>
            <HeaderText text={postDetailData.title}/>
            <BodyText size={16} text={postDetailData.contents}/>
            <Thread postId={props.match.params.postId} />
        </div>
    )
}

export default Post
