import React from 'react';
import AppContext from '../lib/app-context';

export default class MenuPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantItems: []
    };
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
        // console.log('datacommon', data);
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
    // console.log('menuId', this.state.restaurantItems);

    return (
      <div className='row'>
        <div className='col-full text-center'>
          <h1> {menuId}</h1>
          <h2>Menu Items under 500 Calories</h2>
          <h2>All calories per serving size</h2>
        </div>
        <div className='row'>
          {this.renderItems()}
        </div>
      </div>
    );
  }
}

MenuPage.contextType = AppContext;
