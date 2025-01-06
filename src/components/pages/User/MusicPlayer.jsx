import React from 'react';
import './MusicPlayer.css';

function MusicPlayer() {
  return (
    <div className="w-full">
      <div className="h-2 bg-red-500"></div>
      <div className="flex items-center justify-center h-screen bg-red-100">
        <div className="bg-white shadow-lg rounded-lg" style={{ width: '45rem' }}>
          <div className="flex">
            <div>
              <img
                className="w-full rounded hidden md:block"
                src="https://tailwindcss.com/img/card-top.jpg"
                alt="Album Pic"
              />
            </div>
            <div className="w-full p-8">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-2xl text-gray-800 font-medium">A Sky Full of Stars</h3>
                  <p className="text-sm text-gray-600 mt-1">Ghost Stories</p>
                </div>
                <div className="text-red-300">
                  <i className="bi bi-heart-fill"></i>
                </div>
              </div>
              <div className="flex justify-between items-center mt-8">
                <i className="bi bi-skip-backward-fill text-gray-600 text-2xl"></i>
                <i className="bi bi-play-fill text-white text-4xl p-4 bg-red-500 rounded-full shadow-lg"></i>
                <i className="bi bi-skip-forward-fill text-gray-600 text-2xl"></i>
              </div>
            </div>
          </div>
          <div className="mx-8 py-4">
            <div className="flex justify-between text-sm text-gray-600">
              <p>0:40</p>
              <p>4:20</p>
            </div>
            <div className="mt-1">
              <div className="h-1 bg-gray-400 rounded-full">
                <div className="w-1/5 h-1 bg-red-500 rounded-full relative">
                  <span className="w-4 h-4 bg-red-500 absolute -right-2 bottom-0 -mb-1 rounded-full shadow"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
