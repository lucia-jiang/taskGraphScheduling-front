import React from 'react';

const DragAndDropUpload = ({ onFileUpload }) => {
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target.result);
                onFileUpload(json);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        };

        if (file) {
            reader.readAsText(file);
        }
    };

    return (
        <div className="drag-and-drop-upload">
            <input type="file" accept=".json" onChange={handleFileUpload} />
        </div>
    );
};

export default DragAndDropUpload;
