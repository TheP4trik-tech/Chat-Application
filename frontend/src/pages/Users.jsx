import {useEffect, useState} from "react";

function Users() {
    const [chats, setChats] = useState([])
    useEffect(() => {
        fetch('/api/v1/users')
            .then(response => response.json())
            .then(data => setChats(data.users))
    })
    return(
        <div>Users</div>
    )}
export default Users