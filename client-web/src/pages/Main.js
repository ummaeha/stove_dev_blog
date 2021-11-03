import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import server from "../apis/server"
import HeaderText from "../components/Typography/HeaderText"
import BodyText from "../components/Typography/BodyText"
import '../reset.css'
import './Main.css'

const Main = (props) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        server
        .get('/posts')
        .then(res => res)
        .then(data => setPosts(data.data.postdata.reverse()))
    }, [])
    // console.log(props);
    const onDeleteAll = (e) => {
        // e.preventDefault();

        // server
        // .delete('/posts')
        // .then(res => res)
        // .then(data => setPosts(data)) 
    }
    const deletePost = (e, postId) => {
        e.preventDefault();

        // axios({
        //     method: 'delete', 
        //     url: `http://localhost:4000/posts/${postId}`, 
        //     // data: {
        //     //     id: `${postId}`
        //     // },
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded"
        //     },
        //     withCredentials: false
        // }) 
        server
        .delete(`/posts/${postId}`,{})
        .then(res => res)
        // .then(data => setPosts(data.data))
        // window
        // .fetch(`http://localhost:4000/posts/${postId}`,  {
        //     method: "DELETE"
        //   })
        // .then(res => {
        //     console.log(res.json());
        // })
        // .then(data => {
        //     // console.log(data.data);
        //     setPosts(data)
        // })
        // .then(data => setPosts(res.data.deletedData))
        // console.log(e,postId);
    }

    return (
        <div>
            {console.log(posts)}
            <header className="header-area">
                <HeaderText text="메인 페이지"/>
            </header>
            <section className="wrap-main-area">
                <nav className="nav-area">

                </nav>
                <div className="posts-items-align">
                    <article className="wrap-post-items">
                        
                        <div className="align-bodytext">
                            <BodyText fontsize={20} text={`전체글(${posts.length})`}/>
                            <div>
                                <Link to={'posts'} className="common-post-btn"> + Add POST</Link>
                                <Link to={''} className="common-post-btn" onClick={(e) => onDeleteAll(e)}> - DELETE POST</Link>
                            </div>
                        </div>
                        {posts && posts.map((content, i) => {
                            return <div key={i}>
                                        <hr className="hr-divider"/>
                                        <div className="wrap-post-box">
                                        <input type="checkbox" className="post-checkbox"/>
                                        <Link to={`posts/${content.id}`} className="wrap-post-content" key={i}>
                                            <span className="post-title">{content.title}</span>
                                            <span className="post-content">{content.contents}</span>
                                        </Link>  
                                    </div>
                                    <button onClick={(e) => deletePost(e, `${content.id}`)}>PUT</button>
                                    </div>
                        })}
                        <hr className="hr-divider"/>
                        <button className="more-button">목록 더보기</button>
                    </article>
                </div>
            </section>
        </div>
    )
}

export default Main;
