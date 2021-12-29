import { OpenWeatherMapApiResponse } from "./OpenWeatherMapApiResponse";

interface DataExtractor<T> {
	routeName: string;
	extract: (data: OpenWeatherMapApiResponse) => T;
}

interface TemperatureData {
	currentTemperature: number;
	feelsLike: number;
}

export const temperatureExtractor: DataExtractor<TemperatureData> = {
	routeName: "/temperature",
	extract: (data) => ({
		currentTemperature: data.current.temp,
		feelsLike: data.current.feels_like
	})
}

interface CloudinessData {
	cloudiness: number;
}

export const cloudinessExtractor: DataExtractor<CloudinessData> = {
	routeName: "/cloudiness",
	extract: (data) => ({
		cloudiness: data.current.clouds
	})
}