import React from 'react'
import Hero from '../components/Home/Hero'
import RecentAddBook from '../components/Home/RecentAddBook'

const Home = () => {
  return (
    <div className='bg-zinc-800 text-white px-10 py-8'>
      <Hero/>
      <RecentAddBook/>
    </div>
  )
}

export default Home
