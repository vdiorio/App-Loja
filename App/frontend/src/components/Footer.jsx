import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

function Footer({logged, setLogged}) {
  return (
    <footer className="footer">
      <span>Feito com muito amor, pressa e café por Vitor Martins Diorio</span>
      {logged && <div>
        <button onClick={() => {
          localStorage.clear();
          setLogged(false);
          window.location.href = '/';
        }}>Log Out</button>
      </div>}
    </footer>
  );
}

Footer.propTypes = {
  logged: PropTypes.bool,
  setLogged: PropTypes.func,
};

export default Footer;
