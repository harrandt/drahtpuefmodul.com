import { Stack} from '@mui/material';
import React from 'react';

export function displayVersions(versionQuery: any) {
     return <Stack
               sx={{
            borderColor: 'blue',
            borderWidth: '5px',
            backgroundColor: '#1417d4',
            padding: 1,
            color: 'white',
        }}
    >
     
    {Object.keys(versionQuery?.data).map((key, index) => (
        <div key={index}> {key}: {versionQuery?.data[key]}</div> 
    ))}  
 
   </Stack>;
}
