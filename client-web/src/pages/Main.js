import React, {useState, useEffect} from 'react'
import { Link, useHistory,useLocation } from "react-router-dom"
import server from "../apis/server"
import HeaderText from "../components/Typography/HeaderText"
import BodyText from "../components/Typography/BodyText"
import '../reset.css'
import './Main.css'

const Main = (props) => {
    const [posts, setPosts] = useState([])
    const history = useHistory()
    const location = useLocation()

    let tempDeletedPostArr = []

    const isChecked = (e) => {
        // console.log(e.target.value);
        if(e.target.checked) {
            tempDeletedPostArr.push(e.target.value)
        }
        else {
            let eraseIdx = tempDeletedPostArr.indexOf(e.target.value)
            tempDeletedPostArr.splice(eraseIdx,1)
        }
        // console.log(tempDeletedPostArr);
    }
    const onDeleteAll = (e) => {
        e.preventDefault();
        // TO DO: 전체삭제 기능 구현 -> (성공하면) -> 선택삭제 구현
        // console.log(tempDeletedPostArr);
        server
        .delete(`/posts`, {data: tempDeletedPostArr})
        .then(res => res)
        .then(() => history.go(0)) // 새로고침

        tempDeletedPostArr = []
    }
    useEffect(() => {
        server
        .get('/posts')
        .then(res => res)
        .then(data => setPosts(data.data.postData.reverse()))
    }, [])

    
    // const deletePost = (e, postId) => {
    //     e.preventDefault();
    //     // DOING: 메인페이지에서 게시글별 삭제기능을 시도중

    //     server
    //     .delete(`/posts/${postId}`, {
    //         body: 
    //     })
    //     .then(res => res)
    //     .then(data => console.log(data.data))

    //     tempDeletedPostArr = []
    // }

    return (
        <div>
            {/* {console.log(posts)} */}
            <header className="header-area">
                <HeaderText text="메인 페이지"/>
            </header>
            <section className="wrap-main-area">
                <nav className="nav-area">

                </nav>
                <div className="posts-items-align">
                    <article className="wrap-post-items">
                        
                        <div className="align-bodytext">
                            <BodyText fontsize={20} text={`전체글(${posts.length?posts.length:0})`}/>
                            <div>
                                <Link to={'posts'} className="common-post-btn"> + Add POST</Link>
                                <Link to={''} className="common-post-btn" onClick={(e) => onDeleteAll(e)}> - DELETE POST</Link>
                            </div>
                        </div>
                        {posts.length && posts.map((content, i) => {
                            // if(content.title == "") return;
                            return <div key={i}>
                                        <hr className="hr-divider"/>
                                        <div className="wrap-post-box">
                                        <input type="checkbox" className="post-checkbox" value={content.id} onClick={(e) => isChecked(e)}/>
                                        <Link to={`posts/${content.id}`} className="wrap-post-content" key={i}>
                                            <span className="post-title">{content.title}</span>
                                            <span className="post-content">{content.contents}</span>
                                        </Link>  
                                    </div>
                                    {/* <button onClick={(e) => deletePost(e, `${content.id}`)}>DELETE</button> */}
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
