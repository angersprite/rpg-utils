import { NextRequest, NextResponse } from 'next/server'
import { userNameExists } from '../../authService'

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
    const exists = await userNameExists(params.username)
    return NextResponse.json(exists)
}