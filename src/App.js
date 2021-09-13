import './App.css';
import React, {useEffect, useState} from "react";
import AddContact from "./Components/AddContact/AddContact";
import ContactsList from "./Components/ContactsList/ContactsList";
import axios from "axios";
import {BrowserRouter, Link} from "react-router-dom";
import {Route, Switch} from "react-router";

function App() {
    const [contactsList, setContactsList] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3001/contacts")
            .then(response => {
                const newContactsList = [];
                if (response){
                    response.data.map(contact => {newContactsList.unshift(contact)});
                    setContactsList(newContactsList);
                }
            })
            .catch(error => console.error(error));
    },[]);
    const addContactHandler = (contact) => {
        const newContactsList = [...contactsList];
        const date = new Date();
        const newContact = {id:date.getTime() , ...contact};
        newContactsList.unshift(newContact);
        setContactsList(newContactsList)
        axios.post("http://localhost:3001/contacts" , newContact)
            .then()
            .catch(error => console.log(error));

    }
    const deleteContactHandler = (id) => {
        const newContactList = contactsList.filter(contact => contact.id !== id);
        setContactsList(newContactList);
        axios.delete("http://localhost:3001/contacts/"+id)
            .then()
            .catch(error => console.log(error));
    }
    return (
        <div className="App">
            <h1>ContactList App</h1>
            <BrowserRouter>
                <Switch>
                    <Route path={"/add"} render={(props)=><AddContact addContactHandler={addContactHandler} {...props}/>}/>
                    <Route path={"/"} exact={true} render={(props)=><ContactsList contactsList={contactsList} onDelete={deleteContactHandler} {...props}/>} />
                </Switch>
            </BrowserRouter>


        </div>
    );
}

export default App;
