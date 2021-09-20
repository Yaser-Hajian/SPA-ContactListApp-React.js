import React from 'react';
import style from './ContatcStyle.module.css'
import user from '../../Assets/Images/user.png'
import {Link} from "react-router-dom";
const Contact = ({name, email, onDelete , id}) => {
    return (
        <div className={style.container}>
            <div className={style.nameContainer}>
                <img src={user} alt="user-icon"/>
                <p className={style.name}><span>name:</span> <span className={style.nameValue}>{name}</span></p>
            </div>
            <p className={style.email}><span>email:</span> <span className={style.emailValue}>{email}</span></p>
            <div className={style.options}>
                <Link to={"/contacts/"+id}><button className={style.editBtn}>Edit</button></Link>
                <button className={style.deleteBtn} onClick={()=>onDelete()}>Delete</button>
            </div>
        </div>
    );
};

export default Contact;
