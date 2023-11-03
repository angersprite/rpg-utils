import { getRace } from '@/services/npc/npcService'
import { NextRequest, NextResponse } from 'next/server'

export async function GET (request: NextRequest){
    let Race = await getRace()
    return NextResponse.json(Race)
} 