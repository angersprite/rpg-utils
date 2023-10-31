import { sendEmail } from '../EmailService'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse){
    sendEmail('ptlankton@gmail.com', 'TEST', 'TEST')
    
    return NextResponse.json('')
}