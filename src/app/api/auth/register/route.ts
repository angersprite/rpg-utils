import { NextRequest, NextResponse } from 'next/server'
import { registerUser } from '../../../services/AuthService'

export async function POST(req: NextRequest, res: NextResponse) {
    const data = await req.json()
    const userName = data.userName
    const email = data.email
    const password = data.password
    const isRegistered = await registerUser(userName, email, password)

    return NextResponse.json(isRegistered)
}