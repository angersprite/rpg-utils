"use client"
import { useState } from 'react'

export default function ResetPasswordEmailForm() {
    const [email, setEmail] = useState('')
    const [emailMessage, setEmailMessage] = useState('')
    
    const sendEmail = async () => {
        let requestBody = JSON.stringify({
            email: email
        })
        const msg = await fetch('/api/auth/password/reset', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: requestBody
        }).then(res => { return res.json() })
        setEmailMessage(msg)
        setEmail('')
    }

    return (
        <>
            <div>
                <label htmlFor="userName">Email:</label>
                <input type="email" id="email" name="email" required value={email} onChange={ e => { setEmail(e.target.value) } }></input>
                <div className="input-helper-text">{ emailMessage }</div>
            </div>
            
            <div>
                <button className="big-button" type="button" onClick={sendEmail}>Send</button>
            </div>
        </>
    )
}