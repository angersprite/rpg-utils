import { getServerSession } from 'next-auth/next'
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getUserGroups } from "@/app/services/PlayerGroupService"
import GroupCard from "./groupCard"

export default async function GroupsDashboard(props) {
    const session = await getServerSession(authOptions)
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