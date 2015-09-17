var request = require('request');
//var deferred = require('deferred');

// for dev
var googleGeoCodeQuerier = require('./googleGeoCodeQuerier.js');


function asyncCollectTaipeiCrimeMap(cb){
    request({
    method: 'GET',
    uri: 'http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=efe5c923-fa09-4d55-896e-877c553f04e0',
        
    }, function (e,r,b){
        if (e || r.statusCode === 500) {
            console.log('query geo err ', e);
            console.log('query geo err response ', r.statusCode);
            
            return;
        }
        
        var data = JSON.parse(b);
        var results = data.result.results;
        
        var addresses = parseAddressFromData(results);
        
        console.log(addresses);
            
        cb(addresses);
    })
}

function parseAddressFromData(data){
    var addresses = [];
    
    for (var i=0; i<data.length; i++){
        var area = data[i].District;
        var detail = data[i].Location;

        
        var all = area + detail;
        
        addresses.push(all);
    }
    
    return addresses;
}


module.exports = {
    asyncCollectTaipeiCrimeMap: asyncCollectTaipeiCrimeMap,
    
}

