import React, { createContext, useState } from 'react';

export const ExerciseContext = createContext();

export const ExerciseProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);
  const [nomeTreino, setNomeTreino] = useState('');

  const clearExercises = () => {
    setExercises([]);
    setNomeTreino('');

  };

  return (
    <ExerciseContext.Provider value={{ exercises, setExercises, clearExercises, nomeTreino, setNomeTreino }}>
      {children}
    </ExerciseContext.Provider>
  );
};
