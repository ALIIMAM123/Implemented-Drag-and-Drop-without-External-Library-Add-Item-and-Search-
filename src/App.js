import React, { useState, useEffect } from 'react';
import DragFile from './DragFile';
import './style.css';

// const dummyData = [
//   { id: 1, name: 'apple' },
//   { id: 2, name: 'banana' },
//   { id: 3, name: 'mango' },
//   { id: 4, name: 'pineapple' },
//   { id: 5, name: 'papaya' },
//   { id: 6, name: 'guava' },
//   { id: 7, name: 'brinjal' },
//   { id: 8, name: 'tomato' },
//   { id: 9, name: 'potato' },
//   { id: 10, name: 'grapes' },
//   { id: 11, name: 'palak' },
//   { id: 12, name: 'litchi' },
//   { id: 13, name: 'strawberry' },
//   { id: 14, name: 'kiwi' },
// ];

export default function App() {
  const [textInput, setTextInput] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);
  const [sourceList, setSourceList] = useState([]);
  const [destinationList, setDestinationList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [error, setError] = useState(false);

  // dragged Item
  const onDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', item);
    setDraggedItem(item);
  };

  // Drag and Drop
  const handleDrop = (e, isDragged) => {
    e.preventDefault();
    const draggedId = parseInt(e.dataTransfer.getData('text/plain'));
    console.log(isDragged, 'isSragged');

    if (isDragged) {
      if (!destinationList.some((eachItem) => eachItem.id === draggedId)) {
        const draggedItem = sourceList.find(
          (eachItem) => eachItem.id === draggedId
        );
        setDestinationList([...destinationList, draggedItem]);
        const updatedSource = sourceList.filter(
          (eachItem) => eachItem.id !== draggedId
        );
        setSourceList(updatedSource);
      }
    } else {
      if (!sourceList.some((eachItem) => eachItem.id === draggedId)) {
        const draggedItem = destinationList.find(
          (eachItem) => eachItem.id === draggedId
        );
        if (draggedItem) {
          setSourceList([...sourceList, draggedItem]);
          const updatedDestination = destinationList.filter(
            (eachItem) => eachItem.id !== draggedId
          );
          setDestinationList(updatedDestination);
        }
      }
    }
  };

  const handleInput = (e, text) => {
    setTextInput(e.target.value);
  };

  const handleSubmit = (e) => {
    if (!textInput.length > 0) {
      setError(true);
      return;
    }
    setError(false);
    setSourceList((prev) => [
      ...prev,
      { id: Math.floor(Math.random() * 1000000), name: textInput },
    ]);
    setTextInput('');
  };

  // search source List
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // console.log(filteredList, 'new');

  useEffect(() => {
    const getFilteredResult = sourceList.filter((eachItem) =>
      eachItem.name.includes(searchText)
    );
    setFilteredList(getFilteredResult);
  }, [sourceList, searchText]);

  //  get data from api
  // useEffect(() => {
  //   if (dummyData && dummyData.length) {
  //     setSourceList(dummyData);
  //   }
  // }, [dummyData]);

  return (
    <div className="main-container">
      <h4 className="drag-drop-text">Drag & Drop Functionality</h4>

      <div className="input-field">
        <input
          type="text"
          name="textInput"
          value={textInput}
          onChange={(e) => handleInput(e)}
          placeholder="Enter  Here "
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Submit
        </button>
      </div>

      {error ? (
        <p style={{ color: error ? 'red' : '' }}>Please Enter First</p>
      ) : null}

      <div className="container">
        <DragFile
          sourceList={sourceList}
          onDragStart={onDragStart}
          draggedItem={draggedItem}
          handleDrop={handleDrop}
          destinationList={destinationList}
          handleSearch={handleSearch}
          searchText={searchText}
          filteredList={filteredList}
        />
      </div>
    </div>
  );
}
