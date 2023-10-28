"use client"
import { signOut } from "next-auth/react"

export default function LogoutButton() {
    return (
        <button className="big-button" onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button>
    )
}