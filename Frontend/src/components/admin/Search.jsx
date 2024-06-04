import React from 'react';
import { Cancel } from '../svg/svgIcons';
import "../../assets/style/search.css";

const Search = () => {
   return (
      <div className='search-container'>
         <div className='search-wrapper'>
            <input type="text" className='search' placeholder='Search user' />
            <div className='cancel-icon'>
               <Cancel />
            </div>
         </div>
      </div>
   );
}

export default Search;