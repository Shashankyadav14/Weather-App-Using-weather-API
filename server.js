const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request');
const argv = require('yargs').argv;

const apiKey = '58f140ce72bda1e5fbafe5aea4b8a00d';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
    res.render('index',{weather: null, error: null});
})
app.post('/',  (req, res)=>{
    let city = argv.c ||'Delhi';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    request(url, function (err, response, body) {
        if(err){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weather = JSON.parse(body)
          if(weather.main == undefined){
            res.render('index', {weather: null, error: 'Error, please try again'});
          } else {
            let weatherText = `It's ${weather.main.temp-273.15} degree celsius in ${weather.name}!`;
            res.render('index', {weather: weatherText, error: null});
          }
        }
      });    

})

app.listen(3000,()=>{
  console.log('listening on port 3000!')
})