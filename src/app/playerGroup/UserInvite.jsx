"use client"
import { useState } from 'react'

export default function UserInvite(props) {
    let [invitee, setInvitee] = useState('')
    let [memberType, setMemberType] = useState('')

    const inviteUser = async () => {
        // post fetch call to invite api
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