import React, { useState } from 'react';
import Note from './Note';

function Notes() {
    // Active note index
    const [activeNoteIndex, setActiveNoteIndex] = useState(0);

    const handleClick = (index) => {
        setActiveNoteIndex(index);
    };

    return (
        <div className='flex flex-col w-[20%] h-full px-6 py-10 text-stone-400 border-x border-stone-600 overflow-y-auto'>
            <span className='block text-danger mb-4'>PINNED</span>

            <Note
                title={'Light & Bright in Brooklyn'}
                description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu dui.'}
                date={'Feb 8, 2021'}
                active
            />

            <span className='block text-danger my-4 border-y border-gray-600 -mx-6 px-6 py-1'>OTHER</span>

            {'12345678'.split('').map((_, i) => (
                <Note
                    title={'Light & Bright in Brooklyn'}
                    description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu dui.'}
                    date={'Feb 8, 2021'}
                    handleClick={() => handleClick(i)}
                    active={i === activeNoteIndex}
                />
            ))}
        </div>
    );
}

export default Notes;