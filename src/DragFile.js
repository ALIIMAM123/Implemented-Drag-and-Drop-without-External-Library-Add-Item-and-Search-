import React, { useState } from 'react';

const DragFile = (props) => {
  const [openSearchbar, setOpenSearchBar] = useState(false);
  let { sourceList, destinationList, searchText, filteredList } = props;

  const handleOpenSearchBar = (flag) => {
    if (flag === true) {
      setOpenSearchBar(true);
    } else {
      setOpenSearchBar(false);
    }
  };

  return (
    <>
      <ul
        className="ul-item"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          props.handleDrop(e, false);
        }}
      >
        <p className="title">Source List</p>
        {openSearchbar ? (
          <>
            <input
              className="search-field"
              type="search"
              placeholder="Search Items Here"
              value={searchText}
              onChange={(e) => props.handleSearch(e)}
            />
          </>
        ) : (
          filteredList &&
          filteredList.length > 0 && (
            <button onClick={() => handleOpenSearchBar(true)}>Search</button>
          )
        )}
        {filteredList && filteredList.length ? (
          filteredList.map((eachItem) => (
            <li
              className="li-item"
              key={eachItem.id}
              id={eachItem.id}
              draggable={true}
              onDragStart={(e) => props.onDragStart(e, eachItem.id)}
            >
              {eachItem.name}
            </li>
          ))
        ) : (
          <p className="no-item">No Items Found</p>
        )}
      </ul>
      <ul
        className="ul-item destination-list-container"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          props.handleDrop(e, true);
        }}
      >
        <p className="title">Destination List</p>
        {destinationList && destinationList.length ? (
          destinationList.map((eachItem) => (
            <li
              className="li-item"
              key={eachItem.id}
              id={eachItem.id}
              draggable={true}
              onDragStart={(e) => props.onDragStart(e, eachItem.id)}
            >
              {eachItem.name}
            </li>
          ))
        ) : (
          <p className="no-item">No Items Found</p>
        )}
      </ul>
    </>
  );
};

export default DragFile;
