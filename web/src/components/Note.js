import React from 'react';
import moment from 'moment';
import { NoteService } from '../services/Note.service';
import useNoteStore from '../stores/note.store';

function Note({ note, active = false, handleClick = () => { } }) {
    const { notes, setNotes } = useNoteStore();

    const handleRemove = async (e) => {
        e.stopPropagation();

        await NoteService.remove({ id: note._id });
        const notesData = await NoteService.getAll();
        setNotes(notesData.notes);
    };

    return (
        <button
            className={`group relative flex flex-col gap-y-2 p-4 -mx-4 text-left hover:opacity-80 border-b border-danger ${active && 'bg-danger text-stone-900 !opacity-100 rounded'}`}
            onClick={handleClick}
        >
            <h2 className='text-base font-bold text-ellipsis'>{note.title}</h2>
            {/* <p className='text-sm font-normal' dangerouslySetInnerHTML={{__html: description}}></p> */}
            <span className='text-xs font-normal'>{moment(note.date).fromNow()}</span>

            {/* Remove button */}
            <button onClick={handleRemove} className={`absolute top-1/2 right-2 -translate-y-1/2 p-2 rounded text-white bg-primary hover:scale-125 transition-all opacity-0 scale-0 ${active && '!opacity-100 scale-100'}`}>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
                </svg>
            </button>
        </button>
    );
}

export default Note;