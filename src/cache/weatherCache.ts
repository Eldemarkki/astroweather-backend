import axios from "axios";
import NodeCache from "node-cache";
import dotenv from "dotenv";
dotenv.config();
import { Coordinate } from "../utils/Coordinate";
import { OpenWeatherMapApiResponse } from "../data/OpenWeatherMapApiResponse";

const apiKey = process.env.OPENWEATHERMAP_API_KEY;

const cache = new NodeCache();

const getApiUrl = (coordinate: Coordinate) => `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinate.latitude}&lon=${coordinate.longitude}&units=metric&appid=${apiKey}`

const getWeather = async (coordinate: Coordinate) => {
	const cacheKey = `${coordinate.latitude} ${coordinate.longitude}`

	let data: OpenWeatherMapApiResponse;
	if (cache.has(cacheKey)) {
		data = cache.get(cacheKey)!;
	}
	else {
		const response = await axios.get<OpenWeatherMapApiResponse>(getApiUrl(coordinate))
		cache.set(cacheKey, response.data, 5 * 60);
		data = response.data
	}

	return data;
}

export { cache, getWeather };
