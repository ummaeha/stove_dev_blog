import React, {useState, useEffect} from 'react'

const Main = () => {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        window
        .fetch('http://localhost:4000/posts')
        .then(res => res.json())
        .then(data => setPosts(data))
        
    }, [])
    const postListStr = posts.map((content) => {
        return <div> content.title </div>
    })
    console.log(posts)
    return (
        <div>
            Here is Main page.
            {`${postListStr}`}
        </div>
    )
}

export default Main;
