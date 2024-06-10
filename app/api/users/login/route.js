import knex from "@/database";
import crypto from "crypto"

export async function POST(req){
    const { userName, password} = await req.json()
    const [foundUser] = await knex('users')
        .where('name',userName)
        .select('*')
    const hash = crypto.pbkdf2Sync( password,foundUser.salt, 1000, 64, "sha512").toString("hex")
    const isValidLogin = hash === foundUser.hash_password

    if (isValidLogin){
        return Response.json({data:{
            id:foundUser.id,
            name:foundUser.name,
            email:foundUser.email,
            contact:foundUser.contact
        },
    })
    }else return new Response("bad response")
}