import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchUser } from '../../redux/admin/adminSlice';
import { Cancel } from '../svg/svgIcons';
import "../../assets/style/search.css";

const Search = () => {
   const [searchText, setSearchText] = useState("")
   const dispatch = useDispatch();

   const handleSearch = (event) => {
      setSearchText(event.target.value)
      dispatch(searchUser(event.target.value));
   }

   const handleClearSearch = () => {
      setSearchText("");
      dispatch(searchUser(""))
   }

   return (
      <div className='search-container'>
         <div className='search-wrapper'>
            <input type="text" className='search' placeholder='Search user' value={searchText} onChange={(e) => handleSearch(e)} />
            {searchText.length ? (
               <div className='cancel-icon' onClick={handleClearSearch}>
                  <Cancel />
               </div>
            ) : ("")}
         </div>
      </div>
   );
}

export default Search;