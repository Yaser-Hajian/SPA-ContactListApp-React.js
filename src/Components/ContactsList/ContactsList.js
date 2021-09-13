import React from 'react';
import Contact from "../Contact/Contact";

const ContactsList = ({contactsList , onDelete}) => {
    return (
        <div>
            {
                contactsList.map(contact =>(
                    <Contact
                        name={contact.name}
                        email={contact.email}
                        key={contact.id}
                        onDelete={()=>onDelete(contact.id)} />
                ))
            }
        </div>
    );
};

export default ContactsList;
