import pyvips
from flask import Flask, request, jsonify
import math

app = Flask(__name__)

# Anchorage
known_location_a = {
	"pixelPositionX": 3592,
	"pixelPositionY": 2866,
	"latitude": 61.156913,
	"longitude": -150.074236
}

# Wellington
known_location_b = {
	"pixelPositionX": 42576,
	"pixelPositionY": 15166,
	"latitude": -41.342718,
	"longitude": 174.821199
}

def remap(sourceFrom: float, sourceTo: float, targetFrom: float, targetTo: float, value: float):
	return targetFrom + (value - sourceFrom) * (targetTo - targetFrom) / (sourceTo - sourceFrom)

def convert_x(longitude: float):
	return remap(known_location_a["longitude"], known_location_b["longitude"], known_location_a["pixelPositionX"], known_location_b["pixelPositionX"], longitude)

def convert_y(latitude: float):
	return remap(known_location_a["latitude"], known_location_b["latitude"], known_location_a["pixelPositionY"], known_location_b["pixelPositionY"], latitude)

image = pyvips.Image.new_from_file("./World_Atlas_2015.tif", access="sequential")

# Formula from http://unihedron.com/projects/darksky/magconv.php and http://unihedron.com/projects/darksky/mpsastocdm2.pdf
def total_brightness_to_mag_arcsec2(total_brightness: float):
	return -2.5*math.log10((total_brightness/1000) / 108000)

# https://en.wikipedia.org/wiki/Bortle_scale
def sky_magnitude_to_bortle_class(sky_magnitude: float):
	values = [21.99, 21.89, 21.69, 20.49, 19.50, 18.94, 18.38]
	for i in range(len(values)):
		if(sky_magnitude > values[i]):
			return i + 1
	return 9

@app.route("/")
def index():
	latitude = request.args.get("lat", type=float)
	if(latitude == None):
		return jsonify({ "error": "Latitude missing or it is not a number" })
	longitude = request.args.get("lon", type=float)
	if(longitude == None):
		return jsonify({ "error": "Longitude missing or it is not a number" })

	pixel_x = math.floor(convert_x(longitude))
	pixel_y = math.floor(convert_y(latitude))
	
	size = 1
	area = image.crop(pixel_x - size, pixel_y - size, size*2+1, size*2+1)
	total_brightness = area.avg()

	sky_magnitude = total_brightness_to_mag_arcsec2(float(total_brightness))
	bortle_class = sky_magnitude_to_bortle_class(sky_magnitude)

	return jsonify({
		"totalBrightness": float(total_brightness), 
		"skyMagnitude": sky_magnitude,
		"bortleClass": bortle_class	
	})

if __name__ == "__main__":
    app.run()