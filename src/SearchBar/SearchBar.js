import React from 'react';

const SearchBar = ({setSearchValue}) => {
    const changeHandler=(event)=>{
        setSearchValue(event.target.value);
    }
    return (
        <div>
            <input type="text" placeholder={"Search Contact name"} onChange={changeHandler}/>
        </div>
    );
};

export default SearchBar;
