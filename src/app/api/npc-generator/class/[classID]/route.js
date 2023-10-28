import { getClass } from '../../npcService.js'
import { NextResponse } from 'next/server'

export async function GET (request, context){
    let Class = await getClass(context.params.classID)
    return NextResponse.json(Class)
} 