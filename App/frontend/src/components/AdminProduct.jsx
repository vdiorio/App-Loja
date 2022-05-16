import React from 'react';
import PropTypes from 'prop-types';

function AdminProduct({product}) {
  const {id, name, description, imageURL, price, quantity} = product;
  return (
    <div className='card'>
      <img className='image' src={imageURL} alt={name} />
      <h2 className='title'>{name}</h2>
      <h6 className='description'>{description}</h6>
      <h3 className='price'>{price} Moedas</h3>
      <h3 className='quantity'>Estoque: {quantity}</h3>
      <button onClick={() => {
        window.location.href = `/product${id ? `?id=${id}` : ''}`;
      }}>Editar Produto</button>
    </div>
  );
}

AdminProduct.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.number,
    imageURL: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }),
};

export default AdminProduct;
