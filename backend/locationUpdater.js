

var googleGeoCodeQuerier = require('./googleGeoCodeQuerier.js');
var openDataCollecter = require('./openDataCollecter.js');

var parseWorker = require('./parseWorker.js');
var db = require('./db.js');


function updateLocation(){
    openDataCollecter.asyncCollectTaipeiCrimeMap(onGetAddresses);
    
}


function onGetAddresses(addresses){
    googleGeoCodeQuerier.asyncGetGeoCodes(addresses, onGetGeoCodes);

}

function onGetGeoCodes(geoCodes){
    
    parseWorker.updateHotSpot(geoCodes);

//        db.insertFailGeoCodeAddr(failQuery);
//        db.insertGeoCode(queryResult);

}

updateLocation();