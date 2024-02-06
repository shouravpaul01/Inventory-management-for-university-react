import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({ field, placeholder }) => {
    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'size': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link'],
            ['clean']
        ],
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet',
        'link', 'image', 'video'
    ];
    const editorStyles = {
        border: '1px solid #d1d5db',
        borderRadius: '0.375rem',
        minHeight: '200px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '1rem',
        lineHeight: '1.5',
    };
    return (
        <ReactQuill
            className=" bg-white rounded-md focus:border-none focus:border-blue-500"
            theme="snow"
            value={field.value}
            onChange={(content, delta, source, editor) => {
                field.onChange(content);
            }}

            modules={modules}
            formats={formats}
            placeholder={placeholder}
        />
    );
};

export default QuillEditor;