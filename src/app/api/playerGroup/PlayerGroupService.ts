import { createClient } from '@supabase/supabase-js'
import {} from 'dotenv/config'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

export async function createGroup(groupName: string, userName: string) {
    const { data: user, error: userError } = await supabase 
        .from('User')
        .select('id')
        .eq('user_name', userName)
    const userId = user![0].id
    const { data: group, error: groupError } = await supabase
        .from('PlayerGroup')
        .insert([{ name: groupName, crtn_user_id: userId }])
        .select('id')
    return group![0].id
}

export async function getPlayerGroup(groupID: number) {
    const { data, error } = await supabase
        .from('PlayerGroup')
        .select('*')
        .eq('id', groupID)
    return data
}