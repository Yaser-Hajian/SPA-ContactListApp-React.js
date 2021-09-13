import React from 'react';
import style from './ContatcStyle.module.css'
const Contact = ({name, email}) => {
    return (
        <div className={style.container}>
            <p>name: {name}</p>
            <p>email: {email}</p>
        </div>
    );
};

export default Contact;
