import React from 'react';
import RatingSystem from './components/RatingSystem'
import TestForm from './components/TestForm'

const restaurantList = [
  {
    name: 'Macdonald',
    rating: 2,
    description: 'classic fast food.',
    isOnSale: true,
    serveList:["beef", "pork", "chicken", "seafood"],
    foundLocation: "USA"
  }, {
    name: 'KFC',
    rating: 4.5,
    description: 'only egg tart.',
    isOnSale: false,
    serveList:["chicken"],
    foundLocation: "USA"
  }, {
    name: 'Mos Burger',
    rating: 5,
    description: 'expensive, taste good.',
    isOnSale: false,
    serveList:["beef", "pork", "chicken", "seafood", "Vegetarian"],
    foundLocation: "Japan"
  },
  {
    name: 'Burger King',
    rating: 3,
    description: 'cheap and big.',
    isOnSale: true,
    serveList:["beef", "pork", "chicken"],
    foundLocation: "USA"
  },
  {
    name: '頂呱呱',
    rating: 1,
    description: 'cheap.',
    isOnSale: true,
    serveList:["chicken", "Vegetarian"],
    foundLocation: "Taiwan"
  }
];


function App(props) {

  return (
    <>
      {/* <TestForm /> */}
      <RatingSystem restaurantList={restaurantList} />
    </>
  );
}

export default App;


