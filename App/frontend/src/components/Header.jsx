import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import {ImCoinDollar, ImSearch, ImUser} from 'react-icons/im';
import Logo from './Logo.png';

function Header({logged, coins, admin}) {
  const adminLink = admin ? '/admin' : null;
  return (
    <header className="header">
      <a className='logo-container' href='/'>
        <img className="logo" src={Logo} alt="Logo da loja" />
        <h1>Logo</h1>
      </a>
      <div className='search-container'>
        <ImSearch className="icon" size="1.5em" />
        <input className='search-input' placeholder="O que você está procurando?" />
      </div>
      <a className='user-container' href={ logged ? adminLink : '/login' }>
        <ImUser size="1.5em" />
        <h3>{logged ? localStorage.getItem('name') : 'Login'}</h3>
      </a>
      <div className='coin-container'>
        <ImCoinDollar size="1.5em" />
        <h3>{coins}</h3>
      </div>
    </header>
  );
}

Header.propTypes = {
  coins: PropTypes.number,
  logged: PropTypes.bool,
  admin: PropTypes.bool,
  name: PropTypes.string,
};

export default Header;
