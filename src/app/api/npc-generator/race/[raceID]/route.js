import { getRace } from '@/app/api/npc-generator/npcService.js'
import { NextResponse } from 'next/server'

export async function GET (request, context){
    let Race = await getRace(context.params.raceID)
    return NextResponse.json(Race)
} 
