import React from 'react';
import Header from './Header'
import CitiesList from './CitiesList';
import SelectedCities from './SelectedCities';
import FilterByName from './FilterByName';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/layouts/app.scss';

library.add(faTimes, faSearch);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allChinaCities: [],
      selectedCities: [],
    }
    this.getAllCitiesFromServer = this.getAllCitiesFromServer.bind(this);
    this.handleCityCheckbox = this.handleCityCheckbox.bind(this)
    this.handleDeleteCity = this.handleDeleteCity.bind(this)
  }

  componentDidMount() {
    this.getAllCitiesFromServer();
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

  handleCityCheckbox(e) {
    const { allChinaCities, selectedCities } = this.state
    let newSelectedCities = [];
    let selectedCityID = e.target.parentNode.dataset.id;
    if (selectedCities.length && selectedCities.map(city => city.id).includes(selectedCityID)) return;
    for (let city of allChinaCities) {
      if (selectedCityID === city.id) {
        newSelectedCities.push(city)
        this.setState({
          selectedCities: selectedCities.concat(newSelectedCities)
        })
      }
    }
  }

  handleDeleteCity(e) {
    const { selectedCities } = this.state
    let elementId = e.currentTarget.dataset.id;
    for (let city of selectedCities) {
      if (city.id === elementId) {
        let elementIndex = selectedCities.indexOf(city);
        console.log(elementIndex)
        let newSelectedCities = [...selectedCities.slice(0, elementIndex), ...selectedCities.slice(elementIndex + 1)]
        this.setState({
          selectedCities: newSelectedCities
        })
      }
    }
  }

  render() {
    const { allChinaCities, selectedCities } = this.state
    return (
      <div className="App">
        <Header />
        {/* <FontAwesomeIcon icon="times" /> */}
        <section className="section__main">
          < div className="section__main_wrapper">
            <FilterByName />
            <CitiesList cities={allChinaCities} handleCityCheckbox={this.handleCityCheckbox} />
          </div>
          <SelectedCities selectedCities={selectedCities} handleDeleteCity={this.handleDeleteCity} />
        </section>
      </div>
    );
  }
}

export default App;
