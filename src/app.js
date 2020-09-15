const path = require('path')
const express = require('express')
const { response } = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
console.log(__dirname)
//console.log(path.join(__dirname,'../public'))

const app = express()
const publicDirPath = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../views/partials')
hbs.registerPartials(partialsPath)


app.set('view engine','hbs')
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{

    res.render('index',{
        title:"Weather",
        name:"Britta",
        message:"This is for weather forecast."
    })
})

app.get('/about',(req,res)=>{
   res.render('about',{
       title: 'About',
       name: 'Britta'
   })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { lat, lon, loc } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(lat, lon, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                loc,
                address: req.query.address
            })
        })
    })
})
app.get('/products',(req,res)=>{
if(!req.query.search){
   return res.send({
        error: "You must provide a search term."
    })
}
   res.send({
       products:[]
   })
})
app.get('/help',(req,res)=>{

    res.render('help',{
        title:"Help",
        message: "Welcome to Ooty",
        name: "Britta"
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: "Page Not Found",
        message: "Help article Not Found",
        name:"Britta"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: "Page Not Found",
        message: "Page Not Found",
        name:"Britta"
    })
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})