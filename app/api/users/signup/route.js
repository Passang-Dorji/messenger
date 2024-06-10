import knex from "@/database";
import crypto from  "crypto"

export async function POST(req){

    const {name,email,contact,passWord} =await req.json()
    const salt = crypto.randomBytes(16).toString("hex")
    const hash = crypto.pbkdf2Sync(passWord,salt,1000,64,"sha512").toString("hex")
    const data = await knex('users').insert({
        name,
        email,
        contact,
        salt,
        hash_password:hash,
        created_at:new Date().toISOString()
    }).returning('*')
return Response.json({data})
}