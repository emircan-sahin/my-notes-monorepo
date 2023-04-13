import React from 'react';

function Note({ title, description, date, active = false, handleClick = () => {} }) {
    return (
        <button
            className={`flex flex-col gap-y-2 p-4 -mx-4 rounded text-left hover:opacity-80 ${active && 'bg-danger text-stone-900 !opacity-100'}`}
            onClick={handleClick}
        >
            <h2 className='text-base font-bold'>{title}</h2>
            <p className='text-sm font-normal'>{description}</p>
            <span className='text-xs font-normal'>{date}</span>
        </button>
    );
}

export default Note;