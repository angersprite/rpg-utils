import { inviteUser } from '@/services/PlayerGroupService'
import { userNameExists } from '@/services/AuthService'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const data = await req.json()
    const userName = data.userName
    const groupID = data.groupID
    const memberType = data.memberType
    const userExists = await userNameExists(userName)
    if (userExists) {
        await inviteUser(groupID, userName, memberType)
        return NextResponse.json(true)
    } else {
        return NextResponse.json(false)
    }
    return NextResponse.json(true)
} 