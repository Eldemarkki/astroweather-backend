import { KnownLocation } from "./KnownLocation";
import { remap } from "./numberUtils";

// Anchorage
const knownLocationA: KnownLocation = {
	pixelPositionX: 3592,
	pixelPositionY: 1660,
	latitude: 61.156913,
	longitude: -150.074236
}

// Wellington
const knownLocationB: KnownLocation = {
	pixelPositionX: 42576,
	pixelPositionY: 13960,
	latitude: -41.342718,
	longitude: 174.821199
}


export const convertX = (longitude: number) => {
	return remap(
		knownLocationA.longitude,
		knownLocationB.longitude,
		knownLocationA.pixelPositionX,
		knownLocationB.pixelPositionX,
		longitude)
}

export const convertY = (latitude: number) => {
	return remap(
		knownLocationA.latitude,
		knownLocationB.latitude,
		knownLocationA.pixelPositionY,
		knownLocationB.pixelPositionY,
		latitude
	);
}