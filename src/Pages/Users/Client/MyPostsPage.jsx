import React from 'react'
import Header from '../../../Components/Users/Header/Header'
import MyPosts from "../../../Components/Users/Clients/MyPosts/MyPosts"

function MyPostsPage() {
  return (
    <div>
        <Header icons={true} />
        <MyPosts />
    </div>
  )
}

export default MyPostsPage
