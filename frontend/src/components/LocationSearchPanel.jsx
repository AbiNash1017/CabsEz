import React from 'react'


const LocationSearchPanel = (props) => {

  //sample array of location
  const locations = [
    " Mysore Palace: Sayyaji Rao Road, Mysuru, Karnataka 570001",

    "Brindavan Gardens: KRS Dam Road, Mandya District, Mysuru, Karnataka 571607",

    "Chamundi Hill: Chamundi Hill Road, Mysuru, Karnataka 570010",

    "Mysore Zoo: Indiranagar, Ittige Gudu, Mysuru, Karnataka 570010",

    "Jaganmohan Palace: Chamrajpura, Mysuru, Karnataka 570004"
  ]
  return (
    <div>
      {
        locations.map(function (elem, idx) {
          return <div
            key={idx}
            onClick={() => {
              props.setVehiclePanelOpen(true)
              props.setPanelOpen(false)
            }}
            className='my-2 border-2 p-3 rounded-xl border-grborder-gray-200 active:border-black flex items-center justify-start gap-4'>
            <h2 className='bg-[#eeee] p-1 rounded-full items-center'>
              <i className="ri-map-pin-fill p-1 text-xl"></i></h2>
            <h4 className='text-[18px] font-medium'>{elem}</h4>
          </div>
        })
      }

    </div>
  )
}

export default LocationSearchPanel