import './App.css';
import React, {useState} from "react";
import AddContact from "./Components/AddContact/AddContact";
import ContactsList from "./Components/ContactsList/ContactsList";

function App() {
    const [contactsList, setContactsList] = useState([]);
    const addContactHandler = (contact) => {
        const newContactsList = [...contactsList];
        const date = new Date();
        const newContact = {id:date.getTime() , ...contact};
        newContactsList.unshift(newContact);
        setContactsList(newContactsList);
    }
    return (
        <div className="App">
            <h1>ContactList App</h1>
            <AddContact addContactHandler={addContactHandler}/>
            <ContactsList contactsList={contactsList} />
        </div>
    );
}

export default App;
