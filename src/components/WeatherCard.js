
import wavesImg from "../images/waves.png"
import waveImg from "../images/wave.png"
import { useEffect, useState, useRef } from "react"

export default function WeatherCard({ cityData, returnFunction }) {

	const [ date, setDate ] = useState({date: "", time: ""})
	const [ weatherData, setWeatherData ] = useState([])
	const [ style, setStyle ] = useState({transform: "translateX(101%)"})
	const [ temp, setTemp ] = useState("")
	const weatherCard = useRef()

	useEffect(() => {

		let sampleDate = new Date(cityData.dt * 1000)
		setDate({
			date: sampleDate.toDateString(),
			time: sampleDate.toLocaleTimeString().slice(0, -3)
		})

		let data = {}
		for (let item in cityData) {
			if (item.includes("temp")) {
				let temp = Math.round((cityData[item] - 273.15) * 100) / 100
				if (item === "temp") setTemp(Math.round(temp) + "°")
				data[item.replace("_", " ")] = temp.toString() + " °C"
			}	
			if (item.includes("humidity")) data[item] = cityData[item] + " %"
			if (item.includes("pressure")) data[item] = cityData[item] + " hPa"
		}

		let elems = []
		for (let item in data) {
			elems.push(
				<div key={item} className="weather-data--item">
					<p>{item}</p>
					<p>{data[item]}</p>
				</div>
				)
		}

		setWeatherData(elems)
		console.log(getComputedStyle(weatherCard.current).getPropertyValue("transform"))
		setStyle({transform: "translateX(0)"})

	}, [])

	async function callReturn() {
		setStyle({transform: "translateX(101%)"})
		await new Promise(r => setTimeout(r, 1000))
		returnFunction()
	}

	return (
		<div 
			className={`weather 
				${parseInt(date.time) >= 18 ? "night" : ""}  
				${parseInt(date.time) <= 5 ? "night" : ""}  
				${parseInt(date.time) >= 5 && parseInt(date.time) < 8 ? "dawn" : ""} 
				${parseInt(date.time) >= 8 && parseInt(date.time) < 15 ? "sunny" : ""} 
				${parseInt(date.time) >= 15 && parseInt(date.time) < 18 ? "sunset" : ""}`} 
			style={style}
			ref={weatherCard}>
			<img className="waves" src={wavesImg} />
			<img className="wave" src={waveImg} />
			<div className="weather-data">
				<h2 className="weather-data--city">{cityData.name}</h2>
				<p className="weather-data--date">
					<i className="fa-solid fa-clock"></i>
					&nbsp;
					{`${date.date}, ${date.time}`}
				</p>
				<div className="weather-data--data">
					{weatherData}
				</div>
			</div>
			<div className="weather-temp">
				<p>Clear</p>
				<h1 className="weather-temp--temp">{temp}</h1>
			</div>
			<i 
				className="fa-solid fa-arrow-left weather-return"
				onClick={callReturn}
				>
			</i>
		</div>
	)

}