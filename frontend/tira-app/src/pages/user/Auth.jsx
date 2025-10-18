import React from 'react';
import { Outlet } from 'react-router-dom';


const Auth = () => {
  return (
    <div className='flex flex-row justify-center items-center gap-4'>
      <Outlet />
    </div>
  );
}

export default Auth;
