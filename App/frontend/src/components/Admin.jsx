import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import './Home.css';
import AdminProduct from './AdminProduct';
import UserCard from './UserCard';
import OrderCard from './OrderCard';

function Admin({refresh}) {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState('products');

  const addProductUrl = 'https://cdn.icon-icons.com/icons2/2507/PNG/512/add_insert_plus_icon_150688.png';

  useEffect(() => {
    fetch('https://app-loja-backend.herokuapp.com/products')
        .then((res) => res.json())
        .then((res) => setProducts(res));
    fetch('https://app-loja-backend.herokuapp.com/users', {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token'),
      },
    })
        .then((res) => res.json())
        .then((res) => setUsers(res));
    fetch('https://app-loja-backend.herokuapp.com/orders/admin', {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token'),
      },
    })
        .then((res) => res.json())
        .then((res) => setOrders(res));
  }, []);

  return (
    <div className='home'>
      <div className='side-bar'>
        <label className='sort-option' htmlFor="products">
          Produtos
          <input id="products" value="products" onChange={(({target: {value}}) => setSelected(value))} type="radio" name="sort" />
        </label>
        <label className='sort-option' htmlFor="users">
          Usuários
          <input id="users" value="users" onChange={(({target: {value}}) => setSelected(value))} type="radio" name="sort" />
        </label>
        <label className='sort-option' htmlFor="orders">
          Pedidos
          <input id="orders" value="orders" onChange={(({target: {value}}) => setSelected(value))} type="radio" name="sort" />
        </label>
      </div>
      <div className='product-container'>
        { selected === 'products' && products.map((product) => <AdminProduct key={product.id} product={product} />) }
        { selected === 'products' && <AdminProduct product={{
          name: 'Crie um novo produto',
          description: '',
          imageURL: addProductUrl,
          price: 9999,
        }}/> }
        { selected === 'users' && users.map((user) => <UserCard key={user.id} user={user} refresh={refresh} />) }
        { selected === 'orders' && orders.reverse().map((order) => <OrderCard key={order.id} order={order} users={users} />) }
      </div>
    </div>
  );
}

Admin.propTypes = {
  refresh: PropTypes.func,
};

export default Admin;
