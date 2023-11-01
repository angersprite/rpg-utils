import { createClient } from '@supabase/supabase-js'
import {} from 'dotenv/config'
import { sendEmail } from './EmailService'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

export async function createGroup(groupName: string, userName: string, groupMembers: [{ userName: string, memberType: number, acceptedInvite: boolean }]) {
    const { data: user, error: userError } = await supabase 
        .from('User')
        .select('id')
        .eq('user_name', userName)
    const userID = user![0].id
    // insert new group and get its id
    const { data: group, error: groupError } = await supabase
        .from('PlayerGroup')
        .insert([{ name: groupName, crtn_user_id: userID }])
        .select('id')
    const groupID = group![0].id
    // insert members of new group
    await addPlayersToGroup(groupID, groupMembers)

    return groupID
}

export async function addPlayersToGroup(groupID: number, groupMembers: [{ userName: string, memberType: number, acceptedInvite: boolean }] ) {
    // could improve this with a supabase side function
    // see if you can pass the whole members array?
    groupMembers.map(async member => {
        const { data: user, error: userError } = await supabase
            .from('User')
            .select('id')
            .eq('user_name', member.userName)
        const userID = user![0].id
        await supabase
            .from('PlayerGroupMember')
            .insert([{ group_id: groupID, user_id: userID, accepted_invite: member.acceptedInvite }])
    })
}

export async function acceptGroupInvite(groupID: number, userName: string) {
    
}

export async function getPlayerGroup(groupID: number) {
    const { data, error } = await supabase
        .from('PlayerGroup')
        .select('id,name')
        .eq('id', groupID)
        .limit(1)
        .single()
    return data
}

export async function getUserGroups(userName: string) {
    let { data, error } = await supabase
        .rpc('user_player_groups', { user_name: userName })
    return data
}

export async function getGroupMembers(groupID: number) {
    const { data, error } = await supabase
        .from('PlayerGroupMember')
        .select('user_id,User(user_name)')
        .eq('group_id', groupID)
    
    return data
}

export async function inviteUser(groupID: number, userName: string, memberType: number) {
    // insert user into groupmembers table with accepted flag = false
    const user = { userName: userName, memberType: memberType, acceptedInvite: false }
    addPlayersToGroup(groupID, [user])
    // send email to user inviting them to group with link to accept invite
    
    const subject = ''
    const body = ''
    sendEmail(mailTo, subject, body)
}

export async function getMemberTypes() {
    const { data, error } = await supabase
        .from('GroupMemberType')
        .select('*')
    return data
}