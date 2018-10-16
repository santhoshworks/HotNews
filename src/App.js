import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: []
    };
  }
  fetchStories = (event) => {
    console.log(event.target.value);
    const apiKey = "61560a43dfbe43c29026f9d1406d1559";
    const api = "https://newsapi.org//v2/top-headlines";
    const dataFetch = axios.get(`${api}?country=us&q=${event.target.value}&sortBy=publishedAt&apiKey=${apiKey}`);
    dataFetch.then((resopnse) => {
      this.setState({
        stories: resopnse.data.articles
      });
    }).catch((exception) => {
      console.log(exception);
    })
  }

  loadStories = () =>{
    console.log("Inside Load Stories", this.state.stories);
    if(!this.state.stories){
      return <p>Loading....</p>
    }
    return (
        <div>
        {this.state.stories.map((article, index) => {
            return (
              <div class="col s12 m4">
            <h4 class="header">{article.title}</h4>
            <div class="card horizontal">
              <div class="card-image">
                <img src={article.urlToImage} alt="gug"/>
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  <p>{article.content}</p>
                </div>
                <div class="card-action">
                  <a href={article.url}>Read Story</a>
                </div>
              </div>
            </div>
          </div>)
        })}
      </div>

    );
  } 
  render() {
    return (
      <div className="App">

        <div class="navbar-fixed">
          <nav>
            <div class="nav-wrapper">
              <a href="#!" class="brand-logo">Hot News !!!</a>
              <ul class="right hide-on-med-and-down">
                {/* <li><a href="sass.html">Sass</a></li>
                <li><a href="badges.html">Components</a></li> */}
              </ul>
            </div>
          </nav>
        </div>
        <header className="App-header">
          <p>
            Read Latest Stories Here
          </p>
          <nav>
          <div class="navbar-fixed nav-wrapper light-blue darken-3">
            <form>
              <div class="input-field">
                <input id="search" type="search" required onChange={this.fetchStories} />
                <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                <i class="material-icons">close</i>
              </div>
            </form>
          </div>
        </nav>
          {this.loadStories()}
        </header>
      </div>
    );
  }
}

export default App;
