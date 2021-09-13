import React, {useState} from 'react';
import style from './AddContactStyle.module.css'
const AddContact = (props) => {
    const [newContact , setNewContact] = useState({name:"",email:""})
    const changeHandler = (event)=>{
        setNewContact({...newContact , [event.target.name]:event.target.value});
    }
    const submitHandler=(event)=>{
        event.preventDefault();
        if (newContact.name === ""){
            alert("Please enter your contact's name");
        }else if (newContact.email === ""){
            alert("Please enter your contact's email");
        }else{
            console.log({newContact})
            props.addContactHandler(newContact);
            setNewContact({name: "", email: ""});
            props.history.push("/");
        }
    }
    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={submitHandler}>
                <div className={style.formControl}>
                    <label>name</label>
                    <input type="text"
                           placeholder={"Enter your name"}
                           name={"name"}
                           value={newContact.name}
                           onChange={changeHandler}
                    />
                </div>
                <div className={style.formControl}>
                    <label>email</label>
                    <input type="email"
                           placeholder={"Enter your email"}
                           name={"email"}
                           value={newContact.email}
                           onChange={changeHandler}
                    />
                </div>
                <div className={style.btnContainer}>
                    <button className={style.button}>Add</button>
                </div>

            </form>

        </div>
    );
};

export default AddContact;
