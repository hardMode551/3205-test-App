import React from 'react';
import Form from './components/Form';
import Results from './components/Results';
import './App.css';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import Spinner from './components/Spinner';
const App: React.FC = () => {
  const { status } = useSelector((state: RootState) => state.search);
  return (
    <div>
      <Form />
      {status === 'loading' ? <Spinner /> : <Results />}
    </div>
  );
};

export default App;
