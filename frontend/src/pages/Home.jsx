import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(./assets/CoverImg.jpg)] h-screen pt-5 flex justify-between flex-col w-full bg-[#bc6893]'>
            <img className='w-20 ml-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className='bg-white pb-6 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                <Link to={'/login'} className='w-full flex items-center justify-center bg-black text-white py-3 font-semibold rounded mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home