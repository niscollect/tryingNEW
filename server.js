const express = require('express');
const bodyParser = require('body-parser');
const fs= require('fs');
const app=express();
const path = require('path');
const PORT = 5500;

app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'review.html'));
});

app.post('/submit-review', (req, res)=>{
    const newReview = {
        name: req.body.name,
        review: req.body.review,
        date: new Date().toISOString()
    };
    fs.readFile('reviews.json', 'utf8', (err, data)=>{
        if(err){console.error(err); return res.status(500).send('Error reading reviews');}

        const reviews= data? JSON.parse(data) : [];
        reviews.push(newReview);

        fs.writeFile('reviews.json', JSON.stringify(reviews, null, 2), (err)=>{
            if(err){console.error(err); return res.status(500).send('Error saving reviews');}
            res.send('Review submitted successfully');
        });
    });
});




// ----------------------------
app.get('/review', (req,res)=>{
    fs.readFile('reviews.json', 'utf8', (err,data)=>{
        if(err){console.error(err); return res.status(500).send('Error reading reviews');}
        res.json(JSON.parse(data));
    })
});
// ----------------------------










app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});

