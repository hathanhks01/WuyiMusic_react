import React from 'react';
import {SideBarAdm,MainContentsAdm}  from '../Admin/index'

const Admin = () => {
    return (
        <div className='flex h-screen'>
            <SideBarAdm/>
            <MainContentsAdm/>
        </div>
    );
};

export default Admin;
