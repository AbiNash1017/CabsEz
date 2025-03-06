import React from 'react'

export const VehiclePanel = (props) => {
    return (
        <div>
            <h5
                className=' p-1 text-center absolute top-0 w-[93%] '
                onClick={() => { props.setVehiclePanel(false) }}
            >
                <i className="ri-arrow-down-wide-line text-3xl"></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Choose your Ride</h3>

            <div onClick={()=>{
                props.setConfirmRidePanel(true)
            }} className='flex w-full p-3 border-2 mb-2 active:border-black rounded-xl items-center justify-between'>

                <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995234/assets/92/8d4288-e896-4333-9bc2-c60c49f2a095/original/UberXL_Black_v2.png" alt="car pic" />

                <div className=' ml-2 w-1/2'>

                    <h4 className='font-medium text-base'>UberGo
                        <i className="ri-user-3-fill"> 4</i>
                    </h4>

                    <h5 className='font-medium text-sm'>2 mins away</h5>

                    <p className='font-normal text-xs'>Affordablec Compact rides</p>

                </div>
                <h2 className='text-lg font-semibold'>₹145.50 </h2>
            </div>

            <div onClick={()=>{
                props.setConfirmRidePanel(true)
            }} className='flex w-full p-3 border-2 mb-2 active:border-black rounded-xl items-center justify-between'>

                <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="car pic" />

                <div className=' ml-2 w-1/2'>

                    <h4 className='font-medium text-base'>Moto
                        <i className="ri-user-3-fill"> 1</i>
                    </h4>

                    <h5 className='font-medium text-sm'>5 mins away</h5>

                    <p className='font-normal text-xs'>Affordable ride for one</p>

                </div>
                <h2 className='text-lg font-semibold'>₹60.00 </h2>
            </div>

            <div onClick={()=>{
                props.setConfirmRidePanel(true)
            }} className='flex w-full p-3 border-2 mb-2 active:border-black rounded-xl items-center justify-between'>

                <img className='h-12' src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png" alt="car pic" />

                <div className=' ml-2 w-1/2'>

                    <h4 className='font-medium text-base'>Auto
                        <i className="ri-user-3-fill"> 3</i>
                    </h4>

                    <h5 className='font-medium text-sm'>11 mins away</h5>

                    <p className='font-normal text-xs'>Affordable Auto ride </p>

                </div>
                <h2 className='text-lg font-semibold'>₹110.30 </h2>
            </div>
        </div>
    )
}

export default VehiclePanel