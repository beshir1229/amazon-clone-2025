import React ,{useState,createContext, useContext} from 'react'

const colorContext = createContext()

 export const useColor =()=> {
    return useContext(colorContext)
}

export const ThemeProvider = ({Children})=>{
    const [color, setcolor] = useState ('light')

    const colorToogler =()=> {
        setcolor((pre)=>pre==='light'?'dark':'light')
    }


  return (
    <colorContext.Provider value={{color,colorToggler}}>{Children}</colorContext.Provider>
  )
}