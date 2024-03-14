import React, { createContext, useState } from "react";

export const  RequestContext = createContext();

export const RequestProvider = ( props ) => {
    const [ externalRequest, setExternalRequest ] = useState({
        currentFloor: 0,
        direction: null,
        status: "completed"
    }) 

    // console.log("External Request", externalRequest);
    
    const [ elevator, setElevator ] = useState({
        elevatorOne: 0,
        elevatorTwo: 5,
        elevatorThree: 10,
    })
    console.log(elevator);

    const [ time, setTime ] = useState({
        ExtTime: 0,
        IntTime: 0
    })

    return (
        <RequestContext.Provider value={[externalRequest, setExternalRequest, elevator, setElevator]} >
            { props.children }
        </RequestContext.Provider>
    )
}