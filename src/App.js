import './App.css';
import React, {useEffect, useState} from "react";
import AddContact from "./Components/AddContact/AddContact";
import ContactsList from "./Components/ContactsList/ContactsList";
import axios from "axios";
import {BrowserRouter, Link} from "react-router-dom";
import {Route, Switch} from "react-router";
import EditContact from "./Components/EditContact/EditContact";

function App() {
    const [contactsList, setContactsList] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/contacts")
            .then(response => {
                const newContactsList = [];
                if (response) {
                    response.data.map(contact => {
                        newContactsList.unshift(contact)
                    });
                    setContactsList(newContactsList);
                }
            })
            .catch(error => console.error(error));
    }, [contactsList]);
    const addContactHandler = (contact) => {
        const newContactsList = [...contactsList];
        const date = new Date();
        const newContact = {id: date.getTime(), ...contact};
        newContactsList.unshift(newContact);
        setContactsList(newContactsList)
        axios.post("http://localhost:3001/contacts", newContact)
            .then()
            .catch(error => console.log(error));

    }
    const deleteContactHandler = (id) => {
        const newContactList = contactsList.filter(contact => contact.id !== id);
        setContactsList(newContactList);
        axios.delete("http://localhost:3001/contacts/" + id)
            .then()
            .catch(error => console.log(error));
    }
    const editContactHandler = (id, updatedContact) => {
        const copy_contactsList = [...contactsList];
        const index = copy_contactsList.indexOf(contact => contact.id === id);
        const copy_contact = {...contactsList[index]};
        copy_contact.name = updatedContact.name;
        copy_contact.email = updatedContact.email;
        copy_contactsList[index] = copy_contact;
        setContactsList(copy_contactsList);
        axios.put("http://localhost:3001/contacts/" + id,updatedContact)
            .then()
            .catch(error => console.log(error));
    }
    return (
        <div className="App">
            <h1>ContactList App</h1>
            <BrowserRouter>
                <Switch>
                    <Route path={"/add"}
                           render={(props) => <AddContact addContactHandler={addContactHandler} {...props}/>}/>
                    <Route path={"/contacts/:id"} render={(props) => <EditContact editContactHandler={editContactHandler} {...props}/>}/>
                    <Route path={"/contacts"}
                           render={(props) => <ContactsList
                               contactsList={contactsList}
                               onDelete={deleteContactHandler}
                               {...props}/>}/>
                    <Route path={"/"} exact={true} render={(props) => <ContactsList
                                contactsList={contactsList}
                                onDelete={deleteContactHandler}
                                {...props}/>}/>
                </Switch>
            </BrowserRouter>


        </div>
    );
}

export default App;
