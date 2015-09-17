// This module is not working.

var nodeUtil = require("util"),
fs = require('fs'),
_ = require('underscore');

var Entities = require('html-entities').XmlEntities;
entities = new Entities();

PDFParser = require("../node_modules/pdf2json/pdfparser");

var pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataReady", _.bind(_onPFBinDataReady, this));
pdfParser.on("pdfParser_dataError", _.bind(_onPFBinDataError, this));

//var pdfFilePath = _pdfPathBase + folderName + "/" + pdfId + ".pdf";

var pdfFilePath = './data/5724981876.pdf'

pdfParser.loadPDF(pdfFilePath);


function _onPFBinDataReady(e){
    console.log('--------------------')
//    console.log(e.PDFJS.pages.length)
//    console.log('_onPFBinDataReady', e.PDFJS.pages[0].Texts);
    
    var pages = e.PDFJS.pages;
    for (var i =0; i<pages.length; i++) {
        console.log('----------page ', i,' ----------');

        var page = pages[i];
        parseGrid(page);
//        printTextInPage(page);
    }
}

function parseGrid(page){
    var fills = page.Fills;
    var gridX = {};
    var gridY = {};
    for (var i =0; i<fills.length; i++) {
        registerWithValue(gridX, fills[i].x);
        registerWithValue(gridY, fills[i].y);
    }
    
    console.log('gridX', gridX);
    console.log('gridY', gridY);
}

function registerWithValue(table, x){
    if(x in table){
        table[x] += 1;
    } else {
        table[x] = 1;
    }
}

function printTextInPage(page){
    var texts = page.Texts;
//    console.log('page ', page.Fills);
    var x = getMinX(page);

//    console.log('minx');
    
    for (var i =0; i<texts.length; i++) {
        var text = texts[i];
        var encodedString = text.R[0].T;
        if(text.x === x){
            console.log(decodeURIComponent(encodedString), text);
        } else {
            console.log(decodeURIComponent(encodedString), text);
        }
    }
}

function getMinX(page){
    var texts = page.Texts;

    var x = 1000000;
    for (var i =0; i<texts.length; i++) {
        var text = texts[i];
        var x_ = text.x;
        
        if(x>x_) x = x_;
    }
    return x;
}

function trimLeft(){
    
}


function _onPFBinDataError(e){
    console.log('_onPFBinDataError', e);
}

// or call directly with buffer
fs.readFile(pdfFilePath, function (err, pdfBuffer){
    console.log('test')
    if (!err) {
        console.log('123');
        pdfParser.parseBuffer(pdfBuffer);
//        console.log(pdfBuffer);
    }
})
