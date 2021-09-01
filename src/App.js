
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavBar from './utility/navBar/NavBar';
import Home from './pages/home/Home';
import SingleVenue from './pages/singleVenue/SingleVenue';
import Modal from './utility/modal/Modal';
import SingleCityVenues from './pages/singleCity/SingleCityVenues';
import PaymentSuccess from './pages/paymentSuccess/PaymentSuccess';
import Account from './pages/account/Account';
import Search from './pages/search/Search';
import Footer from './utility/footer/Footer';


class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={NavBar} />
        <Route exact path="/" component={Home} />
        <Route exact path="/venue/:vid" component={SingleVenue}/>
        <Route path='/' component={Modal} />
        <Route exact path='/city/:cityName' component={SingleCityVenues} />
        <Route exact path='/payment-success/:stripeToken' component={PaymentSuccess} />
        <Route path='/account' component={Account} />
        <Route path='/search/:searchTerm' component={Search} />
        <Route path="/" component={Footer} />
      </Router>
    )

  }
}

export default App;
