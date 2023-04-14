import React, { useEffect, useState } from 'react';
import Note from './Note';
import { NoteService } from '../services/Note.service';
import useNoteStore from '../stores/note.store';

function Notes() {
    const [activeSidebar, setActiveSidebar] = useState(false);

    // Active note index
    const { activeNote, setActiveNote, notes, setNotes } = useNoteStore();

    const handleNewNote = () => {
        setActiveNote(null);
    };

    const handleClick = async (note) => {
        const noteDetailData = await NoteService.get({ id: note._id });
        setActiveNote(noteDetailData.note);
    };

    useEffect(() => {
        const init = async () => {
            const notesData = await NoteService.getAll();
            setNotes(notesData.notes);
        }
        init();
    }, []);

    const toggleSidebar = () => {
        setActiveSidebar(!activeSidebar);
    };

    const getSidebarClass = () => {
        if (activeSidebar) return 'translate-x-0';
        return '-translate-x-full';
    };

    return (
        <>
            <button className='lg:hidden fixed top-1/2 left-0 -translate-x-1/2 bg-danger w-20 h-20 z-20 rounded-full' onClick={toggleSidebar}></button>

            <div className={`z-10 absolute lg:relative flex flex-col w-[75%] lg:w-[20%] xl:w-[15%] h-screen px-6 py-6 bg-[#121212] text-stone-400 overflow-x-hidden overflow-y-auto lg:translate-x-0 transition-all ${getSidebarClass()}`}>
                <button className='bg-danger text-white rounded w-fit px-10 py-3 mx-auto mb-2' onClick={handleNewNote}>
                    New Note
                </button>

                {/* <span className='block text-danger mb-4'>PINNED</span> */}

                {/* <Note
                title={'Light & Bright in Brooklyn'}
                description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu dui.'}
                date={'Feb 8, 2021'}
                active
            /> */}

                <span className='block text-danger my-4 border-y border-gray-600 -mx-6 px-6 py-1'>NOTES</span>

                {notes?.map((note, i) => (
                    <Note
                        note={note}
                        handleClick={() => handleClick(note)}
                        active={note._id === activeNote?._id}
                    />
                ))}
            </div>
        </>
    );
}

export default Notes;