import React from 'react';

const MainContentsAdm = ({ children }) => {
  return (
    <div className='w-4/5 right-0 flex h-screen bg-[#111727] text-white'>
        {children}
    </div>
  );
}

export default MainContentsAdm;
