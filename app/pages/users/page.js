"use client"

import React,{ useState,useEffect,useRef } from "react"

export default function UserPage(){
    const [messages,setMessages] = useState([])
    const [sender,setSender]= useState()
    const [receiver,setReceiver]= useState()
    const [content,setContent] = useState()
    const messageEndRef = useRef(null)

    const scrollTobottom =()=>{
        messageEndRef.current?.scrollIntoView({behavior:'smooth'})
    }
    useEffect(()=>{
        scrollTobottom()
    },[messages])
    async function getMessages(){
        try{
            const response = await fetch("/api/messages")
            if(!response.ok){
                throw new Error('network problems')
            }
            const {data} = await response.json()
            setMessages(data)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getMessages()
    },[])

    async function createMessage(){
        try{
            const response = await fetch("/api/messages",{
                method:"POST",
                body:JSON.stringify({
                    senderID:sender,
                    receiverID:receiver,
                    contents:content
                })
            })
        if(!response.ok){
            throw new Error("fetch problrm")
        }
        const {data} = await response.json()
            getMessages()
            setContent("")
            setSender("")
            setReceiver("")
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className="mt-6 ml-6 w-1/3 bg-blue-500">
            <div className="overflow-y-auto h-96">
                {messages.map((message)=>(
                    <div key={message.id}>
                        <p className="font-bold ml-2"> 
                            <span className="h-9 w-9 rounded-full bg-white mx-2"> U </span>
                                {message.name} 
                        </p>
                        <p className="w-2/3 bg-slate-100 rounded-lg text-black pl-3 ml-2"> {message.contents} </p>
                        <p className="ml-2"> {message.sent_at} </p>
                    </div>
                ))}
                <div ref={messageEndRef}/>
            </div>
            <div className="bg-white text-black ml-3">
                <input
                    type="number"
                    placeholder="enter senderID"
                    value={sender}
                    onChange={(e)=>setSender(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="enter receiverID"
                    value={receiver}
                    onChange={(e)=>setReceiver(e.target.value)}
                />
                <div className="flex">
                    <textarea 
                        type="text"
                        placeholder="messages"
                        value={content}
                        onChange={(e)=>setContent(e.target.value)}
                    />
                    <button className="border-2 border-black rounded-lg h-6 justify-end px-2"
                        onClick={createMessage}
                    >send</button>
                </div>
            </div>
        </div>
    )
}