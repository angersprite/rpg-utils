import './NavBar.css'
import NavMenu from './NavMenu.jsx'
import { getServerSession } from 'next-auth/next'

export default async function NavBar(props) {
    // add check if session exists, conditional display of login or profile link
    const navLinks = [
        {id:"npcLink", label:"NPCs", route:"/npc"},
        {id:"initLink", label:"Initiative", route:"/init"},
        {id:"dungLink", label:"Dungeon", route:"/dungeon"},
    ]
    const loginLink = {id:"loginLink", label:"Login", route:"/api/auth/signin"}
    const profileLink = {id:"profileLink", label:"Profile", route:"/auth/profile"}
    
    await getServerSession()
        .then(session => (session) ? navLinks.push(profileLink)
            : navLinks.push(loginLink))
    return (
        <header>
            <nav className="nav-bar">
                <NavMenu navLinks={navLinks}></NavMenu>
            </nav>
        </header>
    )
}