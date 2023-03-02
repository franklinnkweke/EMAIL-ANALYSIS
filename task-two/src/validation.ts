import fs from 'fs';
import https from 'https';
import { parse } from 'csv';
import { slice } from 'lodash';
function validateEmailAddresses(inputPath: string[], outputFile: string) {
  const mailCopy: string[] = [];
  const validDomain: string[] = [];
  const validMail: string[] = [];
  let val: string = '';

  const regExp : any= /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  const readable = fs
    .createReadStream(inputPath[0])
    .pipe(parse({}))
    .on('data', (data: string) => {
      mailCopy.push(data);
    })
    .on('end', () => {
      for (let eachMail of mailCopy) {
        if (regExp.test(eachMail)) {
          validMail.push(eachMail[0]);
        }
      }
      const newResult: string[] = [];
      for (const checkVal of validMail) {
        val = checkVal.slice(checkVal.indexOf('@') + 1);

        https.get(
          `https://dns.google/resolve?name=${val}&type=A`,
          (response) => {
            let data = '';
            response.on('data', (chunk) => {
              data += chunk;
            });
            response.on('end', () => {
              const newData = JSON.parse(data);
              if (newData.Answer) {
                newResult.push(checkVal);
              }
              const output = JSON.stringify(newResult, null, ' ');
              const sysFil = fs.createWriteStream(outputFile);
              return sysFil.write(output);
            });
          },
        );
      }
    });
}
export default validateEmailAddresses;
