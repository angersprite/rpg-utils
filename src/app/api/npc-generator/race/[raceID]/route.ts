import { getRace } from '@/services/npc/npcService'
import { NextRequest, NextResponse } from 'next/server'

export async function GET (request: NextRequest, { params }: { params: { raceID: number } }){
    let Race = await getRace(params.raceID)
    return NextResponse.json(Race)
} 
