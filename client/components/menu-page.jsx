import React from 'react';
import AppContext from '../lib/app-context';

export default class MenuPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantItems: [],
      addedFav: false,
      currUser: 1
    };
    this.addFavRest = this.addFavRest.bind(this);
  }

  addFavRest() {
    const { menuId } = this.context;
    if (this.state.addedFav === false) {

      fetch('/api/restaurants', {
        method: 'POST',
        body: JSON.stringify({ restaurant: menuId, currUser: this.state.currUser }),
        headers: {
          'Content-Type': 'application/json'
        }

      })
        .then(res => res.json())
        .then(data => {
          this.setState({ addedFav: true });
        })
        .catch(err => console.error('Fetch failed!', err))
      ;
    } else if (this.state.addedFav === true) {
      fetch(`/api/restaurants/${menuId}`, {
        method: 'DELETE'
      })
        .then(res => res)
        .then(data => {
          this.setState({ addedFav: false });
        })
        .catch(err => console.error('Delete failed!', err))
      ;
    }

  }

  favButton() {
    if (this.state.addedFav === false) {
      return <button className='fav-btn' onClick={this.addFavRest}>Favorite</button>;
    } else {
      return <button className='fav-btn-on' onClick={this.addFavRest}>Favorited</button>;
    }
  }

  componentDidMount() {
    fetch(`https://trackapi.nutritionix.com/v2/search/instant/?query=${this.context.menuId}&detailed=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': process.env.REACT_APP_X_ID_API_KEY,
        'x-app-key': process.env.REACT_APP_X_KEY_API_KEY
      }

    })
      .then(res => res.json())
      .then(data => {
        this.setState({ restaurantItems: data.branded });

      })
      // eslint-disable-next-line no-console
      .catch(err => console.log('Fetch Get error:', err));
  }

  renderItems() {

    const mappedItems = (item, index) => {
      if (item.nf_calories > 500) {
        return;
      }

      if (item.serving_weight_grams === null) {
        item.serving_weight_grams = 1;
        return <div key={index} className='col-half'>
          <div className='row border'>
            <div className='col-full'>
              <h2 className='text-center'>{item.food_name}</h2>
            </div>
            <div className='col-half'>
              <img src={item.photo.thumb} alt="" />
            </div>
            <div className='col-half'>
              <p className='cal-table'>Serving Size {item.serving_weight_grams}</p>
              <p className='cal-table'> Calories {item.nf_calories}</p>
              <p className='cal-table'>Protein {item.full_nutrients[0].value}g</p>
              <p className='cal-table'>Fat {item.full_nutrients[1].value}g</p>
              <p className='cal-table'>Carbohydrates {item.full_nutrients[2].value}g</p>
            </div>
          </div>
        </div>;
      }

      if (index % 2 === 0) {
        return <div key={index} className='col-half'>
          <div className='row border'>
            <div className='col-full'>
              <h2 className='text-center'>{item.food_name}</h2>
            </div>
            <div className='col-half'>
              <img src={item.photo.thumb} alt="" />
            </div>
            <div className='col-half'>
              <p className='cal-table'>Serving Size {item.serving_weight_grams} grams</p>
              <p className='cal-table'> Calories {item.nf_calories}</p>
              <p className='cal-table'>Protein {item.full_nutrients[0].value}g</p>
              <p className='cal-table'>Fat {item.full_nutrients[1].value}g</p>
              <p className='cal-table'>Carbohydrates {item.full_nutrients[2].value}g</p>
            </div>
          </div>
        </div>
        ;
      } else {
        return <div key={index} className='col-half'>
          <div className='row border' >
            <div className='col-full'>
              <h2 className='text-center'>{item.food_name}</h2>
            </div>
            <div className='col-half'>
              <img src={item.photo.thumb} alt="" />
            </div>
            <div className='col-half'>
              <p className='cal-table'>Serving Size {item.serving_weight_grams} grams</p>
              <p className='cal-table'> Calories {item.nf_calories}</p>
              <p className='cal-table'>Protein {item.full_nutrients[0].value}g</p>
              <p className='cal-table'>Fat {item.full_nutrients[1].value}g</p>
              <p className='cal-table'>Carbohydrates {item.full_nutrients[2].value}g</p>
            </div>
          </div>
        </div>
        ;
      }
    };

    const items = this.state.restaurantItems.map(mappedItems);
    return items;
  }

  render() {
    const { menuId } = this.context;

    return (
      <div className='row'>
        <div className='col-full text-center'>
          <h1 className='menu-id'> {menuId}</h1>
          <h2>Menu Items under 500 Calories</h2>
          <h2>All calories per serving size</h2>
          {this.favButton()}
        </div>
        <div className='row'>
          {this.renderItems()}
        </div>
      </div>
    );
  }
}

MenuPage.contextType = AppContext;
