import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const SideBarAdm = () => {
  return (
    <div className='w-1/5 left-0 flex flex-col h-screen p-0 m-0 border-2 border-red-100 bg-[#111727] text-white'>
        <div className='pl-18 pt-2 flex justify-center'>
            <Link to="/admin" className="text-[30px] text-red-700 font-bold">
                WuyiMusic
            </Link>
        </div>
        <div className=' pt-2 flex-grow'>
            <ul className='w-full pl-2'>
                <li className="mb-2">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `block p-2 ${isActive ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/20 hover:text-white'}`
                        }
                    >
                        DashBroard
                    </NavLink>
                </li>
                <li className="mb-2">
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
    </div>
  );
}

export default SideBarAdm;
