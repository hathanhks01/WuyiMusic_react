import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='fixed pt-3 top-16 left-0 w-1/5 h-full bg-[#111727] border-double border-2 border-sky-500 overflow-y-auto'>
      <ul>
        <li className="mb-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block p-2 ${isActive ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/20 hover:text-white'}`
            }
          >
            Khám Phá
          </NavLink>
        </li>
        <li className="mb-2 ">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `block p-2 ${isActive ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/20 hover:text-white'}`
            }
          >
            Profile
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink
            to="/Library"
            className={({ isActive }) =>
              `block p-2 ${isActive ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/20 hover:text-white'}`
            }
          >
            Thư viện
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
