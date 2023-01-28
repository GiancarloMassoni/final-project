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

  renderRestaurants() {
    if (this.state.restaurants.length === 0) return <h2>Favorite Restaurants to view them here!</h2>;
    const res = this.state.restaurants.map((res, index) => {
      return <div key={index}>
        <h2>{res.restaurantName}</h2>
        <a href={`#restaurants?restaurant=${res.restaurantName}`}>Menu</a>
      </div>
      ;
    });

    return res;
  }

  renderMeals() {
    if (this.state.meals.length === 0) return <h2>Favorite Meals to view them here!</h2>;

  }

  render() {
    return (
      <>
        <div className='row'>
          <div className="col-full">
            <h1 className='text-center'>{this.context.user.username}</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-half text-center'>
            {this.renderRestaurants()}
          </div>
          <div className='col-half text-center'>
            {this.renderMeals()}
          </div>
        </div>
      </>
    );
  }
}

Profile.contextType = AppContext;
