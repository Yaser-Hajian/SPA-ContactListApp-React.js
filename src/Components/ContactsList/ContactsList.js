import React from 'react';
import Contact from "../Contact/Contact";

const ContactsList = ({contactsList}) => {
    return (
        <div>
            {
                contactsList.map(contact =>(
                    <Contact name={contact.name} email={contact.email} key={contact.id}/>
                ))
            }
        </div>
    );
};

export default ContactsList;
