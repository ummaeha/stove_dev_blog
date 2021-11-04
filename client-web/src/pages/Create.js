import React, {useState, useEffect} from 'react';
import { Link , useHistory} from 'react-router-dom';
import server from "../apis/server"
import HeaderText from "../components/Typography/HeaderText"
import { getDateString, getYear, getMonthIndex, getDate } from "../components/Date/getDateString"
import './Create.css'

const Create = (props) => {
    const [postDetail, setPostDetail] = useState({})
    const history = useHistory()

    const onsubmit = (e) => {
        e.preventDefault();

        let $title = document.querySelector('.title').value
        let $contents = document.querySelector('.contents').value
        if ($title === "" || $contents === "") {
            alert("제목과 내용을 모두 작성하셔야 글쓰기가 가능합니다!");
            return;
        }

        const postInitalData = {
            userId: `${localStorage.getItem("id")}`,
            title: `${$title}`,
            contents: `${$contents}`,
            timeStamp: getDateString()
            // id autoincrease
        }
        
        server
        .post('/posts', postInitalData)
        .then(res => res)
        .then((data) => setPostDetail(data))
        .then(() => history.push("/"))
    }
    return (
        <div className="wrap-create">
            <HeaderText text="새로운 글을 작성하고 있습니다"/>
            <section className="wrap-title-area">
                <HeaderText text="제목"/>
                <input type="text" className="title" />
            </section>
            <section className="wrap-contents-area">
                <HeaderText text="내용"/>
                <textarea name="description" className="contents" cols="30" rows="10"></textarea>
            </section>
            <button onClick={(e) => onsubmit(e)} className="submit-btn">글 쓰기 완료</button>
        </div>
    )
}

export default Create;
