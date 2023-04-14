import React, { useEffect, useState } from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import useNoteStore from "../stores/note.store";
import { NoteService } from "../services/Note.service";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const MyEditor = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const { activeNote, setActiveNote, setNotes } = useNoteStore();

    const handleChange = (event, editor) => {
        const data = editor.getData();
        setContent(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!activeNote) {
            const newNoteData = await NoteService.create({ title, content });
            setActiveNote(newNoteData.note);
        } else {
            await NoteService.update({ id: activeNote._id, title, content });
        }

        const notesData = await NoteService.getAll();
        setNotes(notesData.notes);
    };

    useEffect(() => {
        if (activeNote) {
            setTitle(activeNote.title);
            setContent(activeNote.content);
        } else {
            setTitle("");
            setContent("");
        }
    }, [activeNote]);

    const handleSignOut = () => {
        Cookies.remove("token");
        navigate("/login");
    };

    return (
        <div className="flex-1 w-[75%] lg:w-[80%] xl:w-[85%] min-h-screen h-auto p-4 md:px-24">
            <>
                {/* Sign out button */}
                <div className="flex flex-row justify-end py-3 mb-4">
                    <button onClick={handleSignOut} className="bg-[#121212] hover:bg-danger hover:-translate-y-2 text-white font-bold py-2 px-4 rounded transition-all">
                        Sign out
                    </button>
                </div>

                <input
                    className="font-light w-full text-danger p-4 mb-10 text-lg border-b border-danger bg-stone-600/10 outline-0"
                    placeholder="Enter the title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />

                <CKEditor
                    editor={Editor}
                    data={content}
                    onChange={handleChange}
                    config={{
                        toolbar: ["heading", "bold", "italic", "underline", "bulletedList", "numberedList", "blockQuote", "undo", "redo", "link", "imageUpload", "codeBlock"],
                        placeholder: "Enter text here",
                        heading: {
                            options: [
                                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                                { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                                { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                                { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                                { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
                            ]
                        }
                    }}
                />

                <div className="flex flex-row flex-wrap mt-8 w-full">
                    <div className="flex flex-col w-40 mx-auto ">
                        <button className="bg-danger hover:bg-purple-7000 text-gray-100 rounded-md p-2 mt-1 outline-0" onClick={handleSubmit}>Publish</button>
                    </div>
                </div>
            </>
        </div>
    );
};

export default MyEditor;