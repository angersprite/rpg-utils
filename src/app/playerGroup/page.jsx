export default function GroupsDashboard(props) {
    // get all groups this user is a part of

    return (
        <div className="card">

            <form action="/playerGroup/create">
                <button className="big-button">New Group</button>
            </form>
        </div>
    )
}