import React, { useState, useContext } from 'react'
import Elevator from '../Elevator/Elevator'
import { RequestContext } from '../../Context/RequestContext'

export default function Floor() {
    const [externalRequest, setExternalRequest, elevator, setElevator] = useContext(RequestContext);


    const handleUP = () => {
        setExternalRequest({...externalRequest, direction: "UP", status: "ongoing"});
    }
    const handleDown = () => {
        setExternalRequest({...externalRequest, direction: "DOWN", status: "ongoing"});
    }


  return (
    <div className='w-10/12 mx-auto flex items-center place-content-center content-center'>
        <div className='mr-10'>
            <button onClick={handleUP} className='bg-purple-700 text-white px-3 py-3 block rounded-full hover:bg-gray-500 ring-0 hover:ring-2 hover:ring-green-300'>
                <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 15L10 9.84985C10.2563 9.57616 10.566 9.35814 10.9101 9.20898C11.2541 9.05983 11.625 8.98291 12 8.98291C12.375 8.98291 12.7459 9.05983 13.0899 9.20898C13.434 9.35814 13.7437 9.57616 14 9.84985L19 15" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>

            <button onClick={handleDown} className='bg-purple-700 text-white px-3 py-3 block rounded-full hover:bg-gray-500 ring-0 hover:ring-2 hover:ring-yellow-300 mt-2'>
                <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>  
        </div>
        <Elevator id={1} />
        <Elevator id={2} />
        <Elevator id={3} />
    </div>
  )
}
