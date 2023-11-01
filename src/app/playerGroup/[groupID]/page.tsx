import { getPlayerGroup } from '@/app/services/PlayerGroupService'
import UserList from '../UserList'

export interface Props {
    params: {
        groupID: number
    }
}

export default async function playerGroup(props: Props) {
    const groupID = props.params.groupID
    const groupDetails = await getPlayerGroup(groupID)

    return (
        <div className="card">
            <h2>{groupDetails?.name}</h2>
            <UserList groupID={props.params.groupID}></UserList>
            <div></div>
        </div>
    )
}