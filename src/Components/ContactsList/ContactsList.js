import React from 'react';
import Contact from "../Contact/Contact";
import {Link} from "react-router-dom";
import style from './ContactsListStyle.module.css';
import SearchBar from "../SearchBar/SearchBar";
const ContactsList = ({searchedContacts , onDelete , setSearchValue , allContacts , searchValue , isFetched}) => {
    return (
        <div>
            <Link to={"/add"}><button className={style.addNewBtn}>Add new contact</button></Link>
            <h2>Contacts</h2>
            <SearchBar setSearchValue={setSearchValue}/>
            {
                searchedContacts.length !== 0 ?
                searchedContacts.map(contact =>(
                    <Contact
                        name={contact.name}
                        email={contact.email}
                        key={contact.id}
                        onDelete={()=>onDelete(contact.id)}
                        id={contact.id}
                    />
                ))
                    :
                    allContacts.length !== 0 ?
                        ( searchValue === ""?<p className={style.info}>Loading contacts ...</p>:<p className={style.info}>no contact matched</p>)
                        :
                        isFetched?<p className={style.info}>You don't have any contacts</p>:<p className={style.info}>Loading contacts ...</p>

            }
        </div>
    );
};

export default ContactsList;
