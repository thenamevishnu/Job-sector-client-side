import React from 'react'
import Header from '../Components/Header/Header'
import MyPosts from '../Components/Freelancer/MyPosts/MyPosts'
import Footer from '../Components/Footer/Footer'

function MyPostsPage() {
  return (
    <div>
        <Header icons={true} />
        <MyPosts />
        <Footer />
    </div>
  )
}

export default MyPostsPage
