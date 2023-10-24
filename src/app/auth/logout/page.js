import { cookies } from 'next/headers';

export default async function logout() {
    const csrf = cookies().get('next-auth.csrf-token')?.value.split('|')[0]
  
    return (
      <div className="form-container">
        <form action="/api/auth/signout" method="POST">
          <input type="hidden" name="csrfToken" value={csrf} />
          <button className="big-button" id="submitButton" type="submit">Log out</button>
        </form>
      </div>
    )
  }