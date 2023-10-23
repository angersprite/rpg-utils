import Link from 'next/link'

export default function login() {
  let loginMessage = ''

  return (
    <div className="form-container">
      <form>
          <div className="vert-label-field" suppressHydrationWarning={true}>
              <label htmlFor="userName">Username</label>
              <input type="text" id="userName" name="userName" required></input>
          </div>
          <div className="vert-label-field" suppressHydrationWarning={true}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required suppressHydrationWarning={true}></input>
              <span className="input-helper-text">{ loginMessage }</span>
          </div>
          <div>
              <button className="big-button" type="button">Log In</button>
          </div>

          <div>
              <Link href={`/auth/register`}>Register</Link>
          </div>
      </form>
  </div>
  )
}