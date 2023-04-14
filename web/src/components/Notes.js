import React, { useEffect, useState } from 'react';
import Note from './Note';
import { NoteService } from '../services/Note.service';
import useNoteStore from '../stores/note.store';

function Notes() {
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

    return (
        <div className='hidden md:flex flex-col w-[15%] h-full px-6 py-6 text-stone-400 border-x border-stone-600 overflow-x-hidden overflow-y-auto'>
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
                    title={note.title}
                    description={note.content}
                    date={note.updatedAt}
                    handleClick={() => handleClick(note)}
                    active={note._id === activeNote?._id}
                />
            ))}
        </div>
    );
}

export default Notes;