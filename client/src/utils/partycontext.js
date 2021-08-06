import React,{createContext, useContext, useState} from "react"


const PartyContext = createContext();


export const usePartyContext = () => useContext(PartyContext);

export const PartyProvider =({children}) =>{

 const [ organiser, setOraganiser] = useState({}) 
 
 
 return (
     <PartyContext.Provider value={{organiser, setOraganiser}}>
         {children}
     </PartyContext.Provider>
 )

}

