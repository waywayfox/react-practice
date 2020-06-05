import React from 'react';
import { Col, Row, Input, Button, Space, Select } from 'antd';
import { Restaurant } from './Restaurant'
import { EditModel } from './EditModel'

const { Option } = Select;

const SORT_TYPE = {
  NAME: "name",
  DESCREASE_RATING: "descrease-rating",
  INCREASE_RATING: "increase-rating"
};

const restaurantTemplate = {
  name: '',
  rating: 1,
  description: '',
  isOnSale: false,
  serveList:["chicken"],
  foundLocation: "USA"
}

class RatingSystem extends React.Component {
  constructor(props) {
    super(props);
    const allRestaurants = this.props.restaurantList.map((restaurant, index) => {
      restaurant.index = index;
      return restaurant;
    });

    this.state = {
      allRestaurants: allRestaurants,
      visibleRestaurantList: [],
      sortingType: SORT_TYPE.NAME,
      nextRestaurantIndex: allRestaurants.length,
      keyword: "",
      configMode: false,
      editIndex: 0
    }
  }

  searchByKeyword = (restaurant) => {
    const searchString = (restaurant.name + " " + restaurant.description).toLocaleLowerCase();
    return searchString.indexOf(this.state.keyword.toLocaleLowerCase()) > -1;
  }

  getCurrentSortFunction = () => {
    let sortingFn;
    switch (this.state.sortingType) {
      case SORT_TYPE.NAME:
        sortingFn = this.sortByName;
        break;
      case SORT_TYPE.DESCREASE_RATING:
        sortingFn = this.sortByDecreaseRating;
        break;
      case SORT_TYPE.INCREASE_RATING:
        sortingFn = this.sortByIncreaseRating;
        break;
      default:
        console.log("Failed to get sorting Function.")
        break;
    }
    return sortingFn;
  }

  sortByName = (a, b) => {
    return a.name > b.name ? 1 : -1;
  }

  sortByDecreaseRating = (a, b) => {
    return a.rating > b.rating ? -1 : 1;
  }

  sortByIncreaseRating = (a, b) => {
    return a.rating > b.rating ? 1 : -1;
  }

  updateVisibleList = () => {

    // filter the keywork
    const newVisibleList = this.state.allRestaurants.filter(this.searchByKeyword)

    // sort by sortType
    const sortingFunction = this.getCurrentSortFunction();
    newVisibleList.sort(sortingFunction);

    this.setState({
      visibleRestaurantList: newVisibleList
    });
  };

  setKeyword = (e) => {
    const newKeyword = e.target.value;
    this.setState({
      keyword: newKeyword
    }, this.updateVisibleList);
  }

  setSortType = (type) => {
    const newSortType = type;
    this.setState({
      sortingType: newSortType
    }, this.updateVisibleList);
  }
  
  // enterConfigMode = (index, e) => {
  //   console.log("in system enter" + toString(index))
  //   this.setState({
  //     configMode: true,
  //     editIndex: index
  //   });
  // };
  enterConfigMode = (index, e) => {
    console.log("in system enter" + toString(index))
  };

  changeEditIndex = (index) => {
    console.log("in change" + toString(index))
    this.setState({
      editIndex: index
    });
  }

  quitConfigMode = () => {
    this.setState({
      configMode: false,
    });
  }

  removeRestaurant = (index) => {
    const newAllRestaurants = this.state.allRestaurants.filter((restaurant) => {
      return restaurant.index !== index
    });

    this.setState({
      allRestaurants: newAllRestaurants,
      configMode: false
    }, this.updateVisibleList);
  }

  saveRestaurant = (restaurant) => {
    // 
    let newAllRestaurants;
    if (restaurant.index === this.state.nextRestaurantIndex) {
      newAllRestaurants = this.state.allRestaurants.slice(0);
      newAllRestaurants.push(restaurant);
    } else {
      newAllRestaurants = this.state.allRestaurants.map((singleRestaurant) => {
        return singleRestaurant.index === restaurant.index ? restaurant : singleRestaurant;
      });
    }

    this.setState({
      allRestaurants: newAllRestaurants,
      configMode: false,
      nextRestaurantIndex: newAllRestaurants.length
    }, this.updateVisibleList);
    
  }
  
  componentDidMount() {
    this.updateVisibleList();
  }

  render() {
    const renderList = this.state.visibleRestaurantList.map((restaurant, index) => {
      // const enterFunction = this.enterConfigMode.bind(this, restaurant.index)
      // const enterFunction = this.enterConfigMode.bind(this, restaurant.index)
      // console.log(restaurant.index)
      // console.log(restaurant)
      return (
        <Col span={8} className="Restaurant" key={index}>
          <Restaurant
            title={restaurant.name}
            description={restaurant.description}
            rating={restaurant.rating}
            isOnSale={restaurant.isOnSale}
            serveList={restaurant.serveList}
            foundLocation={restaurant.foundLocation}
            editRestaurant={this.changeEditIndex.bind(this, restaurant.index)}
            index={restaurant.index}
            key={restaurant.index}
          />
        </Col>
      );
    });

    const currentConfigRestaurant = this.state.allRestaurants.find(restaurant => restaurant.index === this.state.editIndex) || restaurantTemplate;

    const editModel = (
      <EditModel
        visible={this.state.configMode}
        onCancel={this.quitConfigMode.bind(this)}
        removeRestaurant={this.removeRestaurant.bind(this, this.state.editIndex)}
        restaurant={currentConfigRestaurant}
        saveRestaurant={this.saveRestaurant.bind(this)}
        isAdd={this.state.editIndex === this.state.nextRestaurantIndex}
      />
    );
    console.log("now edit is " + toString(this.state.editIndex))
    return (
      <>
        <div style={{padding: 30}}>
          <h1>維維的餐廳系統</h1>
          <Space direction="vertical">
            <Input placeholder="輸入關鍵字" className="searchInput" onChange={this.setKeyword} />
            <Select defaultValue={SORT_TYPE.NAME} style={{ width: 200 }} onChange={this.setSortType}>
              <Option value={SORT_TYPE.NAME}>按照名稱排列</Option>
              <Option value={SORT_TYPE.DESCREASE_RATING}>評價從高到低排列</Option>
              <Option value={SORT_TYPE.INCREASE_RATING}>評價由低到高</Option>
            </Select>
            <Button type="primary" onClick={this.enterConfigMode.bind(this, this.state.nextRestaurantIndex)}>
              蓋餐廳
            </Button>
          </Space>
          {editModel}
          <div  className="site-card-wrapper">
            <Row gutter={24}>
              {renderList}
            </Row>
          </div>

        </div>
      </>
    )
  }
}
 
export default RatingSystem;