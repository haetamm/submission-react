import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const editorStyles = `
  .quill-editor-wrapper {
    border: 1px solid var(--color);
    border-radius: 0.5rem;
    overflow: hidden;
  }
  .ql-toolbar {
    border-bottom: 1px solid var(--color);

  }
  .ql-container {
    min-height: 150px;
    background-color: var(--background-color);
    max-height: 200px;
    overflow-y: auto;
  }
  .ql-editor {
    padding: 8px;
    font-size: 16px;
  }
  .ql-editor:empty:before {
    content: attr(data-placeholder);
    font-style: italic;
  }
`;

const QuillEditor = ({ field }) => {
  const modules = {
    toolbar: [
      [{ header: [3, 4, 5, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div className="quill-editor-wrapper">
      <style>{editorStyles}</style>
      <ReactQuill
        theme="snow"
        value={field.value || ''}
        onChange={field.onChange}
        modules={modules}
      />
    </div>
  );
};

QuillEditor.propTypes = {
  field: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
};

export default QuillEditor;