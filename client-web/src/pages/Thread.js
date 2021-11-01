import React, {useState, useEffect} from 'react'
import server from "../apis/server"
import BodyText from "../components/Typography/BodyText"

const Thread = (postId) => {
    const [threadList, setThreadList] = useState([])

    useEffect(() => {
        server
        .get(`/thread`)
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
