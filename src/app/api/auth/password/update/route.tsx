import { NextRequest, NextResponse } from 'next/server'
import { updatePassword } from '@/services/AuthService'

export async function POST(req: NextRequest) {
    const data = await req.json()
    const res = await updatePassword(data.token, data.password)
    return NextResponse.json(res)
}