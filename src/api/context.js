import React, { useContext } from 'react' 

const AppContext = React.createContext(null)

// HOC
export const wrapContext = (component, config) => {
  return () => (
    <AppContext.Provider value={config}>
      {React.createElement(component)}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)