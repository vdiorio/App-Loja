import React from 'react';
import PropTypes from 'prop-types';

function OrderCard({order, users}) {
  const {id, userId, products} = order;
  return (
    <div className='order-card'>
      <h2 className='title'>Numero do pedido: {id}</h2>
      <h3 className='description'>Usuário: {users.find((user) => user.id === userId).name}</h3>
      <table className='styled-table'>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(({name, quantity}) => (
              <tr key={`${name}${quantity}`}>
                <td>{name}</td>
                <td>{quantity}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    coins: PropTypes.number,
    email: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    products: PropTypes.any,
    role: PropTypes.string,
    userId: PropTypes.any,
  }),
  users: PropTypes.any,
};

export default OrderCard;
