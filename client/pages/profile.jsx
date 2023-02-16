import React from 'react';
import AppContext from '../lib/app-context';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.createModal = this.createModal.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.removeRestaurant = this.removeRestaurant.bind(this);
    this.state = {
      restaurants: [],
      meals: [],
      isDeleting: false,
      itemDeleting: ''
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

  handleCancelClick() {
    this.setState({ isDeleting: false, itemDeleting: '' });
  }

  handleXClick(item) {
    this.setState({ isDeleting: true, itemDeleting: item });
  }

  createModal() {
    const item = this.state.itemDeleting;

    if (typeof item !== 'string') {
      return (
        <div>
          <div className='overlay' />
          <div className='modal'>
            <div className='row'>
              <div className='col-full'>
                <h2 className='text-center modal-text'>Are you sure you want to remove {item.mealName}?</h2>
              </div>
            </div>
            <div className="row justify-center align-center">
              <div className="col-full">
                <div className="row">
                  <div className="col-modal text-center">
                    <button className="no-button" onClick={this.handleCancelClick}>Cancel</button>
                  </div>
                  <div className="col-modal text-center">
                    <button className="yes-button" onClick={event => this.removeMeal(item)}>Confirm</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className='overlay'/>
        <div className='modal'>
          <div className='row'>
            <div className='col-full'>
              <h2 className='text-center modal-text'>Are you sure you want to remove {item}?</h2>
            </div>
          </div>
          <div className="row justify-center align-center">
            <div className="col-full">
              <div className="row">
                <div className="col-modal text-center">
                  <button className="no-button" onClick={this.handleCancelClick}>Cancel</button>
                </div>
                <div className="col-modal text-center">
                  <button className="yes-button" onClick={this.removeRestaurant}>Confirm</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  removeRestaurant() {
    this.setState({ isDeleting: false });
    const { userId } = this.context.user;
    const restaurant = this.state.itemDeleting;
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
    const { mealId } = meal;
    const { mealName } = meal;
    this.setState({ isDeleting: false });
    fetch(`/api/profile/meals/${mealId}`, {
      method: 'DELETE'
    })
      .then(res => res)
      .then(data => {
        const newMeals = this.state.meals.filter(el => el.mealName !== mealName);
        this.setState({ meals: newMeals });
      });
  }

  renderRestaurants() {
    if (this.state.restaurants.length === 0) return <h1 className='underline padding'>Favorite Restaurants to view them here!</h1>;
    else if (this.state.restaurants.length > 0) {
      const res = this.state.restaurants.map((res, index) => {
        return <div key={index} className='padding res-border'>
          <div className='padding'>
            <h2 className='inline'>{res.restaurantName}</h2>
            <i className="fa-regular fa-circle-xmark  margin-left" onClick={event => this.handleXClick(res.restaurantName)} />
          </div>
          <a href={`#restaurants?restaurant=${res.restaurantName}`}>
            <button className='profile-btn'>Menu</button></a>
        </div>
        ;
      });

      return res;
    }
  }

  renderMeals() {
    if (this.state.meals === 0) return <h1 className='underline padding'>Favorite Meals to view them here!</h1>;
    else if (this.state.meals.length > 0) {
      const meals = this.state.meals.map((res, index) => {
        return <div key={index} className='row padding res-border'>
          <div className="col-full">
            <h2 className='inline'>{res.restaurantName}</h2>
            <i className="fa-regular fa-circle-xmark  margin-left" onClick={event => this.handleXClick(res)} />
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
  }

  renderPage() {
    const meals = this.state.meals;
    const restaurants = this.state.restaurants;
    return (
      <>
        <div className='row'>
          <div className="col-full padding">
            <h1 className='text-center user-name'>{this.context.user.username}</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-half text-center border'>
            {
              restaurants.length > 0 &&
              <h1 className='underline padding'>Favorite Restaurants</h1>
            }
            {this.renderRestaurants()}
          </div>
          <div className='col-half text-center border'>
            {
              meals.length > 0 &&
              <h1 className='underline padding'>Favorite Meals</h1>
            }
            {this.renderMeals()}
          </div>
        </div>
      </>
    );
  }

  render() {

    if (this.state.isDeleting === true) {
      return (<>
        {this.createModal()}
        {this.renderPage()}
      </>);
    }
    return (
      <>
        {this.renderPage()}
      </>
    );
  }
}

Profile.contextType = AppContext;
