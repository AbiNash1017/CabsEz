import React from 'react'

const Riding = () => {
  return (
    <div className='h-screen'>
      <Link to='/home' className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
        <i className="text-lg font-bold ri-home-5-line"></i>
      </Link>
        <div className="h-1/2">
            <img className='h-full w-full object-cover' src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>
        <div className="h-1/2">
            <button>Make a Payment</button>
        </div>
      
    </div>
  )
}

export default Riding
