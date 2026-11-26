import { useEffect, useState } from 'react'
import { apiFetch } from '../api.js'
import BackToTopButton from '../components/BackToTopButton.jsx'


function Chats() {
    const [chats, setChats] = useState([])

    useEffect(() => {
        apiFetch('/api/v1/chats')
            .then(response => response.json())
            .then(data => setChats(data.chats))
    }, [])

    return (
        <div>
            Chats
            <BackToTopButton />
        </div>
    )
}
export default Chats
