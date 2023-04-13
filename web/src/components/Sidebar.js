import React, { useEffect } from 'react';

function Sidebar() {
    return (
        <div className='flex flex-col w-[15%] h-full p-10 bg-[#2C2C2C] text-stone-400'>
            <h1 className='mb-10 text-danger font-bold text-xl'>MY NOTES</h1>
            
            <input type="text" className='text-stone-200 bg-stone-600 rounded-md px-2 h-8 mb-10 focus:outline-none' />
            
            <div className='flex flex-col gap-y-3 text-lg'>
                <button className='text-left'>Notes</button>
                <button className='text-left opacity-40 hover:opacity-70'>Login</button>
                <button className='text-left opacity-40 hover:opacity-70'>Register</button>
                <button className='text-left opacity-40 hover:opacity-70'>Sign out</button>
            </div>
        </div>
    );
}

export default Sidebar;