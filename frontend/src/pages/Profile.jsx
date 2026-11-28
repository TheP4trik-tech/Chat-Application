import {useEffect, useState} from "react";
import {apiFetch} from "../api.js";
import {h1} from "framer-motion/m";

function Profile() {
    const [user, setUser] = useState("")
    useEffect(() => {
        apiFetch(`/api/v1/users/${JSON.parse(localStorage.getItem('user').id)}`)
            .then(response => response.json())
            .then(data => setUser(data.user))
    }, [])
    return (

        <h1>{user.username}</h1>

    )
}
export default Profile;