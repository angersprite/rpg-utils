import { createGroup } from '@/services/PlayerGroupService'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest,res: Response){
    const data = await req.json()
    const userName = data.userName
    const groupName = data.groupName
    const groupMembers = data.groupMembers
    const groupID = await createGroup(groupName, userName, groupMembers)
    
    return NextResponse.json(groupID);
}