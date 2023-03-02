"use strict";
exports.__esModule = true;
//import fs from 'fs';
var fs = require("fs");
var csv_1 = require("csv");
/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */
function analyseFiles(inputPaths, outputPath) {
    var mailCopy = [];
    var validDomain = [];
    var regExp = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    var readable = fs.createReadStream(inputPaths[0]).pipe((0, csv_1.parse)({})).on('data', function (data) {
        mailCopy.push(data);
        console.log(mailCopy); // this is the array of arrays
    })
        .on('end', function () {
        //console.log(mailCopy);
        for (var _i = 0, mailCopy_1 = mailCopy; _i < mailCopy_1.length; _i++) {
            var eachMail = mailCopy_1[_i];
            console.log(eachMail);
            // !validDomain.includes(eachMail.join('').split('@')[1]) &&
            if (regExp.test(eachMail)) {
                //validDomain.push(eachMail.join('').split('@')[1]);
            }
        }
        //console.log([...new Set(validDomain)]);
        for (var i = 0; i < validDomain.length; i++) {
            if (obj.hasOwnProperty(validDomain[i])) {
                obj[validDomain[i]] += 1;
            }
            else {
                obj[validDomain[i]] = 1;
            }
        }
        console.log(obj);
    });
    var obj = {};
    console.log('Complete the implementation in src/analysis.ts');
}
exports["default"] = analyseFiles;
