import { getServerSession } from 'next-auth/next'
import { options } from "../../api/auth/[...nextauth]/options"
import CreateGroupForm from './CreateGroupForm'

export default async function GroupCreation() {
    const session = await getServerSession(options)
    const callBackURL = 'http://localhost:3000/playerGroup/:ID'
    
    return (
        <div className="card">
            <CreateGroupForm session={session}></CreateGroupForm>
            
        </div>
    )
}