import { getClass } from '../npcService.js'

export async function GET (request){
    let Class = await getClass()
    return new Response(Class)
} 