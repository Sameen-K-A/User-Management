import React, { useState } from 'react';
import { Cancel } from '../svg/svgIcons';
import { searchUser } from '../../redux/admin/adminSlice';
import { useDispatch } from "react-redux"
import "../../assets/style/search.css";

const Search = () => {
   const [searchValue, setSearchValue] = useState("");
   const dispatch = useDispatch();

   const handleSearch = (event) => {
      setSearchValue(event.target.value);
      dispatch(searchUser(event.target.value.trim()));
   }

   const clearSearch = () => {
      setSearchValue("");
      dispatch(searchUser(""));
   }

   return (
      <div className='search-container'>
         <div className='search-wrapper'>
            <input type="text" className='search' value={searchValue} onChange={(e) => handleSearch(e)} placeholder='Search user' />
            {searchValue.length != 0 && (
               <div className='cancel-icon' onClick={clearSearch}>
                  <Cancel />
               </div>
            )}
         </div>
      </div>
   );
}

export default Search;