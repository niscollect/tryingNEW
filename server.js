// const express = require('express');
// const bodyParser = require('body-parser');
// const fs= require('fs');
// const app=express();
// const path = require('path');
// const PORT = 5500;

// app.use(express.urlencoded({extended: true}));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// app.get('/', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'review.html'));
// });

// app.post('/submit-review', (req, res)=>{
//     const newReview = {
//         name: req.body.name,
//         review: req.body.review,
//         date: new Date().toISOString()
//     };
//     fs.readFile('reviews.json', 'utf8', (err, data)=>{
//         if(err){console.error(err); return res.status(500).send('Error reading reviews');}

//         const reviews= data? JSON.parse(data) : [];
//         reviews.push(newReview);

//         fs.writeFile('reviews.json', JSON.stringify(reviews, null, 2), (err)=>{
//             if(err){console.error(err); return res.status(500).send('Error saving reviews');}
//             res.send('Review submitted successfully');
//         });
//     });
// });




// // ----------------------------
// app.get('/review', (req,res)=>{
//     fs.readFile('reviews.json', 'utf8', (err,data)=>{
//         if(err){console.error(err); return res.status(500).send('Error reading reviews');}
//         res.json(JSON.parse(data));
//     })
// });
// // ----------------------------










// app.listen(PORT, ()=>{
//     console.log(`Server running on http://localhost:${PORT}`);
// });




/* --------------------------------------------------------------------- */
// const express = require('express');
// const bodyParser = require('body-parser');
// const fs= require('fs');
// const app=express();
// const path = require('path');
// const PORT = 5500;

// app.use(express.urlencoded({extended: true}));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// app.get('/', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'review.html'));
// });


// document.getElementById("submitbutton").addEventListener('click', (req, res)=>{
//     console.log("1 step closer")
//     const newReview = {
//         name: req.body.name,
//         review: req.body.review,
//         date: new Date().toISOString()
//     };
//     fs.readFile('reviews.json', 'utf8', (err, data)=>{
//         if(err){console.error(err); return res.status(500).send('Error reading reviews');}

//         const reviews= data? JSON.parse(data) : [];
//         reviews.push(newReview);

//         fs.writeFile('reviews.json', JSON.stringify(reviews, null, 2), (err)=>{
//             if(err){console.error(err); return res.status(500).send('Error saving reviews');}
//             res.send('Review submitted successfully');
//         });
//     });
// });




// // ----------------------------
// app.get('/review', (req,res)=>{
//     fs.readFile('reviews.json', 'utf8', (err,data)=>{
//         if(err){console.error(err); return res.status(500).send('Error reading reviews');}
//         res.json(JSON.parse(data));
//     })
// });
// // ----------------------------




// app.listen(PORT, ()=>{
//     console.log(`Server running on http://localhost:${PORT}`);
// });





/* ------------------try-----------------ing */
// server.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const path = require('path');

// // Initialize express app
// const app = express();

// // Middleware to parse form data
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Serve static files (like your HTML page)
// app.use(express.static('public'));

// // Route to handle form submission
// app.post('/submit-review', (req, res) => {
//     const { name, review } = req.body;

//     if (!name || !review) {
//         return res.status(400).json({ error: 'Name and review are required.' });
//     }

//     // Path to your Storage.json file
//     const storagePath = path.join(__dirname, 'reviews.json');

//     // Read the current data in Storage.json
//     fs.readFile(storagePath, 'utf8', (err, data) => {
//         if (err) {
//             return res.status(500).json({ error: 'Could not read storage file.' });
//         }

//         // Parse the JSON data from the file
//         let reviewsData = [];
//         if (data) {
//             try {
//                 reviewsData = JSON.parse(data);
//             } catch (error) {
//                 return res.status(500).json({ error: 'Invalid JSON data in storage.' });
//             }
//         }

//         // Add the new review
//         reviewsData.push({ name, review });

//         // Write the updated data back to Storage.json
//         fs.writeFile(storagePath, JSON.stringify(reviewsData, null, 2), (err) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Could not save review.' });
//             }

//             // Respond with success
//             res.status(200).json({ message: 'Review submitted successfully!' });
//         });
//     });
// });

// app.get('/', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'review.html'));
// });


// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static('public'));

// POST endpoint to handle form submission
app.post('/submit-review', (req, res) => {
    const { name, review } = req.body;
    
    // Create new review object
    const newReview = {
        name: name,
        review: review,
        date: new Date()
    };

    // Read existing reviews or create new array if file doesn't exist
    fs.readFile('Reviews.json', 'utf8', (err, data) => {
        let reviews = [];
        
        if (err) {
            // If file doesn't exist, we'll create it with a new array
            if (err.code === 'ENOENT') {
                reviews = [];
            } else {
                console.error('Error reading file:', err);
                return res.status(500).send('Error saving review');
            }
        } else {
            // Parse existing reviews if file exists
            reviews = JSON.parse(data);
        }

        reviews.push(newReview);

        // Write updated reviews back to file
        fs.writeFile('Reviews.json', JSON.stringify(reviews, null, 4), 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Error saving review');
            }
            res.status(200).send('Review saved successfully');
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

