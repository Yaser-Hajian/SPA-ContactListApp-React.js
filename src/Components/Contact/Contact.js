import React from 'react';
import style from './ContatcStyle.module.css'
const Contact = ({name, email, onDelete}) => {
    return (
        <div className={style.container}>
            <p>name: {name}</p>
            <p>email: {email}</p>
            <div className={style.options}>
                <button className={style.editBtn}>Edit</button>
                <button className={style.deleteBtn} onClick={()=>onDelete()}>Delete</button>
            </div>
        </div>
    );
};

export default Contact;
