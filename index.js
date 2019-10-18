'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key.
const apiKey = 'hkcug0OqwVTZxUnSHxVlltIUywqHW6ntU5Vy68S_nTaKlui6_EeM261qCZZYmzmQBrs92R5H0rVIVCWtujxmOxlBLal0oLJm_VM1ctsQcJhG5o_VJpv0_eBuRKSoXXYx';

// Set the searchable parameter
const searchRequest = {
  categories:'icecream', // As we are looking for the Icecreame Shop
  location: 'Alpharetta', // Location That we have to search for
  radius: 5000, // Has to given as the Location does not enforce by default
  sort_by: 'rating', // As we are looking for top
  limit: 5 // No of records need to be listed
};

const client = yelp.client(apiKey);

// Will contain all the requested Promise calls
let requestPromises = [];

// Searching for business
client.search(searchRequest).then(response => {  
    requestPromises = response.jsonBody.businesses.map(entity => {
        return gettingReview(entity)
    });
    return Promise.all(requestPromises);
}).then(completeResponse => {
    // Lets print in console
    let i=1;
    completeResponse.forEach(element => {
        console.log("------------------------------------------");
        console.log("# "+i++, element.name, '('+element.rating+')');
        console.log("------------------------------------------");
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
        //console.log(response.jsonBody);
        business.reviews = response.jsonBody.reviews;
        return business;
    }).catch(e => {
        console.log(e);
    });
});