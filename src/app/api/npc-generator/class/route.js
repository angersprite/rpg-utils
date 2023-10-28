import { getClass } from '../npcService.js'
import { NextResponse } from 'next/server'

export async function GET (request){
    let Class = await getClass()
    return NextResponse.json(Class)
} 