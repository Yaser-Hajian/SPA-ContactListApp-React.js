import './App.css';
import React, {useEffect, useState} from "react";
import AddContact from "./Components/AddContact/AddContact";
import ContactsList from "./Components/ContactsList/ContactsList";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import EditContact from "./Components/EditContact/EditContact";
import {http} from "./Services/HTTPService";
function App() {
    const [contactsList, setContactsList] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [searchedContactsList, setSearchedContactsList] = useState([]);
    const [isFetched , setIsFetched] = useState(false);
    useEffect(() => {
        http.get("/contacts")
            .then(response => {
                if (response) {
                    const newContactsList=[]
                    response.data.map(contact => {
                        newContactsList.unshift(contact)
                    });
                    setContactsList(newContactsList);
                    setIsFetched(true)
                    // console.log(contactsList,"useEffect")
                    searchHandler(searchValue , newContactsList);
                }
            })
            .catch(error => console.log(error));
    }, []);
    useEffect(() => {
        searchHandler(searchValue);
    },[searchValue , contactsList]);
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
    const searchHandler = (value , List=contactsList)=>{
        if (value === "" || value === null){
            setSearchedContactsList(List)
        }else{
            const newSearchedContactList = List.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase()));
            setSearchedContactsList(newSearchedContactList);
        }
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
                           render={(props) =>
                               <ContactsList
                               searchedContacts={searchedContactsList}
                               onDelete={deleteContactHandler}
                               setSearchValue={setSearchValue}
                               allContacts={contactsList}
                               searchValue={searchValue}
                               isFetched={isFetched}
                               {...props}/>}/>
                    <Route path={"/"} exact={true} render={(props) =>
                        <ContactsList
                                searchedContacts={searchedContactsList}
                                onDelete={deleteContactHandler}
                                setSearchValue={setSearchValue}
                                allContacts={contactsList}
                                searchValue={searchValue}
                                isFetched={isFetched}
                                {...props}/>}
                    />
                </Switch>
            </BrowserRouter>


        </div>
    );
}

export default App;
