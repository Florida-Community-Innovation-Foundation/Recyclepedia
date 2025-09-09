import React, { createContext, useState, useContext, useEffect } from 'react';

const RecyclingContext = createContext();

export const RecyclingProvider = ({ children }) => {
  const [itemsRecycled, setItemsRecycled] = useState(0); //counter for num of items recycled
  const [carbonOffset, setCarbonOffset] = useState(0);
  const[chosenItem, setChosenItem] = useState(null);



  return(
    <RecyclingContext.Provider
      value={{
        itemsRecycled,
        setItemsRecycled,
        carbonOffset,
        setCarbonOffset,
        chosenItem,
        setChosenItem
      }}
    >
      {children}
    </RecyclingContext.Provider>
  );
}

export const useRecycling = () => {
  return useContext(RecyclingContext);
};