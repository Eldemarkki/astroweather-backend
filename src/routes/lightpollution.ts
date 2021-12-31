import express from "express"
import Jimp from "jimp";
import { isNumber } from "../utils/numberUtils";
import { convertX, convertY } from "../utils/coordinateConverter";
import { getIntensityIndexForColor, getLightPollution } from "../utils/lightPollutionScale";
import { CoordinateRequest, parseCoordinates } from "../middleware/coordinateMiddleware";

const router = express.Router();

let img: Jimp | undefined = undefined;

Jimp.read("./world2020.png", (error, image) => {
	if (error) {
		console.log("Error loading image:", error);
	}
	else {
		img = image;
	}
})

router.get("/", parseCoordinates, (req: CoordinateRequest, res) => {
	if (!img) return res.status(503).json({ error: "The source image has not been loaded yet. Try again in a minute." })

	const { latitude, longitude } = req.coordinate!

	const pixelX = Math.floor(convertX(longitude))
	const pixelY = Math.floor(convertY(latitude))
	
	const lightPollution = getLightPollution(img.getPixelColour(pixelX, pixelY));
	res.json(lightPollution);
})

export { router as lightpollution };