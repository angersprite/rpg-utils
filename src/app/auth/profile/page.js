import { getServerSession } from "next-auth/next"
import { options } from "../../api/auth/[...nextauth]/options"
import LogoutButton from '../logout/logoutButton'

export default async function profile() {
    const session = await getServerSession(options)

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