import React, { useState, useEffect, useContext } from 'react'
import { RequestContext } from '../../Context/RequestContext';
import { motion } from 'framer-motion'

export default function Elevator({id, selectedElevator, handleInternalRequest}) {

  const [externalRequest, setExternalRequest, elevator, setElevator] = useContext(RequestContext);

  const [elevatorName, setElevatorName ] = useState(null);

  useEffect(() => {
    if (selectedElevator === 1) setElevatorName("elevatorOne")
    else if (selectedElevator === 2) setElevatorName("elevatorTwo")
    else setElevatorName("elevatorThree")
  }, [selectedElevator])

  return (
    <div className=''>
        <div className='flex items-center'>
            <div className='overflow-hidden'>
                <div className={`w-full h-14 bg-transparent border-2 border-zinc-900 rounded-lg flex justify-center items-center font-bold text-white ${selectedElevator===id ? 'border-yellow-300' : 'border-zinc-800'}`}>
                    <p>ELV{id}- FLOOR <span className='text-green-400'> {id===1 ? elevator.elevatorOne: (id===2 ? elevator.elevatorTwo : elevator.elevatorThree)}</span></p>
                </div>
                <div 
                  id='elvContainer' 
                  className={`overflow-hidden mt-5 border-2 rounded-md p-6 border-zinc-900 w-72 h-80 ${selectedElevator===id ? 'border-yellow-300' : 'border-zinc-900'}`}
                >
                  {selectedElevator === id &&
                    <motion.div
                        transition={{
                          duration: 1.5,
                          // repeat: isAnimating.step,
                          repeatType: "loop",
                          ease: 'linear', 
                          repeatDelay: 0.5,
                        }}
                        className='bg-zinc-800 rounded-lg overflowy-hidden z-10'
                      >

                      {(selectedElevator === id && Number(externalRequest.currentFloor) === elevator[elevatorName]) &&  (
                        <><p className='text-center text-white py-4 font-semibold'>Please select a floor</p>
                        <div className="grid grid-cols-3 gap-2 p-2">
                          {[...Array(11).keys()].map(num => (
                            <button key={num} onClick={() => handleInternalRequest(num)} className="bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded">
                              {num}
                            </button>
                          ))}
                        </div></>
                    )}
                    </motion.div> 
                  }
                </div>
            </div>
        </div>
    </div>
  )
}
