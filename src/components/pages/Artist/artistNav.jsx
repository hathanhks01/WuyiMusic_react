import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ArtistNav = () => {
  const location = useLocation();
  
  // Function to check if link is active
  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active text-blue-600' : 'nav-link';
  };

  return (
    <div className='h-16 flex flex-col items-center'>
      <div className='w-full text-2xl mt-6 '>
        <div className='flex justify-center space-x-8'>
            <Link to="/" className="text-[30px] text-red-700 font-bold">WuyiMusic</Link>
          <Link 
            to="/artist" 
            className={isActive('/artist')}
          >
            Home
          </Link>
          <Link 
            to="/artist/profile" 
            className={isActive('/artist/profile')}
          >
            Profile
          </Link>
          <Link 
            to="/artist/upload" 
            className={isActive('/artist/upload')}
          >
            Upload
          </Link>
          <Link 
            to="#" 
            className={isActive('/artist/contact')}
          >
            My Track
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtistNav;