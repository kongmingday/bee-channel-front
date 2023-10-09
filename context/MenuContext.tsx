import {
  createContext,
  useReducer,
  useContext
} from 'react';

export const menuContext = createContext(null);
export const menuDispatchContext = createContext(null);

export const MenuProvider = ({ children }: any) => {
  const [menu, dispatch] = useReducer(
    menuReducer,
    false
  )

  return (
    <menuContext.Provider value={menu}>
      <menuDispatchContext.Provider value={dispatch as any}>
        {children}
      </menuDispatchContext.Provider>
    </menuContext.Provider>
  );
}

export const useMenu = (): any => {
  return useContext(menuContext)
}

export const useMenuDispatch = (): any => {
  return useContext(menuDispatchContext)
}

const menuReducer = (menu: any, action: any) => {
  switch (action.type) {
    case 'changed': {
      return action.state
    }
  }
}