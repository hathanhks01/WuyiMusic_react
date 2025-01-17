import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SideBarAdm, MainContentsAdm } from '../Admin/index'
import RatingAdm from './RatingAdm';
import SuggestionAdm from './SuggestionAdm';

const Admin = () => {
    return (
        <div className='flex h-screen bg-'>
            <SideBarAdm />
            <div className="flex-grow">
                <Routes>
                    <Route path="/" element={<h1>Admin Statics</h1>} />
                    <Route path="/ratingAdm" element={<RatingAdm />} />
                    <Route path="/suggestionAdm" element={<SuggestionAdm />} />
                    <Route path="*" element={<h1>404 - Admin Page Not Found</h1>} />
                </Routes>
            </div>
        </div>
    );
};

export default Admin;
