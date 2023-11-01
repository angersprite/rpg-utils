import { getGroupMembers } from '@/app/services/PlayerGroupService'
import UserInvite from './UserInvite'

export default async function UserList(props) {
    let groupMembers = []
    if (props.groupID) {
         groupMembers = await getGroupMembers(props.groupID)
    }

    return (
        <ul>
            <h2>Group Members</h2>
            <UserInvite groupID={props.groupID}></UserInvite>
            {
                groupMembers.map(member => {
                    return (<li key={member.user_id}>{member.User.user_name} - {member.GroupMemberType.name}</li>)
                })
            }
        </ul>
    )
}