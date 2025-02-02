import React from 'react'

export const MainContentsArtist = ({ children }) => {
    return (
        <div className='w-full h-full  flex flex-col overflow-hidden'>
            {children}
        </div>
    );
};

