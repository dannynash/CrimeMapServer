# CrimeMapServer
This project collect the crime spots address from open data server.
http://data.taipei/opendata/datalist/datasetMeta?oid=985743f7-a33e-4ac1-ad2e-7ef5ffea02e2

Then translates the address by google map, and save the address and geo point information in Parse.
We will have a client app on iOS soon.

# Install

Install node.js 

$ git clone https://github.com/dannynash/CrimeMapServer.git


# Register service key

Google Maps Geocoding 

https://developers.google.com/maps/documentation/geocoding/intro

Parse 

https://www.parse.com/signup

Get server key in Google Maps Geocoding, and replace 'your googleGeoCodeServerKey' with your new key in backend/config.js.

Get server key and js key in Parse, and replace 'your parseAppKey' and 'your parseJsKey' in backend/config.js.


# Run

$ node backend/locationUpdater.js 

# TODO
Some addresses can't not be translated directly.
Update the data periodically, merge the data and update to cloud server.
