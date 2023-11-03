import { getClass } from '@/services/npc/npcService'
import { NextRequest, NextResponse } from 'next/server'

export async function GET (request: NextRequest, { params }: { params: { classID: number } }){
    let Class = await getClass(params.classID)
    return NextResponse.json(Class)
} 