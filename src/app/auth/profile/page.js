import { cookies } from 'next/headers'
import { getServerSession } from "next-auth/next"

export default async function profile() {
    const csrf = cookies().get('next-auth.csrf-token')?.value.split('|')[0]
    const session = await getServerSession()
    const signoutURL = `/api/auth/signout`

    return (
    <div className="form-container">
        <div>
            Username: {session.user.name}
        </div>
        <div>
            Email: {session.user.email}
        </div>

        <form action={signoutURL} method="POST">
            <input type="hidden" name="csrfToken" value={csrf} />
            <button className="big-button" id="submitButton" type="submit">Log out</button>
        </form>
    </div>
    )
}