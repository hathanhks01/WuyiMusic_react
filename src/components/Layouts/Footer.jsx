import React from 'react'
import MusicPlayer from '../pages/User/MusicPlayer';
const Footer = () => {
  return (
    <div className='w-full h-16 border-4 border-green-400 bg-gray-800 text-white  text-center fixed bottom-0'>
    <div className="flex w-full h-full">
      <div className="flex-1 border-4 border-red-500 flex items-center justify-center"> {/* Phần 1 */}
        Section 1
      </div>
      <div className="flex-1 border-4 border-yellow-500 flex items-center justify-center"> {/* Phần 2 */}
        Section 2
      </div>
      <div className="flex-1 flex items-center justify-center"> {/* Phần 3 */}
        Section 3
      </div>
    </div>
  </div>
);
}

export default Footer