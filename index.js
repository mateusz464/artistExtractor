const prompt = require('prompt-sync')();
const fs = require('fs');
const { json } = require('stream/consumers');

function createFile(name){
    if(!fs.existsSync(`./${name}.json`)){
        fs.writeFile(`${name}.json`, "[", (err) => {
        })
    }
}

function writeToFile(file, content){
    fs.appendFile(`${file}.json`, JSON.stringify(content) + ",", (err) => {
    });
}

function jsonLogic(data, name){

    createFile(name);

    const objLength = Object.keys(data).length;
    for(let i = 0; i < objLength; i++){

        let gotName = data[i]["master_metadata_album_artist_name"];

        if (gotName != null){
            let ucGotName = gotName.toUpperCase();
            let ucName = name.toUpperCase();

            if(ucGotName === ucName){
                writeToFile(name, data[i]);
            }
        }
    }
}

function main(){
    // Gets JSON file
    let jsonFile;

    // Gets artists name
    const artistName = prompt("Please enter the artist's name: ");

    while(jsonFile != "-1"){
        jsonFile = prompt("Please enter the name of the JSON file (Enter -1 once you have entered all the files): ");

        if (jsonFile === "-1"){
            fs.appendFile(`${artistName}.json`, "]", (err) => {
            });
            return;
        }


        // Adds JSON at the end of the string if it does not already have one
        if(!jsonFile.includes(".json")){
            jsonFile += ".json";
        }

        const data = require(`./${jsonFile}`);
        jsonLogic(data, artistName);
    }
}
main();