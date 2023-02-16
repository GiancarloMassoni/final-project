import React from 'react';
import Home from './pages/home';
import NavBar from './components/nav-bar';
import parseRoute from './lib/parse-route';
import AppContext from './lib/app-context';
import MenuPage from './components/menu-page';
import jwtDecode from 'jwt-decode';
import AuthPage from './pages/auth';
import Profile from './pages/profile';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      menuId: '',
      user: null,
      isAuthorizing: true,
      signingOut: false
    };
    this.updateMenu = this.updateMenu.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSignOutConfirm = this.handleSignOutConfirm.bind(this);
  }

  componentDidMount() {
    addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    this.setState({ signingOut: true });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    } else if (route.path === 'restaurants') {
      const menuId = route.params.get('restaurant');
      return <MenuPage menuId={menuId}/>;
    } else if (route.path === 'sign-in' || route.path === 'sign-up') {
      return <AuthPage />;
    } else if (route.path === 'profile') {
      return <Profile />;
    }
  }

  handleCancelClick() {
    this.setState({ signingOut: false });
  }

  handleSignOutConfirm() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null, signingOut: false });
  }

  openModal() {
    return (
      <div>
        <div className='overlay' />
        <div className='modal'>
          <div className='row'>
            <div className='col-full'>
              <h2 className='text-center modal-text'>Are you sure you want to sign out?</h2>
            </div>
          </div>
          <div className="row justify-center align-center">
            <div className="col-full">
              <div className="row">
                <div className="col-modal text-center">
                  <button className="no-button" onClick={this.handleCancelClick}>Cancel</button>
                </div>
                <div className="col-modal text-center">
                  <a href='' onClick={this.handleSignOutConfirm}><button className="yes-button">Confirm</button></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  updateMenu(id) {
    this.setState({ route: 'menu', menuId: id });
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { route, menuId, user, signingOut } = this.state;
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
    if (signingOut === true) {
      return (
        <AppContext.Provider value={contextValue}>
          <>
            <NavBar />
            {this.renderPage()}
            {this.openModal()}
          </>
        </AppContext.Provider>
      );
    } else {
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
}
