"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
export default function Home(){
  const [userName,setUserName] = useState()
  const [password,setPassword] = useState()
  const router = useRouter()

  async function LogIn(){
    try{
      const response = await fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify({
          userName,
          password
        })
      })
      if(!response.ok){
        throw new Error("fetch problem")
      }
      const {data} = await response.json()
      console.log(data)
      router.push("/pages/users")
      setUserName("")
      setPassword("")
    }catch(error){
      console.log(error)
    }
  }
  return(
    <div className="flex flex-col bg-blue-600 w-1/3 h-1/3">
      <input className="ml-3 my-3 w-2/3 text-black pl-3"
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e)=>setUserName(e.target.value)}
      />
      <input className="ml-3 my-3 w-2/3 text-black pl-3"
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      <button onClick={LogIn}
      >login
      </button>
    </div>
  )
}