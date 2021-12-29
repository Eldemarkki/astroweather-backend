import express from "express"
import { getWeather } from "../cache/weatherCache";
import { cloudinessExtractor, temperatureExtractor } from "../data/dataExtractors";
import { CoordinateRequest, parseCoordinates } from "../middleware/coordinateMiddleware";

const router = express.Router();

const dataExtractors = [
	temperatureExtractor,
	cloudinessExtractor
]

dataExtractors.forEach(extractor => {
	router.use(extractor.routeName, parseCoordinates, async (req: CoordinateRequest, res) => {
		const weather = await getWeather(req.coordinate!);
		res.json(extractor.extract(weather));
	})
})

export { router as dataExtractorsRouter }