import { inviteUser } from '@/app/services/PlayerGroupService'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest, { params }: { params: { groupID: number, userName: string, memberType: number } }){
    await inviteUser(params.groupID, params.userName, params.memberType)
    return NextResponse.json(true)
} 