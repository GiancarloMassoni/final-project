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
      .then(restaurants => this.setState({ restaurants }))
      // eslint-disable-next-line no-console
      .catch(err => console.log('Fetch Get error:', err));

    fetch(`/api/meals/${userId}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(meals => this.setState({ meals }))
      // eslint-disable-next-line no-console
      .catch(err => console.log('Fetch Get error:', err));
  }

  removeRestaurant(restaurant) {
    const { userId } = this.context.user;

    fetch(`/api/profile/restaurants/${userId}`, {
      method: 'DELETE',
      body: JSON.stringify({ restaurant }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res)
      .then(data => {
        const newRestaurants = this.state.restaurants.filter(el => el.restaurantName !== restaurant);
        this.setState({ restaurants: newRestaurants });
      });
  }

  removeMeal(meal) {
    const { userId } = this.context.user;

    fetch(`/api/profile/meals/${userId}`, {
      method: 'DELETE',
      body: JSON.stringify({ meal }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res)
      .then(data => {
        const newRestaurants = this.state.restaurants.filter(el => el.restaurantName !== meal);
        this.setState({ restaurants: newRestaurants });
      });
  }

  renderRestaurants() {
    if (this.state.restaurants.length === 0) return <h1 className='underline padding'>Favorite Restaurants to view them here!</h1>;

    const res = this.state.restaurants.map((res, index) => {
      return <div key={index} className='padding res-border'>
        <div className='padding'>
          <h2 className='inline'>{res.restaurantName}</h2>
          <i className="fa-regular fa-circle-xmark  margin-left" onClick={event => this.removeRestaurant(res.restaurantName)} />
        </div>
        <a href={`#restaurants?restaurant=${res.restaurantName}`}>
          <button className='profile-btn'>Menu</button></a>
      </div>
      ;
    });

    return res;
  }

  renderMeals() {
    if (this.state.meals.length === 0) return <h1 className='underline padding'>Favorite Meals to view them here!</h1>;

    const meals = this.state.meals.map((res, index) => {
      return <div key={index} className='row padding res-border'>
        <div className="col-full">
          <h2 className='inline'>{res.restaurantName}</h2>
          <i className="fa-regular fa-circle-xmark  margin-left" onClick={event => this.removeMeal(res.mealName)} />
          <h3>{res.mealName}</h3>
        </div>
        <div className="col-half">
          <img src={res.img}/>
        </div>
        <div className="col-half">
          <p className='cal-table'>Serving Size {res.servingSize}</p>
          <p className='cal-table'>Calories {res.calories}</p>
          <p className='cal-table'>Protein {res.protein}</p>
          <p className='cal-table'>Fat {res.fat}</p>
          <p className='cal-table'>Carbohydrates {res.carbohydrates}</p>
        </div>
      </div>;
    });
    return meals;
  }

  render() {
    const meals = this.state.meals;
    const restaurants = this.state.restaurants;
    return (
      <>
        <div className='row'>
          <div className="col-full padding">
            <h1 className='text-center'>{this.context.user.username}</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-half text-center border'>
            {
              restaurants.length !== 0 &&
              <h1 className='underline padding'>Favorite Restaurants</h1>
            }
            {this.renderRestaurants()}
          </div>
          <div className='col-half text-center border'>
            {
              meals.length !== 0 &&
              <h1 className='underline padding'>Favorite Meals</h1>
            }
            {this.renderMeals()}
          </div>
        </div>
      </>
    );
  }
}

Profile.contextType = AppContext;
