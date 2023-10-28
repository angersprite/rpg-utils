import { getServerSession } from 'next-auth/next'
import { options } from "../../api/auth/[...nextauth]/options"

export default async function GroupCreation() {
    const session = await getServerSession(options)
    const callBackURL = 'http://localhost:3000/playerGroup/:ID'
    return (
        <div className="card">
            <form method="POST" action="/api/playerGroup/create">
                <input type="hidden" name="userName" value={session.user.name} />
                <input type="hidden" name="callBackURL" value={callBackURL} />
                <h2>New Group</h2>
                <div className="vert-label-field">
                    <label htmlFor="groupName">Name:</label>
                    <input type="text" id="groupName" name="groupName" required />
                </div>
                <div className="vert-label-field">
                    {/* add input for inviting other users here */}
                </div>
                <button type="submit" className="big-button">Create Group</button>
            </form>
        </div>
    )
}