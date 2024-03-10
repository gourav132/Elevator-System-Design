import React, { useState, useContext } from 'react'
import Elevator from '../Elevator/Elevator'
import { RequestContext } from '../../Context/RequestContext'
import Up from '../../Assets/Up';
import Down from '../../Assets/Down';

export default function Floor() {
    const [externalRequest, setExternalRequest, elevator, setElevator] = useContext(RequestContext);

    const handleDirection = (e) => {
        setExternalRequest({...externalRequest, direction: e.target.value, status: "ongoing"});
    }


  return (
    <div className='w-10/12 mx-auto flex items-center gap-10'>
        <div className='mr-10'>
            <button 
                onClick={(e) => handleDirection(e)} 
                value="up" 
                className='bg-purple-700 text-white px-3 py-3 block rounded-full hover:bg-gray-500 ring-0 hover:ring-2 hover:ring-green-300'
            > <Up /> </button>

            <button 
                onClick={(e) => handleDirection(e)} 
                value="down" 
                className='bg-purple-700 text-white px-3 py-3 block rounded-full hover:bg-gray-500 ring-0 hover:ring-2 hover:ring-yellow-300 mt-2'
            > <Down /> </button>  
        </div>

        <Elevator id={1} />
        <Elevator id={2} />
        <Elevator id={3} />

        {/* <div className='w-64 h-72 rounded-lg overflowy-hidden z-10 border-2 border-yellow-500 text-white p-4'>
            <h1 className='mb-4 font-semibold text-green-500'>System Logs...</h1>
            <p> - User is at floor: <span>{externalRequest.currentFloor}</span></p>
            <p> - Direction user wants to go: <span>{externalRequest.direction}</span>  </p>
            <p> - Closest Elevator (id): </p>
            <p> - Time taken by elevator to reach users floor: </p>
            <br />
            <p> - User wants to go to floor: </p>
            <p> - Time Taken by the elevator: </p>
        </div> */}
    </div>
  )
}
