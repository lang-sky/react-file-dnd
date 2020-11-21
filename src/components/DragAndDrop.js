import React from 'react';

const DragAndDrop = ({ data, dispatch }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let files = [...e.dataTransfer.files];
    if (files && files.length > 0) {
      const existingFiles = data.files.map((file) => file.name);
      files = files.filter((file) => !existingFiles.includes(file.name));
      dispatch({ type: 'ADD_FILE_TO_LIST', files });
      e.dataTransfer.clearData();
    }
    dispatch({ type: 'SET_DEPTH', depth: 0 });
    dispatch({ type: 'SET_IN_ZONE', inZone: false });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: 'SET_DEPTH', depth: data.depth + 1 });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    e.dataTransfer.dropEffect = 'copy';
    dispatch({ type: 'SET_IN_ZONE', inZone: true });
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: 'SET_DEPTH', depth: data.depth - 1 });
    if (data.depth > 0) return;
    dispatch({ type: 'SET_IN_ZONE', inZone: false });
  };

  return (
    <div
      className={
        data.inZone
          ? 'drag-and-drop-zone inside-drag-area'
          : 'drag-and-drop-zone'
      }
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <p>Drag files here to upload</p>
    </div>
  );
};

export default DragAndDrop;
