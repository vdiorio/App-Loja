import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import './ProductForm.css';

function ProductForm() {
  const id = (useLocation().search).split('?id=')[1];
  const [product, setProduct] = useState({
    name: '',
  });

  useEffect(() => {
    if (id) {
      fetch(`https://app-loja-backend.herokuapp.com/products/${id}`)
          .then((res) => res.json())
          .then((res) => {
            delete res.createdAt;
            delete res.updatedAt;
            delete res.id;
            setProduct(res);
          });
    }
  }, []);

  const handleChange = ({target}) => {
    const {id, value} = target;
    setProduct({
      ...product,
      [id]: value,
    });
  };

  return (
    <div className="container">
      <div className="screen-form">
        <div className="screen__content">
          <div className='product-form'>
            <label htmlFor='name'>
            Título:
              <input className="login__input" onChange={handleChange} id="name" type='text' placeHolder='Título do produto' value={product.name || ''}/>
            </label>
            <label htmlFor='imageURL'>
            Url da imagem:
              <input className="login__input" onChange={handleChange} id="imageURL" type='text' placeHolder='URL da imagem' value={product.imageURL || ''}/>
            </label>
            <label htmlFor='descrption'>
            Descrição:
              <textarea className="login__input" onChange={handleChange} id='description' type='text' placeHolder='Descrição' value={product.description || ''}/>
            </label>
            <label htmlFor='price'>
            Preço:
              <input className="login__input" onChange={handleChange} id="price" type='number' value={product.price || 0}/>
            </label>
            <label htmlFor='quantity'>
            Estoque:
              <input className="login__input" onChange={handleChange} id="quantity" type='number' value={product.quantity || 0}/>
            </label>
            <label htmlFor='category'>
            Categoria:
              <select id='category' onChange={handleChange} value={product.category || 'food'}>
                <option value='food'>Comida</option>
                <option value='utensils'>Utensílhos</option>
                <option value='animals'>Animais</option>
              </select>
            </label>
            <button className='button login__submit' onClick={() => {
              fetch(`https://app-loja-backend.herokuapp.com/products/${id || ''}`, {
                method: id ? 'PUT' : 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': localStorage.getItem('token'),
                },
                body: JSON.stringify(product),
              })
                  .then(({status}) => {
                    if (status === 204 || status === 201) {
                      alert(`Produto ${status === 204 ? 'atualizado' : 'criado'} com sucesso!`);
                      window.location.href = '/admin';
                    }
                  });
            }}>Salvar</button>
          </div>
          <div className="social-login">
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape shape1"></span>
        </div>
      </div>
    </div>
  );
}
export default ProductForm;
