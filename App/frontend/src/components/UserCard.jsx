import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

function UserCard({user, refresh}) {
  const {id, name, email, coins, role} = user;
  const [value, setValue] = useState(coins);
  const [loading, setLoading] = useState(false);

  const updateUserCoins = async () => {
    setLoading(true);
    const response = await fetch(`https://app-loja-backend.herokuapp.com/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token'),
      },
      body: `{ "coins": "${value}" }`,
    })
        .then((res) => res.json());
    setLoading(false);
    if (response.message === 'Coins updated') {
      alert('Moedas atualizadas com sucesso');
      refresh();
    } else {
      alert('Algo deu errado, tente novamente mais tarde');
    }
  };

  return (
    <div className='user-card'>
      <h2 className='title'>{name}</h2>
      <h2 className='title'>ID: {id}</h2>
      <h6 className='description'>{email}</h6>
      <h3 className='price'>
        <input className='price-input' type="number" value={value} onChange={(e) => setValue(e.target.value)} />
         Moedas
      </h3>
      <h3 className='role'>Role: {role}</h3>
      {loading ? (
        <div className='loading'>
          <ReactLoading color="white" height={'40px'} />
        </div>
      ) :
      <button onClick={updateUserCoins} disabled={loading}>Salvar</button>}
    </div>
  );
}

UserCard.propTypes = {
  refresh: PropTypes.func,
  user: PropTypes.shape({
    coins: PropTypes.number,
    email: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    role: PropTypes.string,
  }),
};

export default UserCard;
