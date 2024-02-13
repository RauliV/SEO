const { rejects } = require('assert');
const fs = require('fs');
const { ExploreTrendRequest } = require('g-trends');
const { resolve } = require('path');
const util = require('util')

const SEPARATOR = ',';
const OUTPUT_FILE = "results.txt";
const INPUT_FILE = "wordlist.txt";
const FAIL_FILE = "failed.txt";
const MAX_SETS = 3;

const explorer = new ExploreTrendRequest()

let resultList = [];
let partList = [];
let sets = 0;

async function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

// Append a line to file (create if not exists)

function addToFile(dataToAppend, filename){

  // Check if the file exists
  fs.access(filename, fs.constants.F_OK, (err) => {
    if (err) {
      // File doesn't exist, create the file and append the data
      fs.writeFile(filename, dataToAppend, (createErr) => {
        if (createErr) throw createErr;
        console.log(`${filename} created and data appended.`);
      });
    } else {
      // File exists, append the data
      fs.appendFile(filename, dataToAppend, (appendErr) => {
        if (appendErr) throw appendErr;
        console.log(`Data appended to ${filename}.`);
      });
    }
  });

}

// Read search terms from file
const allContents = fs.readFileSync(INPUT_FILE,  { encoding: 'utf8', flag: 'r' });
  allContents.split(SEPARATOR).forEach((line) => {
  resultList.push(line);
  });



// Fetch results from Google in csv -file
async function FetchResults(explore){
      sets ++;
      console.log(sets);
      resultList.length > 4 ? count = 5 : count = resultList.length;
      partList = resultList.splice(resultList.length-count ,count); 
      
      // Override exsisting input file (popped 5 last ones out)
      //addToFile(resultList.toString(), INPUT_FILE)
      fs.writeFile(INPUT_FILE, resultList.toString(), (err) => {})
      console.log('start sleep')
      await sleep(6000)
      console.log('stop sleep')

      if (count === 5){
      explore.addKeyword(partList[0])
      .compare(partList[1])
      .compare(partList[2])
      .compare(partList[3])
      .compare(partList[4])
      .download().then(csv => {
        console.log('[✔] Done!')

        // Cut the crusts 
        csv = csv.slice(1)
        let turnCsv = csv[0].map((_, colIndex) => csv.map(row => row[colIndex]));
        let trimCsv = turnCsv.slice(1)    

        //Count each column
        let i = 0  
        let sum = 0;
        trimCsv.forEach(e => {
          e.forEach(f => {
            sum = sum + parseInt(f);
          })
          console.log(`${partList[i]}\t\t${sum} `)
          addToFile(`${sum}\t${partList[i]}\n`, OUTPUT_FILE)
          sum = 0;
          i++; 
        })

        // Recurse run it again
        if (sets <= MAX_SETS){
          FetchResults(new ExploreTrendRequest())
        }
      })
      .catch( error => {

        console.log('[!] Failed:')
        partList.forEach(element => {
          console.log(element)      
        });
        console.log(error)
        addToFile(partList.toString() + SEPARATOR, FAIL_FILE)

        //fs.appendFile(FAIL_FILE, partList.toString() + SEPARATOR, (err) => {})
        console.log(`(Fetch from Google trends failed)\nWriting failed words to ${FAIL_FILE}`);
    })
  } else {
    console.log('Not enough (>= 5) words')
  }

}

FetchResults(explorer);



