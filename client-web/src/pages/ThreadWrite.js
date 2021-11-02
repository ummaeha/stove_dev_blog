import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import server from '../apis/server'
import { getDateString, getYear, getMonthIndex, getDate } from "../components/Date/getDateString"


const ThreadWrite = (props) => {
    const [newThread, setNewThread] = useState("")
    const postId = props.postId

    const onsubmitThread = (e) => {
        e.preventDefault();

        const dateString = getDateString()
        const threadContentsData = document.querySelector('.threadContentBox').value

        const threadInitalData = {
            postId: `${postId}`,
            threadContents: `${threadContentsData}`,
            timeStamp: `${dateString}`
        }
        server
        .post(`/thread/${postId}`, threadInitalData)
        .then(res => res)
        .then(data => setNewThread(data.data.newThreadData))
    }
        
    return (
        <div>
            {console.log(newThread)}
            <textarea type="text" placeholder="여러분의 소중한 댓글을 입력해주세요" className="threadContentBox"/><button onClick={(e) => onsubmitThread(e)}> 댓글 달기 </button>
        </div>
    )
}

export default ThreadWrite
