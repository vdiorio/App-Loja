import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {ImCancelCircle, ImCart} from 'react-icons/im';

function Cart({cartProducts, setCartProducts, refresh}) {
  const [loading, setLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <div className={`cart ${cartOpen && 'open'}`} >
      <div className='fixed'>
        <a className="cart-icon" onClick={() => setCartOpen(!cartOpen)}>
          <ImCart size="2em" />
          {cartProducts.length !== 0 && <span className='cart-number'>{cartProducts.reduce((a, c) => a + c.cartQuantity, 0)}</span>}
        </a>
        <div className='cart-products'>
          <div className='cart-header'>
            <h1>Seu carrinho de compras</h1>
          </div>
          <table className='styled-table'>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {
                cartProducts.map(({id, name, price, quantity, cartQuantity}, i) => (
                  <tr key={`${name}${quantity}`}>
                    <td>{name}</td>
                    <td className='quantity-input'>
                      <input
                        className='cart-input'
                        type="number"
                        value={cartQuantity}
                        onChange={({target: {value}}) => {
                          const newCart = [...cartProducts];
                          if (newCart[i].cartQuantity === newCart[i].quantity) {
                            return alert(`Somente ${newCart[i].quantity} ${newCart[i].name} em estoque!`);
                          }
                          cartProducts[i].cartQuantity = value;
                          setCartProducts(newCart);
                        }}
                        min={1}
                        max={quantity}
                      />
                      <div onClick={() => setCartProducts(cartProducts.filter((p) => p.id !== id))}>
                        <ImCancelCircle color='red' />
                      </div>
                    </td>
                    <td>{price * cartQuantity}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <button
          disabled={!cartProducts.length && !loading}
          onClick={() => {
            setLoading(true);
            fetch('https://app-loja-backend.herokuapp.com/orders', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token'),
              },
              body: JSON.stringify(cartProducts.map((p) => ({
                productId: p.id,
                quantity: p.cartQuantity,
              }))),
            })
                .then((res) => res.json())
                .then((res) => {
                  if (res.id) {
                    alert('Sua compra foi realizado com sucesso!');
                    setCartProducts([]);
                    refresh();
                  }
                });
            setLoading(false);
          }}
        >
      Finalizar compra
        </button>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cartProducts: PropTypes.shape([]),
  refresh: PropTypes.func,
  setCartProducts: PropTypes.func,
};

export default Cart;
