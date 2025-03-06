import React, { useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const confirmRidePanelRef = useRef(null)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const VehicleFoundRef = useRef(null)
  const [VehicleFound, setVehicleFound] = useState(false)
  const WaitingForDriverRef = useRef(null)
  const [WaitingForDriver, setWaitingForDriver] = useState(false)

  const submitHandler = () => {
    e.preventDefault();
  }

  useGSAP(function () {
    //here if panelOpen is true then the panel will slide up else the panel will slide down
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        // opacity: 0
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
    //here panelOpen is a dependency which means whenever panelOpen changes this function will run
  }, [panelOpen])

  useGSAP(function () {
    //herer if vehiclePanel is true then the vehiclePanel will slide up
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
    //here vehiclePanel is a dependency which means whenever vehiclePanel changes this function will run
  }, [vehiclePanelOpen])

  useGSAP(function () {
    //herer if vehiclePanel is true then the vehiclePanel will slide up
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
    //here confirmRidePanel is a dependency which means whenever vehiclePanel changes this function will run
  }, [confirmRidePanel])

  useGSAP(function () {
    //herer if vehiclePanel is true then the vehiclePanel will slide up
    if (VehicleFound) {
      gsap.to(VehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(VehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
    //here confirmRidePanel is a dependency which means whenever vehiclePanel changes this function will run
  }, [VehicleFound])

  useGSAP(function () {

    if (WaitingForDriver) {
      gsap.to(WaitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(WaitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [WaitingForDriver])

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="logo" />

      <div
        //if vehiclePanelOpen is true then the vehiclePanel will slide down
        onClick={() => {
          setVehiclePanelOpen(false)
        }}
        className='h-screen w-screen'>
        {/* temporary img */}
        <img className='h-full w-full object-cover' src="src/assets/Maps.png" alt="maps" />
      </div>
      <div className='flex flex-col justify-end absolute bottom-0 w-full top-0 '>
        <div className='h-[30%] bg-white p-5 relative'>

          <h5 ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false)
            }}
            className='absolute opacity-0 top-6 right-6 text-3xl'>

            <i className="ri-arrow-down-s-line" />

          </h5>

          <h4 className='text-3xl font-semibold pb-3'>Find trip</h4>

          <form
            onSubmit={(e) => {
              submitHandler(e)
            }} >

            <div className='line absolute h-18 w-1 left-7 top-[42.5%] bg-black rounded-full'></div>

            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value)
              }}
              className='bg-[#eee] w-full text-base rounded-lg mt-4 px-12 py-2'
              type="text"
              placeholder='Add your pick-up location 🧭' />

            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value)
              }}
              className='bg-[#eee] w-full text-base rounded-lg mt-4 px-12 py-2'
              type="text"
              placeholder='Add your drop destintion📍' />

          </form>
        </div>
        {/* panel for vehicle selection */}
        <div ref={panelRef} className='h-0 bg-white'>
          < LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>
      </div>
      {/* panel for vehicle selection */}
      <div
        ref={vehiclePanelRef}
        className='fixed w-full z-10 bg-white translate-y-full bottom-0 px-3 py-8 pt-10'>
        <VehiclePanel
          setVehiclePanel={setVehiclePanelOpen}
          setConfirmRidePanel={setConfirmRidePanel} />
      </div>
      {/* panel for confirmed ride */}
      <div
        ref={confirmRidePanelRef}
        className='fixed w-full z-10 bg-white translate-y-full bottom-0 px-3 py-6 pt-10'>
        <ConfirmedRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound} />
      </div>
      {/* panel for looking for driver/vehicle */}
      <div
        ref={VehicleFoundRef}
        className='fixed w-full z-10 bg-white translate-y-full bottom-0 px-3 py-6 pt-10'>
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>
      {/* this looks for the cureent state of the driver */}
      <div
        ref={WaitingForDriverRef}
        className='fixed w-full z-10 bg-white translate-y-full bottom-0 px-3 py-6 pt-10'>
        <WaitingForDriver WaitingForDriver={WaitingForDriver} />
      </div>
    </div>
  )
}

export default Home