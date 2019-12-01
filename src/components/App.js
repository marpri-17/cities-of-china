import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import Header from './Header'
import CitiesList from './CitiesList';
import SelectedCities from './SelectedCities';
import FilterByName from './FilterByName';
import Loader from './Loader';
import '../stylesheets/layouts/app.scss';

library.add(faTimes, faSearch);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allChinaCities: [],
      nameQuery: "",
    }
    this.getAllCitiesFromServer = this.getAllCitiesFromServer.bind(this);
    this.handleCityCheckbox = this.handleCityCheckbox.bind(this)
    this.handleDeleteCity = this.handleDeleteCity.bind(this);
    this.resetSelectedList = this.resetSelectedList.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleFilterByName = this.handleFilterByName.bind(this);
    this.handleCheck = this.handleCheck.bind(this);

  }

  componentDidMount() {
    this.getAllCitiesFromServer();
  }

  getAllCitiesFromServer() {
    const citiesJSONurl = "./cities-of-china.json"
    fetch(citiesJSONurl)
      .then(resp => resp.json())
      .then(allCities => allCities.cities.map(city => {
        let formatCity = { ...city, isSelected: false }
        return formatCity;
      }))
      .then(cities => this.setState({
        allChinaCities: cities
      }))
  }

  handleCityCheckbox(e) {
    const { allChinaCities } = this.state
    let selectedCityID = e.target.parentNode.dataset.id;
    let newAllcities = []
    for (let city of allChinaCities) {
      if (selectedCityID === city.id) {
        city.isSelected = !city.isSelected;
        newAllcities.push(city)
      } else {
        newAllcities.push(city)
      }
    }
    this.setState({
      allChinaCities: newAllcities
    })
  }

  handleDeleteCity(e) {
    const { allChinaCities } = this.state
    let elementId = e.currentTarget.dataset.id;
    let newAllcities = []
    for (let city of allChinaCities) {
      if (city.id === elementId) {
        city.isSelected = false;
        newAllcities.push(city)
      } else {
        newAllcities.push(city)
      }
    }
    this.setState({
      allChinaCities: newAllcities
    })
  }

  resetSelectedList() {
    const { allChinaCities } = this.state
    let newSelectedCities = allChinaCities.map(city => { city.isSelected = false; return city });
    this.setState({
      allChinaCities: newSelectedCities,
    })
  }

  handleSelectAll() {
    const { allChinaCities, nameQuery } = this.state;
    let filteredCities = allChinaCities.filter(chineseCity => chineseCity.name.toLowerCase().includes(nameQuery.toLowerCase()))
    let selectedCitiesFromFilter = [];
    for (let city of allChinaCities) {
      if (filteredCities.includes(city)) {
        city.isSelected = true
      }
      selectedCitiesFromFilter.push(city)
    }
    this.setState({
      allChinaCities: selectedCitiesFromFilter
    })

  }

  handleFilterByName(e) {
    let userQuerySearch = e.target.value;
    this.setState({
      nameQuery: userQuerySearch,
    })
  }

  handleCheck() {
    const { allChinaCities, nameQuery } = this.state;
    let citiesSelected = allChinaCities.filter(chineseCity => chineseCity.name.toLowerCase().includes(nameQuery.toLowerCase()));
    return citiesSelected.reduce((acc, city) => {
      if (city.isSelected === false) {
        return false;
      } else {
        return acc;
      }
    }, true);

  }

  render() {
    const { allChinaCities, nameQuery } = this.state
    return (
      <div className="App">
        <Header />
        {(allChinaCities == "") ? <Loader /> :
          <section className="section__main">
            < div className="section__main_wrapper">
              <FilterByName handleFilterByName={this.handleFilterByName} nameQuery={nameQuery} />
              <CitiesList cities={allChinaCities.filter(chineseCity => chineseCity.name.toLowerCase().includes(nameQuery.toLowerCase()))} handleCityCheckbox={this.handleCityCheckbox} handleSelectAll={this.handleSelectAll} handleCheck={this.handleCheck} />
            </div>
            <SelectedCities selectedCities={allChinaCities.filter(city => city.isSelected)} handleDeleteCity={this.handleDeleteCity} resetSelectedList={this.resetSelectedList} />
          </section>
        }
      </div>
    );
  }
}

export default App;
