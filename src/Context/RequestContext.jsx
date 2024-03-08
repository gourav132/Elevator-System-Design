import React, { createContext, useState } from "react";

export const  RequestContext = createContext();

export const RequestProvider = ( props ) => {
    const [ externalRequest, setExternalRequest ] = useState({
        currentFloor: 0,
        direction: null,
        status: "completed"
    }) 

    console.log("External Request", externalRequest);

    const [ elevator, setElevator ] = useState({
        elevatorOne: 0,         //covers [0]-1-2        if the user is between 0 - 2 then select elevator 0
        elevatorTwo: 5,         //covers 3-4-[5]->6-7   if the user is between 3 - 7 then select elevator 2
        elevatorThree: 10,      //covers 8-9-[10]       if the user is between 8 - 10 then select elevator 3
    })

    return (
        <RequestContext.Provider value={[externalRequest, setExternalRequest, elevator, setElevator]} >
            { props.children }
        </RequestContext.Provider>
    )
}