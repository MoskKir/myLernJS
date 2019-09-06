const express = require ('express');
const router = express.Router();

// Import the models
const Travels = require('../models/Travels');
const Testimonials = require('../models/Testimonials');

module.exports = function() {
    // Homepage url
    router.get('/', (req, res) => {

        const promises = [];

        promises.push( Travels.findAll({limit: 3}) );
        promises.push( Testimonials.findAll({limit: 3}) );

        // Pass to the promise
        const result = Promise.all(promises);

        result.then(result => res.render('index', {
                    pageTitle : 'Home',
                    className : 'home',
                    travels : result[0],
                    testimonials : result[1]
                }))
                .catch(error => console.log(error));
    });

    // About us url
    router.get('/about', (req, res) => {
        res.render('about', {
            pageTitle: 'About Us'
        });
    });

    // Travels url
    router.get('/travels', (req, res) => {
        
        Travels.findAll()
            .then(travels => {
                res.render('travels', {
                    pageTitle: 'Upcoming Travels',
                    travels
                });
            });
    });

    // Travel url
    router.get('/travels/:id', (req, res) => {
        Travels.findByPk(req.params.id)
            .then(travel => res.render('travel', {
                travel
            }))
    });

    // Testimonials url
    router.get('/testimonials', (req, res) => {
        Testimonials.findAll()
            .then(testimonials => res.render('testimonials', {
                pageTitle: 'Testimonials',
                testimonials
            }));
    });
    // Handles form submission with POST
    router.post('/testimonials', (req, res) => {
        // console.log(req.body);
        let {name, email, message} = req.body;

        // Validate the form
        let errors = [];

        if(!name) {
            errors.push({'message': 'Add Your Name'})
        }
        if(!email) {
            errors.push({'message': 'Add Your Email'})
        }
        if(!message) {
            errors.push({'message': 'Add Your Message'})
        }

        console.log(errors);

        // Check if there're some errors
        if (errors.length > 0) {
            // We have some errors, display the warning to the view
            Testimonials.findAll()
                .then(testimonials => res.render('testimonials', {
                    pageTitle: 'Testimonials',
                    errors,
                    name,
                    email,
                    message,
                    testimonials
                }));      
            
            
            
        } else {
            // Save to the database
            Testimonials.create({
                name,
                email,
                message
            })
            .then(() => {res.redirect('/testimonials')})
            .catch(error => console.log(error))
        }

    })

    return router;
}