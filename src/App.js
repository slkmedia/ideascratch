import React, { Component } from 'react';
import { Router } from '@reach/router';

import Container from './components/Container';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/home';
import CallbackPage from './pages/callback';

class App extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Router>
          <HomePage path="/" />
          <CallbackPage path="/callback" />
        </Router>
        <Footer />
      </Container>
    );
  }
}

export default App;
