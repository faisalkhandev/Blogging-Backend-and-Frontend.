import { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'

const Post = () => {

    const [userDetails, setUserDetails] = useState([])

    useEffect(() => {
        try {
            axios.get("/api/user")
                .then((response) => {
                    setUserDetails(response.data)
                })
        } catch (error) {
            console.log('could not get user details', error)
        }
    }, [])

    return (
        <>

            <h3 className='postPage' style={{ fontSize: '30px' }}>{`Hello ${userDetails.name || 'User'} 👋`}</h3>
            <p className='postPage'>Create a new post</p>
            <textarea name="post" id="post" placeholder="What is on your mind?" style={{ padding: '10px', width: '30%', marginLeft: '20px', display: 'block' }}></textarea>
            <button style={{
                padding: '10px', display: 'block', marginLeft: '20px', marginTop: '10px', borderRadius: '6px'
            }}>Create a post</button>

        </>
    )
}

export default Post
