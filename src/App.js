
import LocationCard from "./components/LocationCard"
import WeatherCard from "./components/WeatherCard"
import { Country, State, City }  from 'country-state-city';
import { useEffect, useState } from "react"

export default function App() {

	const [ cities, setCities ]  = useState([])
	const [ city, setCity ] = useState(null)


	useEffect(() => {

		async function getCities() {
			let citiesData = await City.getAllCities()
			setCities(citiesData)
		} 

		getCities()

	}, [])

	async function showCityData(cityData) {
		let lat = Math.round(cityData.latitude,2)
		let lon = Math.round(cityData.longitude,2)
		let apiId = "56ec73692becb8447ba0607dda56cb1b"
		let request = await fetch(`https://api.openweathermap.org/
			data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiId}`)
		let weathData = await request.json()
		setCity({
			name: cityData.name,
			dt: weathData.dt,
			...weathData.main
		})
	}

	return (
		<div className="App">
			<LocationCard cities={cities} callback={showCityData} />
			{city && 
				<WeatherCard 
					cityData={city} 
					returnFunction={e => setCity(null)} 
				/>
			}
		</div>
	)
}