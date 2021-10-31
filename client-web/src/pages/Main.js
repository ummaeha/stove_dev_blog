import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import HeaderText from "../components/Typography/HeaderText"
import BodyText from "../components/Typography/BodyText"
import '../reset.css'
import './Main.css'

const Main = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        window
        .fetch('http://localhost:4000/posts')
        .then(res => res.json())
        .then(data => setPosts(data.postdata.reverse()))
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
                        <div className="align-bodytext"><BodyText fontsize={20} text={`전체글(${posts.length})`}/></div>
                        {posts != null && posts.map((content, i) => {
                            return <Link to={`${content.postId}`} className="wrap-post-content" key={i}>
                                        <hr className="hr-divider"/>
                                        <span className="post-title">{content.title}</span>
                                        <span className="post-content">{content.contents}</span>
                                    </Link>
                                    
                                    
                        })}
                        <hr className="hr-divider"/>
                    </article>
                </div>
            </section>
        </div>
    )
}

export default Main;
