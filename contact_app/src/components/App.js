import AddContact from './addContact';
import ContactList from './contactList';
import Header from './header';
import "./App.css" ;
import React , {useState,useEffect} from 'react';
import {v4 as uuid} from "uuid" ;
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ContactDetail from './contactDetail';
import api from "../api/contacts" ;
import EditContact from './editContact';

function App() {
  const [contacts ,setContacts] = useState([]);
  //const strkey = 'contacts' ;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const classInstance = new AddContact();

  //retrieve contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data ;
  };

  const addContactHandler = async (contact) => {
    
    const res = contacts.some(x => x.email === contact.email || x.name===contact.name);

    if(!res){
      const request = {
        id :uuid(),
        ...contact,
      };
      const response = await api.post("/contacts", request);
      setContacts([...contacts, response.data]);
      classInstance.final();
    }
    else{
      alert("Contact Name or Email already exists !");
    }
  };

  const updateContactHandler = async (contact)=> {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const {id} = response.data ;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? {...response.data} : contact ;
    }));
  
  };
  
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id ;
    });
    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  useEffect(()=>{
    // const retriveContacts = localStorage.getItem(strkey);
    // if(retriveContacts) {setContacts(JSON.parse(retriveContacts));} 
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts) ;
    };
  
    getAllContacts() ;
  },[])

  useEffect(()=>{
    //localStorage.setItem(strkey,JSON.stringify(contacts));
  }, [contacts])

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
        <Route path='/add' element={<AddContact addContactHandler={addContactHandler} /> }/>
        <Route path='/' exact element={<ContactList contacts={searchTerm.length < 1 ? contacts : searchResults} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler} />}/>
        <Route path='/contact/:id' exact element={<ContactDetail/> } />
        <Route path='/edit/' element={<EditContact updateContactHandler={updateContactHandler} /> }/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
