import { getClass } from '@/services/npc/npcService'
import { NextRequest, NextResponse } from 'next/server'

export async function GET (request: NextRequest){
    let Class = await getClass()
    return NextResponse.json(Class)
} 