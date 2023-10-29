import { getClass } from '@/app/api/npc-generator/npcService.js'
import { NextResponse } from 'next/server'

export async function GET (request, context){
    let Class = await getClass(context.params.classID)
    return NextResponse.json(Class)
} 