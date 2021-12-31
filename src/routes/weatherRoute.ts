import express from "express"
import { getWeather } from "../cache/weatherCache";
import { CoordinateRequest, parseCoordinates } from "../middleware/coordinateMiddleware";

const router = express.Router();

router.get("/", parseCoordinates, async (req: CoordinateRequest, res) => {
	const coordinate = req.coordinate;
	const weather = await getWeather(coordinate!);

	if (weather) {
		res.json(weather)
	}
	else {
		return res.status(500).json({ error: "Couldn't fetch weather data" })
	}
})

export { router as weather }