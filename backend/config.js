var config = {'googleGeoCodeServerKey':'your googleGeoCodeServerKey',
            'parseAppKey':'your parseAppKey',
            'parseJsKey':'your parseJsKey',
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
