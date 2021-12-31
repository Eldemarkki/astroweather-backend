// Source: https://djlorenz.github.io/astronomy/lp2020/colors.html

interface Range {
	min: number,
	max: number
}

interface LightPollutionValue {
	hexColorRGBA: number
	index: number,
	bortleClass?: number,
	magnitudeRange?: Range
}

const isRange = (obj: any): obj is Range => {
	return "min" in obj && "max" in obj;
}

export const getBortleClass = (magnitude: number | Range): number => {
	const values = [21.99, 21.89, 21.69, 20.49, 19.50, 18.94, 18.38]
	const mag = isRange(magnitude) ? (magnitude.min + magnitude.max) / 2 : magnitude;

	for (let i = 0; i < values.length; i++) {
		if (mag > values[i]) return i + 1
	}
	return 9;
}

export const getIntensityIndexForColor = (colorHex: number): number => {
	switch (colorHex) {
		case 0x000000FF: return 0
		case 0x232323FF: return 1
		case 0x464646FF: return 2
		case 0x012584FF: return 3
		case 0x013edcFF: return 4
		case 0x316a1bFF: return 5
		case 0x53b12eFF: return 6
		case 0x908c2eFF: return 7
		case 0xcec842FF: return 8
		case 0xa25827FF: return 9
		case 0xd87635FF: return 10
		case 0x9a2421FF: return 11
		case 0xed3833FF: return 12
		case 0xbfbfbfFF: return 13
		case 0xFFFFFFFF: return 14
		default: return -1
	}
}

export const getMagnitudeRangeForIndex = (index: number): Range | undefined => {
	if (index < 0 || index > 14) return undefined
	const values = [22.00, 21.99, 21.93, 21.89, 21.81, 21.69, 21.51, 21.25, 20.91, 20.49, 20.02, 19.50, 18.95, 18.38, 17.80, 0]
	return {
		min: values[index + 1],
		max: values[index]
	}
}

export const getLightPollution = (colorHex: number): LightPollutionValue => {
	const index = getIntensityIndexForColor(colorHex);
	if (index < 0 || index > 14) return {
		hexColorRGBA: colorHex,
		index
	}

	const magnitudeRange = getMagnitudeRangeForIndex(index);
	const bortleClass = getBortleClass(magnitudeRange!);

	return {
		hexColorRGBA: colorHex,
		index,
		magnitudeRange,
		bortleClass
	}
}