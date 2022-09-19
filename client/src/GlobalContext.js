import { createContext, useReducer, useContext } from "react";

var global = {
  username: "",
  authorized: false,
  isAdmin: false
};

export const globalContext = createContext(global);
export const dispatchContext = createContext(undefined);

export default function GlobalStateProvider({ children }) {
  const [state, dispatch] = useReducer(
    (state, newValue) => ({...state,...newValue}),
    global
  );
  return (
    <globalContext.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </globalContext.Provider>
  );
}

export const useGlobalContext = () => [
  useContext(globalContext),
  useContext(dispatchContext),
];