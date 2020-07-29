import React from 'react';
import { Link } from 'react-router-dom';

import { AppRoutes } from '../../constants/appRoutes';

import styles from './Container.module.css';


const Container: React.FC = ({ children }) => (
  <div className="d-flex h-100 m-h-100-vh">
    <nav className={styles.nav}>
      <Link to={AppRoutes.Products} className={styles.link}>
        Products
      </Link>
      <Link to={AppRoutes.Clients} className={styles.link}>
        Clients
      </Link>
      <Link to={AppRoutes.Orders} className={styles.link}>
        Orders
      </Link>
    </nav>
    <main className={styles.wrapper}>
      {children}
    </main>
  </div>
);

export { Container };
