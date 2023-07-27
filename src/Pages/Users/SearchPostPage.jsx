import React from 'react'
import Header from '../../Components/Users/Header/Header'
import SearchPost from '../../Components/Users/SearchPost/SearchPost'
import Footer from '../../Components/Users/Footer/Footer'

function SearchPostPage() {
    return (
        <div>
            <Header icons={true} />
            <SearchPost />
            <Footer/>
        </div>
    )
}

export default SearchPostPage
