import React from 'react';
import { Outlet } from 'react-router-dom';

const Container: React.FC = () => {
    return (
        <div className={`w-full h-screen flex justify-center items-center`}>
            <Outlet />
        </div>
    );
};

export default Container;