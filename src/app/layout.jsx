import NavBar from './nav/NavBar'
import './styles/layout.css'
 
export default function Layout({ children }) {
  return (
    <html>
      <body>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  )
}