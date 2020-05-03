import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ShopHeader from '../shop-header';
import ShopFooter from '../shop-footer';
import { HomePage, CartPage, CheckoutPage } from '../pages';

import './app.css';


const App = () => {
  return (
    <main role="main" className="container">
      <ShopHeader numItems={5} total={210}/>
      {/*<Switch>*/}
        <Route
          path="/"
          component={HomePage}
          exact />

        <Route
          path="/cart"
          component={CartPage}
          />

        <Route
          path="checkout"
          component={CheckoutPage}
      {/*</Switch>*/}
      <ShopFooter />
    </main>
  );
};


export default App;
