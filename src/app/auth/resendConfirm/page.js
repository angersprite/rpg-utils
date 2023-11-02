"use client"
import { useState } from 'react'

export default function resendConfirm() {
    let [email, setEmail] = useState('')
    let [emailMessage, setEmailMessage] = useState('')
    const sendEmail = async () => {
        const msg = await fetch(`/api/auth/verifyEmail/${email}`).then(res => { return res.json() })
        setEmailMessage(msg)
    }

    return (
        <div className="card">
            Your email address has not been verified. <br/>
            Please enter your email address to resend the verification email.
            
            <div>
                <input type="email" value={email} onChange={e => { setEmail(e.target.value) }} />
                <button type="button" onClick={sendEmail}>Send Email</button>
                <div className="input-helper-text">{ emailMessage }</div>
            </div>
        </div>
    )
}