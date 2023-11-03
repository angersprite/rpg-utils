import "@/styles/playerGroup.css"

export default function GroupCard(props) {
    const groupURL = `/playerGroup/${props.groupID}`
    return (
        <div className="groupCard">
            <a href={groupURL}>{props.groupName}</a>
            <a href={groupURL}>Open</a>
        </div>
    )
}