import React from 'react';
import AppContext from '../lib/app-context';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restuarants: null,
      meals: []
    };
  }

  componentDidMount() {
    const { userId } = this.context.user;
    // console.log(userId);
    fetch(`/api/restaurants/${userId}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => this.setState({ restuarants: data }))
      // eslint-disable-next-line no-console
      .catch(err => console.log('Fetch Get error:', err));
    // console.log('heelo', this.state.restuarants);
  }

  render() {

    return (
      <p>{this.state.restuarants}</p>
    );
  }
}

Profile.contextType = AppContext;
