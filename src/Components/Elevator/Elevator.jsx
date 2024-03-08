import React, { useState, useEffect, useContext } from 'react'
import { RequestContext } from '../../Context/RequestContext';
import { motion } from 'framer-motion'

export default function Elevator({id}) {

  const [externalRequest, setExternalRequest, elevator, setElevator] = useContext(RequestContext);
  const [ isAnimating, setIsAnimating ] = useState(true);
  const [ selectedElevator, setSelectedElevator ] = useState(null);
  const [currentFloor, setCurrentFloor] = useState(null);

  useEffect(() => {
    if (externalRequest.status === "ongoing") {
      if (externalRequest.currentFloor >= 0 && externalRequest.currentFloor <= 2) {
          setSelectedElevator(1);
        if (externalRequest.currentFloor === elevator.elevatorOne) {
          setExternalRequest({ ...externalRequest, status: "completed" });
        } else {
          setElevator({ ...elevator, elevatorOne: externalRequest.currentFloor });
        }
      } else if (externalRequest.currentFloor >= 3 && externalRequest.currentFloor <= 7) {
          setSelectedElevator(2);
        if (externalRequest.currentFloor === elevator.elevatorTwo) {
          setExternalRequest({ ...externalRequest, status: "completed" });
        } else {
          setElevator({ ...elevator, elevatorTwo: externalRequest.currentFloor });
        }
      } else if (externalRequest.currentFloor >= 8 && externalRequest.currentFloor <= 10) {
          setSelectedElevator(3);
        if (externalRequest.currentFloor === elevator.elevatorThree) {
          setExternalRequest({ ...externalRequest, status: "completed" });
        } else {
          setElevator({ ...elevator, elevatorThree: externalRequest.currentFloor });
        }
      }
    }
  });

  const handleInternalRequest = (num) => {
    console.log("Current Floor: ", Number(externalRequest.currentFloor));
    console.log("Requested Floor: ", num);
    console.log("Selected Elevator", selectedElevator);
    if(selectedElevator === 1) {
      setElevator({...elevator, elevatorOne: num})
    } else if (selectedElevator === 2) {
      setElevator({...elevator, elevatorTwo: num})
    } else {
      setElevator({...elevator, elevatorThree: num})
    }
    setExternalRequest({...externalRequest, currentFloor: num, direction: null})
    alert("User has reached to his requested floor");
    setSelectedElevator(null);
    setElevator({
      elevatorOne: 0,
      elevatorTwo: 5, 
      elevatorThree: 10, 
    })
  }
  

  return (
    <div className='w-10/12 mt-10 mx-auto'>
        <div className='flex items-center'>
            <div className='overflow-hidden'>
                <div className={`w-full h-14 bg-transparent border-2 border-zinc-900 rounded-lg flex justify-center items-center font-bold text-white ${selectedElevator===id ? 'border-green-200' : 'border-zinc-900'}`}>
                    <p>ELV{id}- FLOOR <span className='text-green-400'> {id===1 ? elevator.elevatorOne: (id===2 ? elevator.elevatorTwo : elevator.elevatorThree)}</span></p>
                </div>
                <div id='elvContainer' className={`overflow-hidden mt-5 border-2 rounded-md p-3 border-zinc-900 ${selectedElevator===id ? 'border-green-200' : 'border-zinc-900'}`}>
                <motion.div
                    animate={{y: isAnimating ? externalRequest.direction : 0}}
                    transition={{
                      duration: 1.5, // Adjust animation duration as needed
                      repeat: isAnimating ? 2 : "",
                      ease: 'linear',
                      repeatDelay: 0.5
                    }}
                    exit={{y:0}}
                    className='w-64 h-80 bg-zinc-800 rounded-lg overflowy-hidden z-10'
                  >
                  {selectedElevator === id && (
                    <div className="grid grid-cols-3 gap-2 p-2">
                      {[...Array(11).keys()].map(num => (
                        <button key={num} onClick={() => handleInternalRequest(num)} className="bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded">
                          {num}
                        </button>
                      ))}
                    </div>
              )}
                </motion.div>
                </div>
            </div>
        </div>
        <button onClick={() =>setIsAnimating(!isAnimating)}>stop</button>
    </div>
  )
}
