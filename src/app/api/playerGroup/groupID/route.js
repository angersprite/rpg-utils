import { getPlayerGroup } from '../PlayerGroupService'
import { NextResponse } from 'next/server'

export async function GET (request, context){
    let playerGroup = await getPlayerGroup(context.params.groupID)
    return NextResponse.json(playerGroup)
} 
