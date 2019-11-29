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
      selectedCities: [],
      nameQuery: "",
    }
    this.getAllCitiesFromServer = this.getAllCitiesFromServer.bind(this);
    this.handleCityCheckbox = this.handleCityCheckbox.bind(this)
    this.handleDeleteCity = this.handleDeleteCity.bind(this);
    this.resetSelectedList = this.resetSelectedList.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleFilterByName = this.handleFilterByName.bind(this)

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

  // getSelectedCities() {
  //   return this.state.allChinaCities.filter(city => city.isSelected = true)
  // }

  handleCityCheckbox(e) {
    const { allChinaCities } = this.state
    let selectedCityID = e.target.parentNode.dataset.id;
    let newAllcities = []
    for (let city of allChinaCities) {
      if (selectedCityID === city.id) {
        city.isSelected = true;
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
  // Falta vincular checkboxes, filterbyname y  botones clear y select all

  resetSelectedList() {
    let newSelectedCities = [];
    this.setState({
      selectedCities: newSelectedCities
    })
  }

  handleSelectAll(e) {
    const { allChinaCities, nameQuery } = this.state;
    if (!nameQuery) {
      let allCitiesSelected = allChinaCities.map(city => { city.isSelected = true; return city })
      this.setState({ allChinaCities: allCitiesSelected })
    } else {
      let filteredCities = allChinaCities.filter(chineseCity => chineseCity.name.toLowerCase().includes(nameQuery.toLowerCase()))
      let selectedCitiesFromFilter = [];
      debugger;
      for (let cityMainList of allChinaCities) {
        for (let city of filteredCities) {
          if (cityMainList.id === city.id) {
            cityMainList.isSelected = true;
            selectedCitiesFromFilter.push(cityMainList)
          }
        }
      }
      console.log(selectedCitiesFromFilter)
      this.setState({
        allChinaCities: selectedCitiesFromFilter
      })
    }


    // if (!nameQuery) {
    //   e.target.checked ? this.setState({
    //     selectedCities: allChinaCities
    //   }) : this.setState({
    //     selectedCities: []
    //   })
    // } else {
    //   let filteredCities = allChinaCities.filter(chineseCity => chineseCity.name.toLowerCase().includes(nameQuery.toLowerCase()));
    //   e.target.checked ? this.setState({ selectedCities: filteredCities }) : this.setState({ selectedCities: [] })
    // }
  }

  handleFilterByName(e) {
    let userQuerySearch = e.target.value;
    this.setState({
      nameQuery: userQuerySearch,
    })
  }

  render() {
    console.log(this.state.allChinaCities)
    const { allChinaCities, selectedCities, nameQuery } = this.state
    return (
      <div className="App">
        <Header />
        {(allChinaCities == "") ? <Loader /> :
          <section className="section__main">
            < div className="section__main_wrapper">
              <FilterByName handleFilterByName={this.handleFilterByName} />
              <CitiesList cities={allChinaCities.filter(chineseCity => chineseCity.name.toLowerCase().includes(nameQuery.toLowerCase()))} handleCityCheckbox={this.handleCityCheckbox} handleSelectAll={this.handleSelectAll} selectedCities={selectedCities} />
            </div>
            <SelectedCities selectedCities={allChinaCities.filter(city => city.isSelected)} handleDeleteCity={this.handleDeleteCity} resetSelectedList={this.resetSelectedList} />
          </section>
        }
      </div>
    );
  }
}

export default App;
