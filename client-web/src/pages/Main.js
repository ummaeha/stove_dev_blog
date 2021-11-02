import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import HeaderText from "../components/Typography/HeaderText"
import BodyText from "../components/Typography/BodyText"
import '../reset.css'
import './Main.css'

const Main = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios
        .get('http://localhost:4000/posts')
        .then(res => res)
        .then(data => setPosts(data.data.postdata.reverse()))
    }, [])
    // console.log(posts)
    // console.log(typeof(posts.postdata))
    return (
        <div className="set-font">
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
                            <Link to={'posts'} className="add-post-btn"> + Add POST</Link>
                        </div>
                        {posts != null && posts.map((content, i) => {
                            return <Link to={`posts/${content.postId}`} className="wrap-post-content" key={i}>
                                        <hr className="hr-divider"/>
                                        <span className="post-title">{content.title}</span>
                                        <span className="post-content">{content.contents}</span>
                                    </Link>  
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
