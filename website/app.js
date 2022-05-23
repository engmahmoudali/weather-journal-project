/* Global Variables */
const btn = document.getElementById('generate');
const URL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const Key = '&appid=5beb43e13dc3fa8be428191e6e50a00c';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
btn.addEventListener('click', perAction);
/* Function called by event listener */
const perAction = () => {
    let Zip = document.getElementById('zip').value;
    getData(URL, Zip, Key)
    .then((result) => {
        console.log(result)
        let feelings = document.getElementById('feelings').value;
        postData('/addData', {date: newDate, temp: result.main.temp, content: feelings});
        
    })
    .then((response) => {
        allData();
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

const allData = async () => {
        const res = await fetch('/all');
        const response = await res.json()
        document.getElementById('date').innerHTML = response.date;
        document.getElementById('temp').innerHTML = response.temp;
        document.getElementById('content').innerHTML = response.content;
        console.log(response);
}