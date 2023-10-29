import { getPlayerGroup } from '@/app/api/playerGroup/PlayerGroupService'

export default async function playerGroup(props) {
    const groupID = props.params.groupID
    const groupDetails = await getPlayerGroup(groupID)

    return (
        <div className="card">
            <h2>{groupDetails.name}</h2>
        </div>
    )
}