import express from "express"
import Jimp from "jimp";
import { isNumber } from "../utils/numberUtils";
import { convertX, convertY } from "../utils/coordinateConverter";
import { getIntensityIndexForColor } from "../utils/lightPollutionScale";

const router = express.Router();

let img: Jimp | undefined = undefined;

Jimp.read("./world2020.png", (err, image) => {
	if (err) {
		console.log("Error loading image: ", err);
		return;
	}

	img = image;
})

router.get("/", (req, res) => {
	// TODO: Use coordinateMiddleware
	if (!req.query.hasOwnProperty("lon")) {
		return res.status(400).json({ error: "You must include longitude in the query parameters" })
	}
	const lonStr = req.query["lon"];
	if (!isNumber(lonStr)) {
		return res.status(400).json({ error: "Longitude must be a number" })
	}

	if (!req.query.hasOwnProperty("lat")) {
		return res.status(400).json({ error: "You must include latitude in the query parameters" })
	}
	const latStr = req.query["lat"];
	if (!isNumber(latStr)) {
		return res.status(400).json({ error: "Latitude must be a number" })
	}

	if (!img) {
		return res.status(503).json({ error: "The source image has not been loaded yet. Try again in a minute." })
	}

	const longitude = Number(lonStr);
	const latitude = Number(latStr);

	const pixelX = Math.floor(convertX(longitude))
	const pixelY = Math.floor(convertY(latitude))

	const pixelHex = img.getPixelColour(pixelX, pixelY)

	const intensityIndex = getIntensityIndexForColor(pixelHex);

	res.json({
		intensityIndex
	});
})

export { router as lightpollution };