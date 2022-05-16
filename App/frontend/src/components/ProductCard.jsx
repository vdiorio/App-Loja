import React from 'react';
import PropTypes from 'prop-types';

function ProductCard({product, addProduct}) {
  const {id, name, description, imageURL, price, quantity} = product;
  return (
    <div className='card'>
      <img className='image' src={imageURL} alt={name} />
      <h2 className='title'>{name}</h2>
      <h6 className='description'>{description}</h6>
      <h3 className='price'>{price} Moedas</h3>
      <h6 className='quantity'>Estoque: {quantity}</h6>
      <button onClick={() => addProduct({id, name, quantity, cartQuantity: 1, price})}>Add to cart</button>
    </div>
  );
}

ProductCard.propTypes = {
  addProduct: PropTypes.any,
  product: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.number,
    imageURL: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }),
};

export default ProductCard;
