import { createContext, useContext } from 'react';

export const initialValue = {
  trackedGames: undefined,
};

export const Context = createContext(initialValue);
export const useContextHook = useContext;
