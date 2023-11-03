import { getPlayerGroup } from '@/services/PlayerGroupService'
import { NextRequest, NextResponse } from 'next/server'

export async function GET (request: NextRequest, { params }: { params: { groupID: number } }){
    let playerGroup = await getPlayerGroup(params.groupID)
    return NextResponse.json(playerGroup)
} 