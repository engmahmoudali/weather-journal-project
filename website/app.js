/* Global Variables */
const btn = document.getElementById('generate');
const URL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const Key = '&appid=5beb43e13dc3fa8be428191e6e50a00c';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
btn.addEventListener('click', Action);
/* Function called by event listener */
function Action () {
    let Zip = document.getElementById('zip').value;
    getData(URL, Zip, Key)
    .then((result) => {
        console.log(result);
        let feelings = document.getElementById('feelings').value;
        postData('/addData', {date: newDate, temp: result.main.temp, content: feelings});
        
    })
    .then((response) => {
        retrieveData();
    })
    .catch((err) => {
        console.error(err);
    });  
}
/* Function to GET Web API Data*/

const getData = async (url, zip, key) => {
    const res = await fetch(url + zip + key);
    return res.json();
}

/* Function to POST data */

const postData = async (url = '', data = '') => {
    await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
          },
          body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            content: data.content
          })
    }).then(response => {
        console.log(response);
    }).catch(error => {
        console.error(error);
    });
}

/* Function to GET Project Data */

const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' ' +'degrees';
    document.getElementById('content').innerHTML = allData.content;
    document.getElementById('date').innerHTML =allData.date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }