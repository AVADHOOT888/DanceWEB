const express=require('express');
const app = express();
const path=require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
// Define mongoose schema..
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    phone: String,
    email: String,
    address: String
    
  });
  const Contact = mongoose.model('Contact', contactSchema);


app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('Contact.pug', params);
})

app.get('/about', (req, res)=>{
    
    const params = {}
    res.status(200).render('About.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
})
})
app.get('/services', (req, res)=>{
    
    const params = {}
    res.status(200).render('Services.pug', params);
})

// START THE SERVER
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));
