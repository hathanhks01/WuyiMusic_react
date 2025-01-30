import React from 'react';
import{Profile} from '../Artist/index'
import { Route, Routes } from 'react-router-dom';

const Artist = () => {
    return (
        <Routes>
            <Route path='/artist' element={<Profile />} />

        </Routes>
    );
};

export default Artist;
