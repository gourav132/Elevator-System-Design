import React, { useState, useContext } from 'react'
import Elevator from '../Elevator/Elevator'
import { RequestContext } from '../../Context/RequestContext'
import Up from '../../Assets/Up';
import Down from '../../Assets/Down';

export default function Floor() {
    const [externalRequest, setExternalRequest, elevator, setElevator] = useContext(RequestContext);

    const [selectedElevator, setSelectedElevator] = useState(null);

    const [ExtTime, setExtTime] = useState(1);

    const [internalRequest, setInternalRequest ] = useState({
        userCurrentFloor: null,
        RequestedFloor: null,
        allotedElevator: null
    })

    const handleDirection = (e) => {
        setExternalRequest({...externalRequest, direction: e.target.value, status: "ongoing"});
        handleExtReq();
    }

    const handleExtReq = () => {
        setSelectedElevator(null);
        const userCurrentFloor = parseInt(externalRequest.currentFloor);  // Extracting user's current floor
        let allotedElevator;

        // This object maps which elevator will go to which floor
        const floorToElevatorMap = {
            0: 'elevatorOne', 1: 'elevatorOne', 2: 'elevatorOne', 3: 'elevatorTwo', 4: 'elevatorTwo', 5: 'elevatorTwo', 6: 'elevatorTwo', 7: 'elevatorTwo', 8: 'elevatorThree', 9: 'elevatorThree', 10: 'elevatorThree'
        };

        allotedElevator = floorToElevatorMap[userCurrentFloor];
        setSelectedElevator(allotedElevator==="elevatorOne"? 1 : (allotedElevator === "elevatorTwo" ? 2 : 3));
        
        if (userCurrentFloor === elevator[allotedElevator]) {
            setExternalRequest({...externalRequest, status: "completed" });
            setSelectedElevator(allotedElevator==="elevatorOne"? 1 : (allotedElevator === "elevatorTwo" ? 2 : 3));
        } else {
            // Define the direction of movement: 1 for increasing, -1 for decreasing
            const direction = userCurrentFloor > elevator[allotedElevator] ? 1 : -1;

            let elevatorFloor = elevator[allotedElevator];
            const delay = 2000; // 2 minutes in milliseconds
            // Check if elevator needs to move
            if (elevatorFloor !== userCurrentFloor) {
                const intervalId = setInterval(() => {
                    elevatorFloor += direction;
                    setElevator({...elevator, [allotedElevator]: elevatorFloor });
                    setExtTime(ExtTime*2);
                    
                    if (elevatorFloor === userCurrentFloor) {
                        setSelectedElevator(allotedElevator==="elevatorOne"? 1 : (allotedElevator === "elevatorTwo" ? 2 : 3));
                        clearInterval(intervalId);
                        setExternalRequest({ ...externalRequest, status: "completed" });
                    }
                }, delay);
            }
        }
    }

    // Internal Request comes from Inside the Elevator
    const handleInternalRequest = (num) => {
        setInternalRequest({
            userCurrentFloor: externalRequest.currentFloor,
            RequestedFloor: num,
            allotedElevator: selectedElevator
        })
        let selectedElevatorName;
        let elevatorFloor = parseInt(externalRequest.currentFloor);

        if (selectedElevator === 1) selectedElevatorName = "elevatorOne"
        else if (selectedElevator === 2) selectedElevatorName = "elevatorTwo"
        else selectedElevatorName = "elevatorThree"



        if (parseInt(externalRequest.currentFloor) === num)
            alert("User has reached to his requested floor");
        else {
            const direction = ( elevator[selectedElevatorName] < num ) ? 1 : -1;
            const delay = 2000; // 2 Seconds in milliseconds
            
            // Check if elevator needs to move
            if (elevator[selectedElevatorName] !== num) {
                const intervalId = setInterval(() => {
                    elevatorFloor += direction;
                    setElevator({...elevator, [selectedElevatorName]: elevatorFloor });
                    setExtTime(ExtTime*2);
                    if (elevatorFloor === num) {
                        clearInterval(intervalId);
                        setExternalRequest({ ...externalRequest,currentFloor: elevatorFloor , status: "completed" });
                        alert("User has reached to his requested floor");
                        setSelectedElevator(null);
                        setElevator({
                            elevatorOne: 0,
                            elevatorTwo: 5, 
                            elevatorThree: 10, 
                        })
                    }
                }, delay);
            }
        }

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

        <Elevator id={1} selectedElevator={selectedElevator} handleInternalRequest={handleInternalRequest} />
        <Elevator id={2} selectedElevator={selectedElevator} handleInternalRequest={handleInternalRequest} />
        <Elevator id={3} selectedElevator={selectedElevator} handleInternalRequest={handleInternalRequest} />

        {/* <div className='w-80 h-72 rounded-lg overflowy-hidden z-10 border-2 border-yellow-500 text-white p-4 overflow-y-scroll'>
            <h1 className='mb-4 font-semibold text-green-500'>System Logs...</h1>
            <p> - User is at floor: <span>{externalRequest.currentFloor}</span></p>
            <p> - Direction user wants to go: <span>{externalRequest.direction}</span>  </p>
            <p> - Closest Elevator (id): {selectedElevator} </p>
            <p> - Time taken by elevator to reach users floor: {ExtTime}s</p>
            <br />
            <p> - User wants to go to floor: {internalRequest.RequestedFloor}</p>
            <p> - Time Taken by the elevator: </p>
        </div> */}
    </div>
  )
}
