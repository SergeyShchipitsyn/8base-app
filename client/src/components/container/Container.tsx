import React from 'react';

import styles from './Container.module.css'

const Container: React.FC = ({ children }) => (
  <main className={styles.wrapper}>
    {children}
  </main>
);

export { Container };
