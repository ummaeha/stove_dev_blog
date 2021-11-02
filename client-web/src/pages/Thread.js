import React, {useState, useEffect} from 'react'
import axios from 'axios'
import server from "../apis/server"
import BodyText from "../components/Typography/BodyText"

const Thread = (props) => {
    const [threadList, setThreadList] = useState([])

    useEffect(() => {
        axios
        .get(`http://localhost:4000/thread/${props.postId}`)
        .then(res => res)
        .then(data => setThreadList(data.data.threadData))
    }, [])
    return (
        <div>
            {threadList.map((thread) => {
                return <div>{thread.threadContents}</div>
            })}
        </div>
    )
}

export default Thread
