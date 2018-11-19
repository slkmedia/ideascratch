import React, { Component } from 'react';

// Component Imports
import Container from './components/Container';
import Header from './components/Header';
import Ideas from './components/Ideas';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Ideas />
        <Footer />
      </Container>
    );
  }
}

export default App;
