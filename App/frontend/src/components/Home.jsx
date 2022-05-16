import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import ProductCard from './ProductCard';
import './Home.css';
import Cart from './Cart';

function Home({refresh, coins}) {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem('shoppingCart'))|| []);
  const [sort, setSort] = useState('');

  const addProductToCart = (product) => {
    const productIndex = cartProducts.findIndex((p) => p.id === product.id);
    if (productIndex === -1) {
      setCartProducts([...cartProducts, product]);
    } else {
      const newCart = [...cartProducts];
      if (newCart[productIndex].cartQuantity === newCart[productIndex].quantity) {
        return alert(`Somente ${product.quantity} ${product.name} em estoque!`);
      }
      newCart[productIndex].cartQuantity++;
      setCartProducts(newCart);
      localStorage.setItem('shoppingCart', JSON.stringify(newCart));
    }
  };

  useEffect(() => {
    fetch('https://app-loja-backend.herokuapp.com/products')
        .then((res) => res.json())
        .then((res) => setProducts(res));
  }, []);

  return (
    <div className='home'>
      <div className='side-bar'>
        <label className='sort-option' htmlFor="all">
          Todos
          <input id="all" value="" onChange={(({target: {value}}) => setSort(value))} type="radio" name="sort" />
        </label>
        <label className='sort-option' htmlFor="food">
          Comida
          <input id="food" value="food" onChange={(({target: {value}}) => setSort(value))} type="radio" name="sort" />
        </label>
        <label className='sort-option' htmlFor="utensils">
          Utensilhos
          <input id="utensils" value="utensils" onChange={(({target: {value}}) => setSort(value))} type="radio" name="sort" />
        </label>
        <label className='sort-option' htmlFor="animals">
          Animais
          <input id="animals" value="animals" onChange={(({target: {value}}) => setSort(value))} type="radio" name="sort" />
        </label>
      </div>
      <div className='product-container'>
        { products.length ?
        products.filter(({category}) => category.includes(sort))
            .map((product) => <ProductCard key={product.id} product={product} addProduct={addProductToCart} />) :
        <div>CARREGANDO</div> }
      </div>
      <Cart
        cartProducts={cartProducts}
        setCartProducts={setCartProducts}
        coins={coins}
        refresh={refresh}
      />
    </div>
  );
}

Home.propTypes = {
  coins: PropTypes.number,
  refresh: PropTypes.func,
};

export default Home;
