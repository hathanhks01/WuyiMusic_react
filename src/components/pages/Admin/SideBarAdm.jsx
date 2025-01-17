import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
const SideBarAdm = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-1/5 left-0 flex flex-col h-screen p-0 m-0 border-2 border-red-100 bg-[#111727] text-white">
      <div className="pl-18 pt-2 flex justify-center">
        <Link to="/admin" className="text-[30px] text-red-700 font-bold">
          WuyiMusic
        </Link>
      </div>
      <div className="pt-2 flex-grow">
        <ul className="w-full pl-2">
          <li className="mb-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block p-2 ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/20 hover:text-white'
                }`
              }
            >
              Statistics
            </NavLink>
          </li>
          {/* Dropdown Menu */}
          <li className="mb-2">
            <button
              onClick={toggleDropdown}
              className="block w-full text-left p-2 text-white/80 hover:bg-white/20 hover:text-white"
            >
              Manager
            </button>
            {isDropdownOpen && (
              <ul className="pl-4">
                <li className="mb-2">
                  <NavLink
                    to="/ratingAdm"
                    className={({ isActive }) =>
                      `block p-2 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'text-white/80 hover:bg-white/20 hover:text-white'
                      }`
                    }
                  >
                    Rating
                  </NavLink>
                </li>
                <li className="mb-2">
                  <NavLink
                    to="/suggestionAdm"
                    className={({ isActive }) =>
                      `block p-2 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'text-white/80 hover:bg-white/20 hover:text-white'
                      }`
                    }
                  >
                    Suggestion
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBarAdm;
