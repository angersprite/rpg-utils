import './NavBar.css'
import NavMenu from './NavMenu.jsx'
import { getServerSession } from 'next-auth/next'
import { options } from "../api/auth/[...nextauth]/options"

export default async function NavBar(props) {
    // add check if session exists, conditional display of login or profile link
    const navLinks = [
        {id:"npcLink", label:"NPC Gen", route:"/npc"},
        {id:"groupsLink", label:"My Groups", route:"/playerGroup"},
    ]
    const loginLink = {id:"loginLink", label:"Login", route:"/api/auth/signin"}
    const logoutLink = {id:"logoutLink", label:"Logout", route:"/api/auth/signout"}
    const profileLink = {id:"profileLink", label:"Profile", route:"/auth/profile"}
    
    await getServerSession(options)
        .then(session => session ? (
            navLinks.push(profileLink)
        ) : (
            navLinks.push(loginLink)
        ))
    
    return (
        <header>
            <nav className="nav-bar">
                <NavMenu navLinks={navLinks}></NavMenu>
            </nav>
        </header>
    )
}