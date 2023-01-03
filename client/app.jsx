import React from 'react';
import Home from './pages/home';
import NavBar from './components/nav-bar';
export default class App extends React.Component {
  render() {
    return <div><NavBar /> <Home /></div>;
  }
}
