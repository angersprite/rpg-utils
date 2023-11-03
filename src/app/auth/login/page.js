"use client"
import Link from 'next/link'
import { getCsrfToken } from "next-auth/react"

export default async function login() {
    const csrf = await getCsrfToken()

    return (
        <div className="card">
            <form method="POST" action="/api/auth/callback/credentials">
                <input type="hidden" name="csrfToken" value={csrf} />
                <input name="callbackUrl" type="hidden" defaultValue="/" />
                <div className="vert-label-field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required></input>
                </div>
                <div className="vert-label-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required></input>
                </div>
                <div> 
                    <button className="big-button" type="submit">Log In</button>
                </div>
            </form>
            
            <div className="spacerFlex">
                <Link href={`/auth/register`}>Register</Link>
                <Link href={`/auth/password/reset`}>Forgot your password?</Link>
            </div>
        </div>
    )
}