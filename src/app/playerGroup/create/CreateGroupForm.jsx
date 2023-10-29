"use client"
import { useState }  from 'react'
import { useRouter } from 'next/navigation'

export default function CreateGroupForm(props) {
    const router = useRouter()
    const userName = props.session.user.name
    let [groupName, setGroupName] = useState('')
    let groupMembers = [{ userName: userName, memberType: 1, acceptedInvite: true }]

    const createGroup = async () => {
        const postBody = JSON.stringify({
            userName: userName,
            groupName: groupName,
            groupMembers: groupMembers
        })
        await fetch(`/api/playerGroup/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: postBody})
            .then(res => { return res.json() })
            .then(groupId => { router.push(`/playerGroup/${groupId}`) })
    }

    return (
        <form>
            <h2>New Group</h2>
            <div className="vert-label-field">
                <label htmlFor="groupName">Name:</label>
                <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} required />
            </div>
            <div className="vert-label-field">
                {/* add input for inviting other users here */}
            </div>
            <button type="button" className="big-button" onClick={createGroup}>Create Group</button>
        </form>
    )
}