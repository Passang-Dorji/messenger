"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
export default function Home(){
  const router = useRouter()

  async function LogIn(formEvent){
    try{
      formEvent.preventDefault()
      const formData = new FormData(formEvent.currentTarget)
      const body = {
        userName:formData.get('name'),
        password:formData.get('password')
      }
      const response = await fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(body)
      })
      if(!response.ok){
        throw new Error("fetch problem")
      }
      const {data} = await response.json()
      console.log(data)
      router.push("/pages/users")
    }catch(error){
      console.log(error)
    }
  }
  return(
    <form onSubmit={LogIn}
      className="flex flex-col bg-blue-600 w-1/3 h-1/3">
      <input className="ml-3 my-3 w-2/3 text-black pl-3"
        type="text"
        placeholder="Username"
        name="name"
      />
      <input className="ml-3 my-3 w-2/3 text-black pl-3"
        type="text"
        placeholder="Password"
        name="password"
      />
      <button type="submit"
      >login
      </button>
    </form>
  )
}