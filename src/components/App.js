import React from 'react';
import Header from './Header'
import CitiesList from './CitiesList';
import SelectedCities from './SelectedCities';
import '../stylesheets/layouts/app.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allChinaCities: [],
    }
    this.getAllCitiesFromServer = this.getAllCitiesFromServer.bind(this);
  }

  getAllCitiesFromServer() {
    const citiesJSONurl = "./cities-of-china.json"
    fetch(citiesJSONurl)
      .then(resp => resp.json())
      //.then(cities => console.log(cities))
      .then(cities => this.setState({
        allChinaCities: cities.cities
      }))
  }

  componentDidMount() {
    this.getAllCitiesFromServer();
  }

  render() {
    const { allChinaCities } = this.state
    console.dir(this.state)
    return (
      <div className="App">
        <Header />
        <section className="section__main">
          <CitiesList cities={allChinaCities} />
          <SelectedCities selectedCities="citi" />
        </section>
      </div>
    );
  }
}

export default App;
