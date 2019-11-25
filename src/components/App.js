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
    const { allChinaCities, nameQuery } = this.state;
    if (!nameQuery) {
      e.target.checked ? this.setState({
        selectedCities: allChinaCities
      }) : this.setState({
        selectedCities: []
      })
    } else {
      let filteredCities = allChinaCities.filter(chineseCity => chineseCity.name.toLowerCase().includes(nameQuery.toLowerCase()));
      e.target.checked ? this.setState({ selectedCities: filteredCities }) : this.setState({ selectedCities: [] })
    }
  }

  handleFilterByName(e) {
    let userQuerySearch = e.target.value;
    this.setState({
      nameQuery: userQuerySearch,
    })
  }

  render() {
    const { allChinaCities, selectedCities, nameQuery } = this.state
    return (
      <div className="App">
        <Header />
        {(allChinaCities == "") ? <Loader /> : <section className="section__main">
          < div className="section__main_wrapper">
            <FilterByName handleFilterByName={this.handleFilterByName} />
            <CitiesList cities={allChinaCities.filter(chineseCity => chineseCity.name.toLowerCase().includes(nameQuery.toLowerCase()))} handleCityCheckbox={this.handleCityCheckbox} handleSelectAll={this.handleSelectAll} selectedCities={selectedCities} />
          </div>
          <SelectedCities selectedCities={selectedCities} handleDeleteCity={this.handleDeleteCity} resetSelectedList={this.resetSelectedList} />
        </section>
        }
      </div>
    );
  }
}

export default App;
