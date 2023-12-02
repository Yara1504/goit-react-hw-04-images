import React, { useState } from 'react';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

 const onChangeInput = event => {
    setSearch(event.currentTarget.value);
  };

 const onSubmitForm = event => {
    event.preventDefault();
    onSubmit(search);
  };

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={onSubmitForm}>
          <button className={css.SearchFormButton} type="submit">
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={search}
            onChange={onChangeInput}
          />
        </form>
      </header>
    );
  }

export default Searchbar;