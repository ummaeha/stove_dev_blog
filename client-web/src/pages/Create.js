import React, {useState, useEffect} from 'react'
import axios from 'axios';
import server from "../apis/server"
import HeaderText from "../components/Typography/HeaderText"
import BodyText from "../components/Typography/BodyText"
import Thread from './Thread';
import './Create.css'

const Create = () => {
    const [postDetail, setPostDetail] = useState({})

    // useEffect(() => {
    //     const article = { title: 'React Hooks POST Request Example' };
    //     axios
    //     .post('http://localhost:4000/create', article)
    //     .then(res => console.log(res))
    //     .then(response => setPostDetail(response));
    // }, [])
    // useEffect(() => {

    // },)

    const onsubmit = (e) => {
        e.preventDefault();
        // console.log(e.target)
        let $title = document.querySelector('.title').value
        let $contents = document.querySelector('.contents').value
        if ($title === "" || $contents === "") {
            alert("All the fields are mandatory!");
            return;
        }
        // const userId = localStorage.getItem("id") ? localStorage.getItem("id") : 0
        // const article = {userId: `${userId}`, title: `${$title}`, contents: `${$contents}`}
        const article = {title: `${$title}`, contents: `${$contents}`}
        server
        .post('/posts', article)
        .then(res => res)
        .then((data) => setPostDetail(data))
    }
    return (
        <div>
            {console.log(postDetail)}
            <HeaderText text="제목"/>
            <input type="text" className="title" />
            <HeaderText text="내용"/>
            <textarea name="description" className="contents" cols="30" rows="10"></textarea>
            <button onClick={(e) => onsubmit(e)}>글 쓰기 완료</button>
            <Thread/>
        </div>
    )
}

export default Create;
