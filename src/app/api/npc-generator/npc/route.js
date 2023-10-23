import generateNPC from '../npcGenerator.js'
import { NextResponse } from 'next/server'

export async function POST (request){
    let NPC = await generateNPC(request.body.classID, request.body.raceID)
    return NextResponse.json(NPC)
}