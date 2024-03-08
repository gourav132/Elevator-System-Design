import React, { useState, useContext } from 'react'
import { RequestContext } from '../../Context/RequestContext';

export default function Hero() {
  const [ floorChangeToggle, setFloorChangeToggle ] = useState(false);
  const [floor, setFloor ] = useState(null);
  const [ externalRequest, setExternalRequest, elevator, setElevator ] = useContext(RequestContext);

  const handleFloorChange = () => {
    // add validation for floor number not exceeding 0-10
    if(floor >= 0 && floor <= 10) {
      setExternalRequest({...externalRequest, currentFloor: floor});
      setFloorChangeToggle(false)
      // setElevator({
      //   elevatorOne: 0,
      //   elevatorTwo: 5,
      //   elevatorThree: 10
      // })
    }
  }

  return (
    <div className='w-10/12 mx-auto text-white pt-10 grid justify-items-stretch grid-cols-2 '>
      <h1 className='text-xl'>Elevator <span className='text-red-200'>Simulation</span></h1>
      <div className='justify-self-end relative'>
        <button onClick={() => setFloorChangeToggle(!floorChangeToggle)} className='font-semibold text-sm bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-md hover:ring-2 hover:ring-purple-400'>
          <p>Current Floor <span>{externalRequest.currentFloor}</span></p>
        </button>

        { floorChangeToggle && 
          <div className='absolute right-0 top-12 flex gap-1 items-center'>
            <input onChange={(e) => setFloor(e.target.value)} className='w-38 px-3 pr-14 py-3 rounded bg-slate-800 text-xs relative outline-none focus:ring-2' type="text" placeholder='Your Current floor (0-10)' />
            <button onClick={handleFloorChange} className='text-xs px-2 py-1 bg-blue-500 rounded-sm absolute right-2 hover:ring-2'>SET</button>
          </div>
        }
      </div>
    </div>
  )
}
