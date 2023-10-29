import { getUserGroups } from '../../PlayerGroupService'
import { NextRequest, NextResponse } from 'next/server'

export async function GET (req: NextRequest, context: any){
    let playerGroup = await getUserGroups(context.params.userName)
    return NextResponse.json(playerGroup)
} 
