import { getServerSession } from 'next-auth/next'
import { options } from "../api/auth/[...nextauth]/options"
import { getUserGroups } from "../api/playerGroup/PlayerGroupService"
import GroupCard from "./groupCard"

export default async function GroupsDashboard(props) {
    const session = await getServerSession(options)
    // get all groups this user is a part of
    const playerGroups = await getUserGroups(session.user.name)
    return (
        <div className="card">
            <form action="/playerGroup/create">
                <button className="big-button">New Group</button>
            </form>

            {
                playerGroups.map(group => {
                    return (<GroupCard key={group.id} groupName={group.name} groupID={group.id}></GroupCard>)
                })
            }
        </div>
    )
}