import React, {Component} from 'react';
import './App.css';
import Weather from './News/Weather';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      weather:{
        type:"weather",
        itemType:"object"
      },
      forecast:
      {
        type:"forecast",
        itemType:"array"
      }
    }
    // originally I had the weather being switched from current weather to forcast based on the type setting
    // but the xml formatted to json is in a different format than the original json
    // so, I may redo this part in the future, sisnce I liked how it worked originally.
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Weather</h1>
        </header>
        <Weather weather={this.state.weather} />
      </div>
    );
  }  
}

export default App;
