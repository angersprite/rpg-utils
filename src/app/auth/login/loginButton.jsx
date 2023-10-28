"use client"
import { signIn } from "next-auth/react"

export default function LoginButton() {
    return (
        <button className="big-button" onClick={() => signIn({ callbackUrl: '/' })}>Sign in</button>
    )
}