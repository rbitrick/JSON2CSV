const submitButton = document.getElementById("submitButton")
const jsonInput = document.getElementById("jsonInput")
let fileName = `JSONTOCSV ${new Date().toLocaleDateString("en-US").replaceAll("/", "-")}.csv`;

submitButton.addEventListener("click", () => {
    const value = jsonInput.value;
    let parsed;
    let returnedCSV;

    try{
        parsed = JSON.parse(value)
    }catch(e){
        console.log("Invalid JSON")
        return;
    }

    try{
        returnedCSV = ConvertToCSV(parsed)
        console.log(returnedCSV)
    }catch(e){
        console.log(`Failed conversion: ${e}`)
        return;
    }

    let element = document.createElement('a');
    element.setAttribute('href',
        'data:text/plain;charset=utf-8,'
        + encodeURIComponent(returnedCSV));
    element.setAttribute('download',fileName);
    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);


})

function ConvertToCSV(json){
    let csv = ''

    if (!Array.isArray(json)){
        json = [json]
    }

    
    
    //extract headers - found on https://www.geeksforgeeks.org/javascript/how-to-convert-json-object-to-csv-in-javascript/
    const headers = Object.keys(json[0])
    csv += headers.join(',') + '\n'; 

    //extract values - found on https://www.geeksforgeeks.org/javascript/how-to-convert-json-object-to-csv-in-javascript/
    json.forEach(obj => {
        const values = headers.map(header => obj[header]);
        csv += values.join(',') + '\n'
    });

    return csv
}