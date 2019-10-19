'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key.
// We should read it from a .env file but it kept intentionally over here to ease of testing
const apiKey = 'hkcug0OqwVTZxUnSHxVlltIUywqHW6ntU5Vy68S_nTaKlui6_EeM261qCZZYmzmQBrs92R5H0rVIVCWtujxmOxlBLal0oLJm_VM1ctsQcJhG5o_VJpv0_eBuRKSoXXYx';

// Set the searchable parameter
const searchRequest = {
  categories:'icecream', // As we are looking for the Icecreame Shop
  location: 'Alpharetta', // Location That we have to search for
  radius: 5000, // Has to given to list sprcific to city Alpharetta
  sort_by: 'rating', // As we are looking for top
  limit: 5 // No of records need to be listed
};
// Using The yelp-fusion API Client (https://github.com/tonybadguy/yelp-fusion)
const client = yelp.client(apiKey);

// Will contain all the requested Promise calls
let requestPromises = [];

// Searching for business
client.search(searchRequest).then(response => {  
    requestPromises = response.jsonBody.businesses.map(entity => {
        return gettingReview(entity)
    });
    return Promise.all(requestPromises).catch(e => { 
        console.log(e)
    }); // Ensuring that all the Async call resolved with all the information
}).then(completeResponse => {
    // Lets print in console
    let i = 1;
    completeResponse.forEach(element => {
        console.log("------------------------------------------");
        console.log("# "+i++, element.name, '('+element.rating+')'); // Rating not asked but still kept
        console.log("------------------------------------------"); // With heading for better presentation
        console.log("Address: ", element.location.address1, ', ',  element.location.city);
        if (Array.isArray(element.reviews)) {
            console.log("Review By: ", element.reviews[0].user.name);
            console.log("Review: ", element.reviews[0].text);  
        } else console.log("No Review Found");
        console.log("");
    });
}).catch(e => {
  console.log(e);
});

// Getting the Reviews for each Business
const gettingReview = (business => {
    return client.reviews(business.id).then(response => {
        business.reviews = response.jsonBody.reviews;
        return business;
    }).catch(e => {
        console.log(e);
    });
});