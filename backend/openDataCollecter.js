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
    
    return addMetaData(addresses);
}

function addMetaData(addresses){
    var finalData = {};
    
    finalData['info'] = {};
    finalData['info']['src'] = '臺北市政府警察局104年4-6月易發生婦幼犯罪被害地點';
    finalData['info']['url'] = 'http://data.taipei/opendata/datalist/datasetMeta?oid=985743f7-a33e-4ac1-ad2e-7ef5ffea02e2';
    
    finalData['addresses'] = addresses;
    
    return finalData;
}

module.exports = {
    asyncCollectTaipeiCrimeMap: asyncCollectTaipeiCrimeMap,
    
}

