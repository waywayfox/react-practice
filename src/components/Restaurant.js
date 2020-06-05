import React from 'react';
import './RatingSystem.css'
import { Card, Rate, Tag, Button } from 'antd';


const SERVE_ENUM ={
  BEEF: "beef",
  CHICKEN: "chicken",
  PORK: "pork",
  SEAFOOD: "seafood",
  VEGETARIAN: "Vegetarian"
}

export class Restaurant extends React.Component {
  constructor(props) {
    super(props);
  }

  convertServeStringToServeTag = (str) => {
    let serveTag = "";
    switch (str) {
      case SERVE_ENUM.BEEF:
        serveTag = "牛肉";
        break;
      case SERVE_ENUM.CHICKEN:
        serveTag = "雞肉";
        break;
      case SERVE_ENUM.PORK:
        serveTag = "豬肉";
        break;
      case SERVE_ENUM.SEAFOOD:
        serveTag = "海鮮";
        break;
      case SERVE_ENUM.VEGETARIAN:
        serveTag = "素食";
        break;
    
      default:
        break;
    }
    return serveTag;
  }

  generateTagComponet = (tag, color) => {
    const tagColor = color || "gray"
    return (
      <Tag color={tagColor} >
        {tag}
      </Tag>
    );
  }

  getRestaurantsTagsFromProps = () => {
    const tagsList = [];
    const isOnSaleTag = this.props.isOnSale ? this.generateTagComponet("特價中") : <></>
    const serveTagList = this.props.serveList.map((serve,index) => {
      return this.generateTagComponet(this.convertServeStringToServeTag(serve), "orange")
    });
    const foundLocationTag = this.generateTagComponet(this.props.foundLocation, "green");
    tagsList.push(isOnSaleTag)
    tagsList.push(...serveTagList)
    tagsList.push(foundLocationTag)
    return tagsList
  }

  handleEditConfig = (e) => {
    console.log("in restaurant" + toString(this.props.index))
    this.props.editRestaurant(this.props.index)
  }

  render() {
    console.log(this.props)
    const tags = this.getRestaurantsTagsFromProps()
    return (
      <Card title={ this.props.title} key={this.props.index}>
        <p>{this.props.description}</p>
        <Rate disabled allowHalf defaultValue={this.props.rating} ></Rate>
        <br></br>
        {tags}
        <br></br><br></br>
        <Button type="primary" onClick={this.handleEditConfig} >改裝餐廳</Button>
      </Card>
    );
  }
}
 
export default Restaurant;
