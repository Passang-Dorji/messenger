import knex from "@/database";

export async function POST(req){
    const {senderID,receiverID,contents} =await req.json()
    const data = await knex('messages').insert({
        sender_id:senderID,
        receiver_id:receiverID,
        contents,
        sent_at:new Date().toISOString(),
        received_at:new Date().toISOString()
    }).returning('*')
return Response.json({data})
}

export async function GET(){
    const data = await knex('messages')
        .join('users','messages.sender_id','users.id')
        .select('users.name','messages.contents','messages.sent_at')
        .orderBy('sent_at','asc')
    return Response.json({data})
}