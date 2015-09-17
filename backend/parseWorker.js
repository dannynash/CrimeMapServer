var Parse = require('parse/node').Parse;
var config = require('./config.js');

var appKey = config.getParseAppKey();
var jsKey = config.getParseJsKey();

Parse.initialize(appKey, jsKey);

//var query = new Parse.Query('HotSpot');
//
//query.find({
//success: function(users) {
//    for (var i = 0; i < users.length; ++i) {
//        console.log(users[i].get('address'));
//        console.log(users[i].get('GeoPoint'));
//        
//    }
//}
//});


function updateHotSpot(spots){
    for (var i=0; i<spots.length; i++){
        updateHotSpotToServer(spots[i]);
    }
}

function updateHotSpotToServer(spot){
    var lat = spot.geoCode.lat;
    var lng = spot.geoCode.lng;
    var address = spot.addr;
    
    var HotSpot = Parse.Object.extend("HotSpot");
    var hotSpot = new HotSpot();
    
    var point = new Parse.GeoPoint({latitude: lat, longitude: lng});
    
    hotSpot.set("address", address);
    hotSpot.set("GeoPoint", point);
    
    hotSpot.save(null, {
    success: function(hotSpot) {
        
    }
    });

}


module.exports = {
    updateHotSpot: updateHotSpot,
    
}


