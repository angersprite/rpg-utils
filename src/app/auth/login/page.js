import Link from 'next/link'
import { cookies } from 'next/headers'

export default async function signin() {
    const csrf = cookies().get('next-auth.csrf-token')?.value.split('|')[0]

    return (
        <div className="form-container">
            <form method="POST" action="http://localhost:3000/api/auth/callback/credentials">
                <input type="hidden" name="csrfToken" value={csrf} />
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
            
            <div>
                <Link href={`/auth/register`}>Register</Link>
            </div>
        </div>
    )
}