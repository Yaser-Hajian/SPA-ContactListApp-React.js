import React from 'react';
import style from './SearchBarStyle.module.css'
const SearchBar = ({setSearchValue}) => {
    const changeHandler=(event)=>{
        setSearchValue(event.target.value);
    }
    return (
        <div>
            <input type="text" placeholder={"Search Contact name"} onChange={changeHandler} className={style.input}/>
        </div>
    );
};

export default SearchBar;
