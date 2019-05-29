import React, { Component } from 'react';
import NewSingle from './NewSingle';
import xml2js from 'xml2js';

class Weather extends Component {
    constructor(props) {
      super(props);
      this.state = {
        weather: [],
      };
      this.getLatestWeather = this.getLatestWeather.bind(this);
    }
    componentDidMount() {
      // is there local stroage?
      if(checkForLocalStorage()){
        if(localStorage.getItem("latestWeather")){
          let latestWeather = [];
          // Parse the serialized data back into an aray of objects
          latestWeather = JSON.parse(localStorage.getItem('latestWeather'));
          this.setState({
            weather: latestWeather
          })
        } else {
          // no weather data? then get it
          this.getLatestWeather();
        }
      } else {
        // no local stroage? then get the latest weather
        this.getLatestWeather();
      }
    }
  
    renderItems() {
      return this.state.weather.map((item) => (
        <NewSingle key={item.current.city.id} item={item} />
      ));
    }
    getLatestWeather() {
      function success(position){
        let latitude  = position.coords.latitude;
        let longitude = position.coords.longitude;
        
        let weatherType = `${this.props.weather.type}`;
        let url = 'http://api.openweathermap.org/data/2.5/'+weatherType+'?APPID=36b1cc7593267ffa05bfc67b49f4f9bb&lat='+latitude+'&lon='+longitude+'&mode=xml';
  
        fetch(url)
          .then((response) => {
            // fetch the xml
              //return response.json();
              return response.text();
            
          })
          .then((data) => {
            // parse the xml
            //let itemType = `${this.props.weather.itemType}`;
            let stateData = [];
          // I feel dirty leaving it this way, in the future we should have the application take either json or xml
            xml2js.parseString(data,{
              trim: true,
              explicitArray:false,
              preserveChildrenOrder:true,
              mergeAttrs:true
            },function (err, result) {
                if(err){console.log(err)}
                else{
                  // push the results into an array
                  // I am keeping this as an array, incase I get around to being able to display the current weather or a forcast
                  stateData.push(result);
                }
              })

            localStorage.setItem("latestWeather", JSON.stringify(stateData));
            // set the state with what was put in the local store
            this.setState({
              weather: stateData
            })
          })
          .catch((error) => console.log(error));
      }
      function error() {
        console.log('Unable to retrieve your location');
      }

      // if there is something in the local store use that 
      //otherwise get the latest from openweather
      if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser');
      } else {
        console.log('Locating…');
        navigator.geolocation.getCurrentPosition(success.bind(this), error);
      }
    }
    render() {
      // the button will call getLatestWeather
      return [
        <div className="row" key="0">
          {this.renderItems()}
        </div>,
        <div className="buttonHolder" key="1">
          <button onClick={this.getLatestWeather}>Get the latest weather</button>
        </div>
      ];
    }
  }
  function checkForLocalStorage(){
    // might not have needed to be its own function since it is only used once
    // but I like it out of the way.
    if (typeof(Storage) !== "undefined") {
      return true;
    } else {
      return false;
    }
    
  }
  export default Weather;
  