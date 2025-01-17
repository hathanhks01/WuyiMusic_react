import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBarAdm from './SideBarAdm';
import MainContentsAdm from './MainContentsAdm';
import RatingAdm from './RatingAdm';
import SuggestionAdm from './SuggestionAdm';

const Admin = () => {
    return (
        <div className='flex h-screen bg-[#111727]'>
            <SideBarAdm />
            <div className="flex-grow">
                <MainContentsAdm>
                    <Routes>
                        <Route path="/" element={<h1>Admin Statistics</h1>} />
                        <Route path="/rating" element={<RatingAdm />} />
                        <Route path="/suggestion" element={<SuggestionAdm />} />
                        <Route path="*" element={<h1>404 - Admin Page Not Found</h1>} />
                    </Routes>
                </MainContentsAdm>
            </div>
        </div>
    );
};

export default Admin;