
import { useState, useReducer } from "react"

export default function LocationCard({ cities, callback, nMax=20 }) {

	const [ isFocus, setIsfocus ] = useState(false)
	const [ filteredCities, setFilteredCities ] = useState([])
	const [ input, setInput ] = useState("")
	const [ selectedCity, setSelectedCity ] = useState(null)

	function filterCities(value) {
		let newCities = cities.filter(city => (
			city.name.toUpperCase().includes(value.toUpperCase())
			)
		)
		return newCities.slice(0, 20)
	}

	async function handleChange(e) {
		if (selectedCity) setSelectedCity(null)
		let value = e.target.value
		setInput(value)
		if (value === "") {
			setIsfocus(false)
			return
		}
		let cities = filterCities(value)
		setFilteredCities(cities)
		setIsfocus(true)
	}

	function selectCity(city) {
		setInput(`${city.name}, ${city.stateCode}`)
		setSelectedCity(city)
		setIsfocus(false)
	}

	function returnCityData() {
		let city = selectedCity
		if (!city) {
			let cities = filterCities(input)
			if (cities.length > 1 || cities.length === 0) return
			city = cities.at(0)
		}
		callback(city)
	}

	return (
		<div className="location">
			<div className="input-container">
				<input 
					name="city"   
					onChange={handleChange}
					value={input}
					style={{borderRadius: `${isFocus ? "10px 10px 0px 0px" : "10px"}`}}
					autoComplete="off"
					placeholder="search place"/>
				<i className="fa-solid fa-magnifying-glass search-icon"></i>
				<i className="fa-solid fa-arrow-right arrow-icon" onClick={returnCityData}></i>
	        	<div 
	        		className="cities-filter" 
	        		style={{display: isFocus ? "block" : "none"}}>
	        		{filteredCities.map((city, idx) => (        		
	        			<div 
	        				key={idx} 
	        				className="option" 
	        				onClick={e => selectCity(city)}
	        				title={`${city.name}, ${city.stateCode}`}>
	        				<i className="fa-solid fa-location-dot option-pin"></i>
	        				&emsp;<b>{city.name}</b> | {city.stateCode}
	        			</div>
	        			)
	        		)}
	        	</div>
			</div>
		</div>
	)
}