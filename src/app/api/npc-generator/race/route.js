import { getRace } from '../npcService.js'

export async function GET (request){
    let Race = await getRace()
    return new Response(Race)
} 