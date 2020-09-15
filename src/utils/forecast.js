const request = require('request')
const forecast = (lat,lon,callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=8c4f346e38182cf33b6c6b5b14ed2e43&query='+lat+','+lon;
    request({url:url,json:true},(error,response)=>{

        if(error){
            callback(`Unable to connect`,undefined)
        }
        else if(response.body.error){
            callback(`Unable to find location`,undefined)
        }
        else{
            callback(undefined,`Location is ${response.body.location.name}. ${response.body.current.weather_descriptions}. It is currently ${response.body.current.temperature} degrees out. There is ${response.body.current.precip}% chance of rain.`)
        }
    })
}
module.exports = forecast