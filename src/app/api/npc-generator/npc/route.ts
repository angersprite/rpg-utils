import generateNPC from '../npcGenerator.js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST (request: NextRequest){
    const data = await request.json()
    let NPC = await generateNPC(data.classID, data.raceID)
    return NextResponse.json(NPC)
}