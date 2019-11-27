import React, { createContext, useReducer } from 'react'
import uuid from 'uuid'
import alertReducer from './alertReducer'


export const AlertContext = createContext()

export const AlertState = props => {
  const initialState = []

  const [state, dispatch] = useReducer(alertReducer, initialState)

  // //Add Contact
  // const addContact = () => {
  //   dispatch({ type: "", payload:  })
  // }
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid.v4()
    dispatch({ type: "SET_ALERT", payload: { msg, type, id } })
    setTimeout(() => dispatch({ type: "REMOVE_ALERT", payload: id }), timeout)
  }


  return (
    <AlertContext.Provider value={{
      alerts: state,
      setAlert
    }}>
      {props.children}
    </AlertContext.Provider>
  )
}