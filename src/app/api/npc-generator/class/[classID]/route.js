import { getClass } from '../../npcService.js'

export async function GET (request, context){
    let Class = await getClass(context.params.classID)
    return new Response(Class)
} 