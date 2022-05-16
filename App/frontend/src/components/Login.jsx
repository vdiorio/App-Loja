import PropTypes from 'prop-types';
import {useState} from 'react';
import './Login.css';
import React from 'react';

function Login({logged, setLogged}) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const loginRequest = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
  };

  if (logged) window.location.href = '/';

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login">
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input onChange={(e) => {
                const {value} = e.target;
                setLogin(value);
              }} type="text" className="login__input" placeholder="User name / Email" />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input onChange={(e) => {
                const {value} = e.target;
                setPassword(value);
              }} type="password" className="login__input" placeholder="Password" />
            </div>
            <button className="button login__submit" disabled={loading} onClick={(e) => {
              e.preventDefault();
              setLoading(true);
              const body = JSON.stringify({email: login, password});
              const request = {
                ...loginRequest,
                body,
              };
              try {
                fetch('https://app-loja-backend.herokuapp.com/login', request)
                    .then((res) => res.json())
                    .then((res) => {
                      setLoading(false);
                      if (res.token) {
                        localStorage.setItem('token', res.token);
                        localStorage.setItem('name', res.name);
                        setLogged(true);
                        window.location.href = '/';
                      }
                    });
              } catch (e) {
                console.log(e);
              }
            }}>
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <div className="social-login">
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  logged: PropTypes.bool,
  setLogged: PropTypes.func,
};

export default Login;
