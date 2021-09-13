import React, {useEffect, useState} from 'react';
import axios from "axios";
import style from "./EditContact.module.css";

const EditContact = (props) => {
    const [contact , setContact] = useState({name:"" , email:""});
    const id = props.match.params.id;
    useEffect(()=>{
        axios.get("http://localhost:3001/contacts/"+id)
            .then(response => setContact(response.data))
            .catch(error =>console.log(error))
    },[]);
    const changeHandler = (event)=>{
        setContact({...contact , [event.target.name]:event.target.value});
    }
    const updateHandler=()=>{
        if (contact.name === ""){
            alert("Please enter your contact's name");
        }else if (contact.email === ""){
            alert("Please enter your contact's email");
        }else{
            props.editContactHandler(id , contact);
            props.history.push("/");
        }
    }
    const editContact = ()=>{
        console.log(contact)
        return (
            <div className={style.container}>
                <div className={style.inputContainer}>
                    <label>name</label>
                    <input type="text"
                           placeholder={"Enter your name"}
                           name={"name"}
                           value={contact.name}
                            onChange={changeHandler}
                    />
                </div>
                <div className={style.inputContainer}>
                    <label>email</label>
                    <input type="email"
                           placeholder={"Enter your email"}
                           name={"email"}
                           value={contact.email}
                           onChange={changeHandler}
                    />
                </div>
                <div >
                    <button onClick={updateHandler}>Update</button>
                </div>
            </div>
        )
    }
    return (
        <div>
            <h2>Edit Contact</h2>
            {
              contact.name==="" ?
                  <p>Loading Contact...</p>
                  :
                  editContact()
            }

        </div>
    );
};

export default EditContact;
