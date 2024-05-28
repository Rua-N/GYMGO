import React, { createContext, useState } from 'react';

export const ExerciseContext = createContext();

export const ExerciseProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);

  const clearExercises = () => {
    setExercises([]);
  };

  return (
    <ExerciseContext.Provider value={{ exercises, setExercises, clearExercises }}>
      {children}
    </ExerciseContext.Provider>
  );
};
