import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = props =>{
    const [courseDetails, setCourseDetails] = useState(null);

    return(
        <DataContext.Provider value={[courseDetails, setCourseDetails]}>
            {props.children}
        </DataContext.Provider>
    )
}