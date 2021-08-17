const express=require('express');
const hbs=require('hbs');

const geocode = require('./utils/geocode');
const forecast=require('./utils/forecast')

const app=express();
const port=process.env.PORT || 5000;

app.use(express.static(__dirname+'/../public'))

app.set('view engine','hbs');
app.set('views',__dirname+'/../templates/views')
hbs.registerPartials(__dirname+'/../templates/partial')



 app.get('/weather',(req,res)=>{
    const {address}=req.query;
    if (!address) {
        res.status(200).render('index',{
            error:"Please provide valid address"
        })
    } else {
        geocode(address, (error, { latitude, longitude, location }={}) => {
            if (error) {
                res.render('index',{
                    error
                })
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    res.render('index',{
                        error
                    })
                }
                res.render('index',{
                    location,forecastData
                })
            })
        })
    }
 })

 app.get('*',(req,res)=>{
     res.status(404).send('Page Not Found')
 })

app.listen(port,()=>{
    console.log(port+" is activated");
});