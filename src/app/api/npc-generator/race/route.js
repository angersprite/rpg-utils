import { getRace } from '../npcService.js'
import { NextResponse } from 'next/server'

export async function GET (request){
    let Race = await getRace()
    return NextResponse.json(Race)
} 