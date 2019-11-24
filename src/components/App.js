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
    this.handleDeleteCity = this.handleDeleteCity.bind(this);
    this.resetSelectedList = this.resetSelectedList.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);

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
    let selectedCityID = e.target.parentNode.dataset.id;
    if (e.target.checked) {
      for (let city of allChinaCities) {
        if (selectedCityID === city.id) {
          this.setState({
            selectedCities: selectedCities.concat(city)
          })
        }
      }
    } else {
      for (let removeCity of selectedCities) {
        if (removeCity.id === selectedCityID) {
          let elementIndex = selectedCities.indexOf(removeCity);
          let newSelectedCities = [...selectedCities.splice(0, elementIndex), ...selectedCities.splice(elementIndex + 1)]
          this.setState({
            selectedCities: newSelectedCities,
          })
        }
      }
    }
  }

  handleDeleteCity(e) {
    const { selectedCities } = this.state
    let elementId = e.currentTarget.dataset.id;
    for (let city of selectedCities) {
      if (city.id === elementId) {
        let elementIndex = selectedCities.indexOf(city);
        let newSelectedCities = [...selectedCities.slice(0, elementIndex), ...selectedCities.slice(elementIndex + 1)]
        this.setState({
          selectedCities: newSelectedCities
        })
      }
    }
  }

  resetSelectedList() {
    let newSelectedCities = [];
    this.setState({
      selectedCities: newSelectedCities
    })
  }

  handleSelectAll(e) {
    console.log(e.target.checked)
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
            <CitiesList cities={allChinaCities} handleCityCheckbox={this.handleCityCheckbox} handleSelectAll={this.handleSelectAll} />
          </div>
          <SelectedCities selectedCities={selectedCities} handleDeleteCity={this.handleDeleteCity} resetSelectedList={this.resetSelectedList} />
        </section>
      </div>
    );
  }
}

export default App;
