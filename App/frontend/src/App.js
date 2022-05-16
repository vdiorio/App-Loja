import React, {useEffect} from 'react';
import {useState} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import ProductForm from './components/ProductForm';
import Home from './components/Home';
import Admin from './components/Admin';

function App() {
  const [logged, setLogged] = useState(typeof localStorage.getItem('token') === 'string');
  const [coins, setCoins] = useState(0);
  const [name, setName] = useState('');
  const [isAdmin, setAdmin] = useState(false);
  const [value, refreshCoins] = useState(false);

  useEffect(() => {
    const authorization = localStorage.getItem('token');
    if (authorization) {
      fetch('https://app-loja-backend.herokuapp.com/users/info', {
        method: 'GET',
        headers: {'authorization': authorization},
      })
          .then((res) => res.json())
          .then((res) => {
            console.log(res.role === 'admin');
            if (res.name) {
              setLogged(true);
              setName(res.name);
              setCoins(res.coins);
              setAdmin(res.role === 'admin');
            }
          });
    }
  }, [value]);

  const refreshHeader = () => {
    refreshCoins(!value);
  };

  return (
    <BrowserRouter>
      <Header logged={logged} coins={coins} name={name} admin={isAdmin} />
      <Route exact path="/">
        <Home refresh={refreshHeader} />
      </Route>
      <Route exact path="/admin">
        { isAdmin ? <Admin admin={isAdmin} refresh={refreshHeader} /> : <div>NOT FOUND</div> }
      </Route>
      <Route exact path="/login" >
        <Login setLogged={setLogged} logged={logged} />
      </Route>
      <Route path="/product" component={ProductForm}/>
      <Footer setLogged={setLogged} logged={logged} />
    </BrowserRouter>
  );
}

export default App;
