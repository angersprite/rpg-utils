import { NextRequest, NextResponse } from 'next/server'
import { isResetTokenValid } from '@/services/AuthService'

export async function GET(req: NextRequest, { params }: { params: { token: string } }) {
    const isValid = await isResetTokenValid(params.token)
    return NextResponse.json(isValid)
}