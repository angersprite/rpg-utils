"use client"
import { useState } from 'react'

export default function UserInvite(props) {
    let [invitee, setInvitee] = useState('')
    let [memberType, setMemberType] = useState('')

    const inviteUser = async () => {
        const postBody = JSON.stringify({ groupID: props.groupID, userName: invitee, memberType: memberType })
        const res = await fetch(`/api/playerGroup/inviteUser`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: postBody
        })
        // respond if user invitation went ok
        // respond if usename not found
    }

    return (
        <div>
            <input type="text" value={invitee} onChange={ e => setInvitee(e.target.value) } />
            <select onChange={ e => setMemberType(e.target.value) }>
                <option value="1">DM</option>
                <option value="2">Player</option>
            </select>

            <button type="button" onClick={inviteUser}>Invite</button>
        </div>
    )
}