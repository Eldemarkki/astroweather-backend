// Source: https://djlorenz.github.io/astronomy/lp2020/colors.html

export const getIntensityIndexForColor = (colorHex: number) => {
	switch (colorHex) {
		case 0x000000FF:
			return 0
		case 0x232323FF:
			return 1
		case 0x464646FF:
			return 2
		case 0x012584FF:
			return 3
		case 0x013edcFF:
			return 4
		case 0x316a1bFF:
			return 5
		case 0x53b12eFF:
			return 6
		case 0x908c2eFF:
			return 7
		case 0xcec842FF:
			return 8
		case 0xa25827FF:
			return 9
		case 0xd87635FF:
			return 10
		case 0x9a2421FF:
			return 11
		case 0xed3833FF:
			return 12
		case 0xbfbfbfFF:
			return 13
		case 0xFFFFFFFF:
			return 14
		default:
			return -1
	}
}