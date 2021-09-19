import './App.css';
import React, {useEffect, useState} from "react";
import AddContact from "./Components/AddContact/AddContact";
import ContactsList from "./Components/ContactsList/ContactsList";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import EditContact from "./Components/EditContact/EditContact";
import {http} from "./Services/HTTPService";
import SearchBar from "./SearchBar/SearchBar";
function App() {
    const [contactsList, setContactsList] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [searchedContacts, setSelectedContacts] = useState([])
    useEffect(() => {
        http.get("/contacts")
            .then(response => {
                if (response) {
                    const newContactsList=[]
                    response.data.map(contact => {
                        newContactsList.unshift(contact)
                    });
                    setContactsList(newContactsList);
                }
            })
            .catch(error => console.log(error));
    }, []);
    useEffect(() => {},[searchValue])
    const addContactHandler = (contact) => {
        const newContactsList = [...contactsList];
        const date = new Date();
        const newContact = {id: date.getTime(), ...contact};
        newContactsList.unshift(newContact);
        setContactsList(newContactsList)
        http.post("/contacts", newContact)
            .then()
            .catch(error => console.log(error));

    }
    const deleteContactHandler = (id) => {
        const newContactList = contactsList.filter(contact => contact.id !== id);
        setContactsList(newContactList);
        http.delete("/contacts/" + id)
            .then()
            .catch(error => console.log(error));
    }
    const editContactHandler = (id, updatedContact) => {
        // console.log({id})
        const copy_contactsList = [...contactsList];
        const index = contactsList.findIndex(con => con.id === parseInt(id) );
        const copy_contact = {...contactsList[index]};
        copy_contact.name = updatedContact.name;
        copy_contact.email = updatedContact.email;
        copy_contactsList[index] = copy_contact;
        setContactsList(copy_contactsList);
        http.put("/contacts/" + id,updatedContact)
            .then()
            .catch(error => console.log(error));
    }
    return (
        <div className="App">
            <h1>ContactList App</h1>
            <SearchBar setSearchValue={setSearchValue}/>
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
