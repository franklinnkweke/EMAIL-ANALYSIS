
import fs from 'fs';
import { parse } from 'csv';
/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */
function analyseFiles(inputPaths: string[], outputPath: string) {
  let mailCopy: string[] = [];
  let validDomain: string[] = [];
  interface Output{
    "valid-domains": string[],
    "totalEmailsParsed": number,
    "totalValidEmails": number,
    "categories":{[key:string]:number}
  }
  let obj:{[key:string]:number} = {};
  let regExp: any = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  const readable = fs
    .createReadStream(inputPaths[0])
    .pipe(parse({}))
    .on('data', (data: string) => {
      mailCopy.push(data);
      
      
    })
    .on('end', () => {
      
      for (let eachMail of mailCopy) {
        
        if (regExp.test(eachMail)) {
          console.log(eachMail)
          validDomain.push(eachMail[0].substring(eachMail[0].lastIndexOf('@')+1));
        }
      }
      
      let totalValidEmails = 0 
      for (let i = 0; i < validDomain.length; i++) {
        if (obj.hasOwnProperty(validDomain[i])) {
          totalValidEmails += obj[validDomain[i]]
          obj[validDomain[i]] += 1;
          
        } else {
          obj[validDomain[i]] = 1;
          totalValidEmails += obj[validDomain[i]]
        }
      }
      console.log(totalValidEmails)
      console.log(obj);

      const result:Output ={
        "valid-domains" :[...new Set(validDomain)],
        "totalEmailsParsed":mailCopy.length,
        "totalValidEmails":totalValidEmails-1,
        "categories": obj
      }
      const output = JSON.stringify(result,null, ' ')
      const sysFil = fs.createWriteStream(outputPath)
      return sysFil.write(output)
    });
   
  
  


}
//console.log(analyseFiles(['./fixtures/inputs/small-sample.csv'], ''));
export default analyseFiles;