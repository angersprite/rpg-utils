import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import LogoutButton from '../logout/logoutButton'

export default async function profile() {
    const session = await getServerSession(authOptions)
    console.log(session)

    return (
        <div className="card">
            <div>
                Username: {session.user.name}
            </div>
            <div>
                Email: {session.user.email}
            </div>

            <div>
                <LogoutButton></LogoutButton>
            </div>
        </div>
    )
}