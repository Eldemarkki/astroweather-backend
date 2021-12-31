import { remap } from "../utils/numberUtils";
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

interface MoonData {
	moonriseToday: Date;
	moonsetToday: Date;
	moonriseTomorrow: Date;
	moonsetTomorrow: Date;
	currentMoonPhase: number;
}

export const moonExtractor: DataExtractor<MoonData> = {
	routeName: "/moon",
	extract: data => {
		const currentMoonPhase = remap(
			data.daily[0].dt * 1000,
			data.daily[1].dt * 1000,
			data.daily[0].moon_phase,
			data.daily[1].moon_phase,
			new Date().getTime()
		)

		return {
			moonriseToday: new Date(data.daily[0].moonrise * 1000),
			moonsetToday: new Date(data.daily[0].moonset * 1000),
			moonriseTomorrow: new Date(data.daily[1].moonrise * 1000),
			moonsetTomorrow: new Date(data.daily[1].moonset * 1000),
			currentMoonPhase
		}
	}
}

interface SunData {
	sunrise: Date;
	sunset: Date;
}

export const sunExtractor: DataExtractor<SunData> = {
	routeName: "/sun",
	extract: data => ({
		sunrise: new Date(data.daily[0].sunrise * 1000),
		sunset: new Date(data.daily[0].sunset * 1000),
	})
}