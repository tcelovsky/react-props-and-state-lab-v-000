import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChangeFilterType = e => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: e
      }
    })
  }

  findPets = () => {
    let url = '/api/pets'

    if (this.state.filters.type !== 'all') {
      url += `?type=${this.state.filters.type}`
    }

    // fetch(url)
    // .then(res => res.json())
    // .then(pets => this.setState({pets}))
    fetch(url)
      .then(r => r.json())
      .then(petsJSONArray => {
        this.setState({
          pets: petsJSONArray
        }, ()=>console.log(this.state.pets))
      })
  }

  handleAdoptPet = petId => {
    const pet = { ...this.state.pets.find(p => p.id === id)}
    pet.isAdopted = pet.isAdopted ? false : true
    const index = this.state.pets.indexOf(pet)
    this.setState({
      pets: [...this.state.pets.slice(0, index), pet, ...this.state.pets(index, this.state.pets.length)]
    })
    // this.setState({
    //   adoptedPets: [...this.state.adoptedPets, petId]
    // })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters filters={this.state.filters} onChangeType={this.handleChangeFilterType} onFindPetsClick={this.findPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} adoptedPets={this.state.adoptedPets} onAdoptPet={this.handleAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
