import React from 'react';
import Home from './pages/home';
import NavBar from './components/nav-bar';
import parseRoute from './lib/parse-route';
import AppContext from './lib/app-context';
import MenuPage from './components/menu-page';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      menuId: ''
    };
    this.updateMenu = this.updateMenu.bind(this);
  }

  componentDidMount() {
    addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    } else {
      return <MenuPage />;
    }
  }

  updateMenu(id) {
    this.setState({ route: 'menu', menuId: id });
  }

  render() {
    const { route, menuId } = this.state;
    const updateMenuId = this.updateMenu;
    const contextValue = {
      route,
      menuId,
      updateMenuId
    };
    // console.log('app', contextValue);
    return (
      <AppContext.Provider value={contextValue}>
        <div>
          <NavBar />
          {this.renderPage()}
        </div>
      </AppContext.Provider>
    );
  }
}
