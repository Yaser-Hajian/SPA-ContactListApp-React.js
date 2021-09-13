import React from 'react';
import Contact from "../Contact/Contact";
import {Link} from "react-router-dom";
import style from './ContactsListStyle.module.css';
const ContactsList = ({contactsList , onDelete}) => {
    return (
        <div>
            <button className={style.addNewBtn}><Link to={"/add"}>Add new contact</Link></button>
            {
                contactsList.length !== 0 ?
                contactsList.map(contact =>(
                    <Contact
                        name={contact.name}
                        email={contact.email}
                        key={contact.id}
                        onDelete={()=>onDelete(contact.id)} />
                ))
                    :
                <p>You don't have any contacts</p>
            }
        </div>
    );
};

export default ContactsList;
