var config = {'googleGeoCodeServerKey':'AIzaSyBLQFBdB97o80G5KyOhnfn-D39clxtMQKg',
            'parseAppKey':'MsuT7y640Sg6YbztFMH5X7mo6AuTsMhAR0PzrUo9',
            'parseJsKey':'PyA1KWzt8bTA0k0q3hezPnyOD7pUAjXbJmYnbBUk',
};

module.exports = {
    
    getGeoCodeServerKey: function() {
        return config.googleGeoCodeServerKey;
    },
    
    getParseAppKey: function(){
        return config.parseAppKey;
    },
    getParseJsKey: function(){
        return config.parseJsKey;
    },
    
}
