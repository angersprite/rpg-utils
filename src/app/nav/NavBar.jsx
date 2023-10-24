import './NavBar.css'
import { getSession } from 'next-auth/react'
import NavMenu from './NavMenu.jsx'
import { options } from '../api/auth/[...nextauth]/options'
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
    const logoutLink = {id:"logoutLink", label:"Logout", route:"/api/auth/signout"}
    await getServerSession(options)
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