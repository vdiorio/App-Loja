import './Header.css';
import { ImSearch, ImUser } from 'react-icons/im';
import Logo from './Logo.png';

function Header() {
  return (
    <div className="Header">
      <div className='Logo-container'>
        <img className="Logo" src={Logo} alt="Logo da loja" />
        <h1>Logo</h1>
      </div>
      <div className='Search-container'>
        <ImSearch className="Icon" size="1.5em" />
        <input placeholder="O que você está procurando?" />
      </div>
      <div className='User-container'>
        <ImUser size="1.5em" />
        <h3>Login</h3>
      </div>
      <div />
    </div>
  );
}

export default Header;
