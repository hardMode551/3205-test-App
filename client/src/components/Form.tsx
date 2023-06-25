import React from 'react';
import { useSelector } from 'react-redux';
import InputMask from 'react-input-mask';

import { cancelSearch, searchAsync } from '../store/slices/asyncActions';
import { RootState, useAppDispatch } from '../store/store';
import { setEmail, setNumber } from '../store/slices/searchSlice';

import '../styles/Form.module.scss';

const Form: React.FC = () => {
  const dispatch = useAppDispatch();
  const { email, number, results } = useSelector((state: RootState) => state.search);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results !== undefined && results.length > 0 && email === results[0].email) {
      cancelSearch();
    } else {
      dispatch(searchAsync({ email, number }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Search App</h1>

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setEmail(e.target.value))}
        required
      />

      <label>Number:</label>
      <InputMask
        type="text"
        pattern="[0-9-]{0,8}"
        mask="99-99-99"
        value={number}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setNumber(e.target.value))}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
