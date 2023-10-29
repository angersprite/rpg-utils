import { createClient } from '@supabase/supabase-js'
import {} from 'dotenv/config'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

export async function createGroup(groupName: string, userName: string, groupMembers: [{userName: string, memberType: number}]) {
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

export async function addPlayersToGroup(groupID: number, groupMembers: [{ userName: string, memberType: number }] ) {
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
            .insert([{ group_id: groupID, user_id: userID }])
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