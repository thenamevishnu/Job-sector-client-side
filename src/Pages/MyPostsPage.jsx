import React from 'react'
import Header from '../Components/Header/Header'
import MyPosts from "../Components/Clients/MyPosts/MyPosts"

function MyPostsPage() {
  return (
    <div>
        <Header icons={true} />
        <MyPosts />
    </div>
  )
}

export default MyPostsPage
