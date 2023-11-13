import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

export const TrackingContext = createContext();

export const useTracking = () => {
  return useContext(TrackingContext);
}

export const TrackingProvider = ({ children }) => {
  return (
    <TrackingContext.Provider value={value}>
      {children}
    </TrackingContext.Provider>
  )
}