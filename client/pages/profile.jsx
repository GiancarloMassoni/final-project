import React from 'react';
import AppContext from '../lib/app-context';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      meals: []
    };
  }

  componentDidMount() {
    const { userId } = this.context.user;
    fetch(`/api/restaurants/${userId}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(restaurants => {
        this.setState({ restaurants });
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log('Fetch Get error:', err));
  }

  renderPage() {
    if (this.state.restaurants === null) {
      return <p>Favorite Restaurants to view them here!</p>;
    }
    const res = this.state.restaurants.map((res, index) => <p key={index}>{res.restaurantName}</p>);
    return res;
  }

  render() {
    return (
      this.renderPage()
    );
  }
}

Profile.contextType = AppContext;
