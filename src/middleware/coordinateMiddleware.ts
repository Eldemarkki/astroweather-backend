import { NextFunction, Request, Response } from "express";
import { Coordinate } from "../utils/Coordinate";
import { isNumber } from "../utils/numberUtils";

export interface CoordinateRequest extends Request {
	coordinate?: Coordinate;
}

export const parseCoordinates = async (req: CoordinateRequest, res: Response, next: NextFunction) => {
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

	req.coordinate = {
		latitude: Number(latStr),
		longitude: Number(lonStr)
	}

	next();
}