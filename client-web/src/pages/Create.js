import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import server from "../apis/server"
import HeaderText from "../components/Typography/HeaderText"
import './Create.css'

const Create = (props) => {
    const [postDetail, setPostDetail] = useState({})

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
            // id autoincrease
        }
        
        server
        .post('/posts', postInitalData)
        .then(res => res)
        .then((data) => setPostDetail(data))
    }
    return (
        <div>
            <HeaderText text="제목"/>
            <input type="text" className="title" />
            <HeaderText text="내용"/>
            <textarea name="description" className="contents" cols="30" rows="10"></textarea>
            <button onClick={(e) => onsubmit(e)}><Link to={'/'}>글 쓰기 완료</Link></button>
        </div>
    )
}

export default Create;
