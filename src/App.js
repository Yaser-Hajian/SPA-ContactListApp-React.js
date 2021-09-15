import './App.css';
import React, {useEffect, useState} from "react";
import AddContact from "./Components/AddContact/AddContact";
import ContactsList from "./Components/ContactsList/ContactsList";
import axios from "axios";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import EditContact from "./Components/EditContact/EditContact";

function App() {
    const [contactsList, setContactsList] = useState([]);
    useEffect(() => {
        // let responseContacts=[];
        // console.log("app")

        axios.get("http://localhost:3001/contacts")
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

        // const refresh = async ()=>{
        //     try {
        //         const {data} = await axios.get("http://localhost:3001/contacts");
        //         const newContactsList=[]
        //         data.map(contact => { newContactsList.unshift(contact)});
        //         setContactsList(newContactsList);
        //     }catch(error){
        //         console.log(error)
        //     }
        // }
        // refresh();
    }, []);
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
        console.log({id})
        const copy_contactsList = [...contactsList];
        // const index = contactsList.indexOf(con => con.id === parseInt(id) );
        let index;
        for (let i = 0; i < contactsList.length; i++) {
            if (contactsList[i].id === parseInt(id)){
                index=i;
            }
        }
        const copy_contact = {...contactsList[index]};
        console.log({index})
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
