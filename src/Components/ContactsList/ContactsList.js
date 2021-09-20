import React from 'react';
import Contact from "../Contact/Contact";
import {Link} from "react-router-dom";
import style from './ContactsListStyle.module.css';
import SearchBar from "../SearchBar/SearchBar";
const ContactsList = ({contactsList , onDelete , setSearchValue}) => {
    return (
        <div>
            <Link to={"/add"}><button className={style.addNewBtn}>Add new contact</button></Link>
            <h2>Contacts</h2>
            <SearchBar setSearchValue={setSearchValue}/>
            {
                contactsList.length !== 0 ?
                contactsList.map(contact =>(
                    <Contact
                        name={contact.name}
                        email={contact.email}
                        key={contact.id}
                        onDelete={()=>onDelete(contact.id)}
                        id={contact.id}
                    />
                ))
                    :
                <p>You don't have any contacts</p>
            }
        </div>
    );
};

export default ContactsList;
