"use client";

import { Provider } from 'react-redux';
import { store } from '../store';
import Navbar from './Navbar';

const ClientProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <Navbar />
      {children}
    </Provider>
  );
};

export default ClientProvider;
