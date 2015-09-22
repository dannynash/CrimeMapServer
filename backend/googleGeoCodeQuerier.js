
var request = require('request');
var config = require('./config.js');

var serverKey = config.getGeoCodeServerKey();

var queryResult = [];
var failQuery = [];

var queryNumForEachInterval = 10;
var timeInterval = 1100;
var queryIndex;
var metaData;
var addresses;

var callback;
/* Google geocode free trial limits the query number and rate,
   2,500 free queries per day
   10 query per second, per user
 */

function asyncGetGeoCodes(data, cb){
    console.log('--- start google geo code ---');
    console.log('google geo code...');

    clear();
    
    if (data){
        metaData = data.info;
        addresses = data.addresses;
        
    } else {
        console.log('data format error');
        return
    }
    
    callback = cb;
    queryEachInteval();
}

function clear(){
    geoCode = [];
    failQuery = [];
    queryIndex = 0;
    queryResponseCount = 0;
    callback = null;
}

function queryEachInteval(){
    var count = 0;
    for (var i=queryIndex; i<addresses.length && count<queryNumForEachInterval; i++){
        query(addresses[i]);
        queryIndex++;
        count++;
    }
    
    onQueryEachTimeEnd();
}

function onQueryEachTimeEnd(){
    if (queryIndex < addresses.length){
        setTimeout(queryEachInteval, timeInterval);
    } else {
        console.log('on query end')
    }
}

var queryResponseCount;

function query(address){
    var uri = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key='+ serverKey;
    
    request({
    method: 'GET',
    uri: uri,
        
    }, function (e,r,b){
        queryResponseCount++;
        
        if (e || r.statusCode === 500) {
            console.log('query geo err ', e);
            console.log('query geo err response ', r);
        }
        
        onQueryResponse(b, address);
        onQueryResponseEnd();
    })
}

function onQueryResponse(b, address){
    var data = JSON.parse(b);
    if (data.results[0]){
        var geoCode = data.results[0].geometry.location;
        
        queryResult.push({'addr':address,
                         'geoCode':geoCode,
                         'src':metaData.src,
                         'url':metaData.url});
        
    } else {
        failQuery.push(address);
    }
}

function onQueryResponseEnd(){
    if (queryResponseCount === addresses.length){
        console.log('--- google geo code end ---');

        console.log('onQueryResponseEnd');
        console.log('--------- success ', queryResult.length, ' ---------');
        console.log(queryResult);
        console.log('--------- fail ', failQuery.length, ' ---------');
        console.log(failQuery);

        if (callback){
            callback(queryResult);
        }
    }
}

function GoogleGeoCoding () {
    var self = this;
    this.getGeoCodes = getGeoCodes;
}


module.exports = {
    asyncGetGeoCodes: asyncGetGeoCodes,

    
}

