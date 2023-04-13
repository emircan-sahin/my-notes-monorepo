import React, { useEffect, useState } from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const MyEditor = () => {
    const [content, setContent] = useState("");

    const handleChange = (event, editor) => {
        const data = editor.getData();
        setContent(data);
    };

    return (
        <div className="flex-1 p-24">
            <div id="editor"></div>
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
        </div>
    );
};

export default MyEditor;