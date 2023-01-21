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
      menuId: '',
      user: null,
      isAuthorizing: true
    };
    this.updateMenu = this.updateMenu.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    } else if (route.path === 'restaurants') {
      const menuId = route.params.get('restaurant');
      return <MenuPage menuId={menuId}/>;
    }
  }

  updateMenu(id) {
    this.setState({ route: 'menu', menuId: id });
  }

  render() {
    // if (this.state.isAuthorizing) return null;
    const { route, menuId, user } = this.state;
    const updateMenuId = this.updateMenu;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = {
      route,
      menuId,
      updateMenuId,
      user,
      handleSignIn,
      handleSignOut
    };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <NavBar />
          {this.renderPage()}
        </>
      </AppContext.Provider>
    );
  }
}
