import React, {useState, useEffect} from 'react'
import axios from 'axios'
import server from "../apis/server"
import BodyText from "../components/Typography/BodyText"

const Thread = (postId) => {
    const [threadList, setThreadList] = useState([])
    console.log(postId);
    useEffect(() => {
        axios
        .get(`http://localhost:4000/thread/${postId}`)
        // .get(`http://localhost:4000/thread`)
        .then(res => res)
        .then(data => setThreadList(data.data.threadData))
    }, [])
    return (
        <div>
            {console.log(threadList)}
            {threadList.map((thread) => {
                return <div>{thread.threadContents}</div>
            })}
        </div>
    )
}

export default Thread
