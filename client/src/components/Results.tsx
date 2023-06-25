import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store/store';

import styles from '../styles/Results.module.scss';

const Results: React.FC = () => {
  const { results } = useSelector((state: RootState) => state.search);

  const formatNumber = (number: string) => {
    return number.replace(/(\d{2})(\d{2})(\d{2})/, '$1-$2-$3');
  };

  return (
    <div className={styles.root}>
      {results.length > 0 ? (
        <div className={styles.list}>
          {results.map((user, index) => (
            <ul key={index}>
              <li>Email: {user.email}</li>
              <li>Number: {formatNumber(user.number)}</li>
            </ul>
          ))}
        </div>
      ) : (
        <p>No results</p>
      )}
    </div>
  );
};

export default Results;
