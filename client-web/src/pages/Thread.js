import React, {useState, useEffect} from 'react'
import server from "../apis/server"
import HeaderText from "../components/Typography/HeaderText"
import ThreadWrite from './ThreadWrite'


const Thread = (props) => {
    const [threadList, setThreadList] = useState([])
    
    useEffect(() => {
        server
        .get(`/thread/${props.postId}`)
        .then(res => res)
        .then(data => setThreadList(data.data.threadData))
    }, [])
    
    return (
        <div>
            <HeaderText text={`댓글(${threadList.length})`}/>
            {threadList && threadList.map((thread) => {
                return <div>{thread.threadContents}({thread.timeStamp})</div>
            })}
            {(!threadList.length) && <div>댓글이 없습니다</div>}

            <ThreadWrite postId={props.postId}/>
        </div>
    )
}

export default Thread
