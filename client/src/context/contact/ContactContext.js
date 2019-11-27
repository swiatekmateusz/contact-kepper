import React, { createContext, useReducer } from 'react'
import contactReducer from './contactReducer'
import axios from 'axios'


export const ContactContext = createContext()

export const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  }

  const [state, dispatch] = useReducer(contactReducer, initialState)

  //Add Contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/contacts', contact, config)
      dispatch({ type: "ADD_CONTACT", payload: res.data })
    } catch (err) {
      dispatch({ type: "CONTACT_ERROR", payload: err.response.msg })
    }
  }
  // Delete Contact
  const deleteContact = async _id => {
    try {
      await axios.delete(`/api/contacts/${_id}`)
      dispatch({ type: "DELETE_CONTACT", payload: _id })
    } catch (err) {
      dispatch({ type: "CONTACT_ERROR", payload: err.response.msg })
    }

  }
  // Set current contact
  const setCurrent = contact => {
    dispatch({ type: "SET_CURRENT", payload: contact })
  }
  // Clear current
  const clearCurrent = contact => {
    dispatch({ type: "CLEAR_CURRENT" })
  }

  // Get contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts')
      dispatch({ type: "GET_CONTACTS", payload: res.data })
    } catch (err) {
      dispatch({ type: "CONTACT_ERROR", payload: err.response.msg })
    }
  }

  // Clear contacts
  const clearContacts = () => {
    dispatch({ type: "CLEAR_CONTACTS" })
  }
  // Update contact
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
      dispatch({ type: "UPDATE_CONTACT", payload: res.data })
    } catch (err) {
      dispatch({ type: "CONTACT_ERROR", payload: err.response.msg })
    }

  }
  // Filter contacts
  const filterContacts = text => {
    dispatch({ type: "FILTER_CONTACTS", payload: text })
  }

  // Clear filter
  const clearFilter = () => {
    dispatch({ type: "CLEAR_FILTER" })
  }


  return (
    <ContactContext.Provider value={{
      contacts: state.contacts,
      current: state.current,
      filtered: state.filtered,
      error: state.error,
      addContact,
      deleteContact,
      setCurrent,
      clearCurrent,
      updateContact,
      filterContacts,
      clearFilter,
      getContacts,
      clearContacts
    }}>
      {props.children}
    </ContactContext.Provider>
  )
}