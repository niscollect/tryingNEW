async function loadReviews() {
    try {
        const response = await fetch('./reviews.json');
        const reviews = await response.json();
        const reviewsDisplay = document.getElementById('reviewsDisplay');
        reviewsDisplay.innerHTML = '';

        reviews.forEach( r => {
            const reviewBox = document.createElement('div');
            reviewBox.className = 'successfulReview';
            reviewBox.innerHTML= `           
            <strong>${r.name}</strong>
            <p>${r.review}</p>
            `;
            reviewsDisplay.appendChild(reviewBox);
        });
    } catch (err) {
        console.error('Error loading reviews:', err);
        document.getElementById('reviewsDisplay').innerHTML = 'Error loading reviews.';
    }    
}
// //---------------------------------------------------------------
// document.getElementById('addreview').addEventListener('click', ()=>{loadserverjs();});
// function loadserverjs()
// {

//     const scripts = document.createElement("script");
//     scripts.src = "server.js"; // Path to `two.js`
//     scripts.onload = () => console.log("two.js loaded and executed.");
//     document.body.appendChild(scripts);
// }
// // ---------------------------------------------------------------

document.addEventListener('DOMContentLoaded', loadReviews);

// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const app = express();
// const path = require('path');
// const PORT = 5500;

// app.use(express.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// // Serve static files from the current directory
// app.use(express.static(__dirname));

// // Serve index.html at root
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Your existing review submission code
// app.post('/submit-review', (req, res) => {
//     const newReview = {
//         name: req.body.name,
//         review: req.body.review,
//         date: new Date().toISOString()
//     };
    
//     fs.readFile('reviews.json', 'utf8', (err, data) => {
//         let reviews = [];
        
//         if(err) {
//             if(err.code === 'ENOENT') {
//                 console.log('Creating new reviews.json file');
//             } else {
//                 console.error(err); 
//                 return res.status(500).send('Error reading reviews');
//             }
//         } else {
//             try {
//                 reviews = JSON.parse(data);
//             } catch(parseErr) {
//                 console.error(parseErr);
//                 return res.status(500).send('Error parsing reviews');
//             }
//         }
        
//         reviews.push(newReview);

//         fs.writeFile('reviews.json', JSON.stringify(reviews, null, 2), (err) => {
//             if(err) {
//                 console.error(err); 
//                 return res.status(500).send('Error saving reviews');
//             }
//             // Redirect back to review page after submission
//             res.redirect('/review.html');
//         });
//     });
// });

// app.get('/review', (req, res) => {
//     fs.readFile('reviews.json', 'utf8', (err, data) => {
//         if(err) {
//             console.error(err); 
//             return res.status(500).send('Error reading reviews');
//         }
//         res.json(JSON.parse(data));
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });
