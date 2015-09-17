var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

function insertGeoCode(data){
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('insertGeoCode err, ', err);
        }
        insertGeoCodeImpl(db, data, function() {
            db.close();
        });
    });

}
function insertGeoCodeImpl(db, data, callback){
    var collection = db.collection('GeoCode');
    collection.insert(data, function(err, result) {
        if (err) {
            console.log('insertGeoCodeImpl err, ', err);
        }
        callback(result);
    });
}

function insertFailGeoCodeAddr(data){
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('insertFailGeoCodeAddr err, ', err);
        }
        insertFailGeoCodeAddrImpl(db, data, function() {
            db.close();
        });
    });
    
}
function insertFailGeoCodeAddrImpl(db, data, callback){
    var collection = db.collection('FailedGeoCode');
    collection.insert(data, function(err, result) {
        if (err) {
            console.log('insertFailGeoCodeAddrImpl err, ', err);
        }
        callback(result);
    });
}

module.exports = {
    insertGeoCode: insertGeoCode,
    insertFailGeoCodeAddr: insertFailGeoCodeAddr,
    
}
