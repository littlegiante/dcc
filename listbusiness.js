'use strict';

// Place holder for Yelp Fusion's API Key.
// We should read it from a .env file but it kept intentionally over here to ease of testing
const API_KEY = 'hkcug0OqwVTZxUnSHxVlltIUywqHW6ntU5Vy68S_nTaKlui6_EeM261qCZZYmzmQBrs92R5H0rVIVCWtujxmOxlBLal0oLJm_VM1ctsQcJhG5o_VJpv0_eBuRKSoXXYx';

const Yelp = require('yelp-fusion');

class ListBusiness {

    
    _searchParam = {};
    // Lets create two sepearte container 
    _businessList = []; // hold business list
    _reviews = {}; // hold review with business id

    // Let construct the object
    constructor(obj) { 
        // Setting the searchable parameter
        this._searchParam = {
            categories : (obj.categories)? obj.categories : null,
            location : (obj.location)? obj.location : null,
            radius : (obj.radius)? obj.radius : null,
            sort_by : (obj.sort_by)? obj.sort_by : null,
            limit : (obj.limit)? obj.limit : 10
        }

        // As per the API the limit can't be more than 50
        if (this._searchParam.limit &&  this._searchParam.limit > 50) {
            this._searchParam.limit = 50;
        }

        // Setting up the client
        this._client = Yelp.client(API_KEY);
        
    }

    // Lets Search it with async-await manner
    showBusiness = async () => {
        let businessList = await this._client.search(this._searchParam).catch(e => {console.log(e)});
        if (businessList.jsonBody.hasOwnProperty('businesses')) {
            this._businessList = businessList.jsonBody.businesses; 
        } else {
            return {error:"Business List not found"};
        }
       // Let populate the review function
        for (let i=0; i<this._businessList.length; i++) {
            await this._populateReview(this._businessList[i].id);    
        }
        //console.log(this.htmlRender());
        return this._htmlRender();
        
    }

    // Create a minimum html presentation with the Bootstrap 3 CSS from CDN
    _htmlRender = () => {
        // Creating Simple HTML part
        let part = `
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
        </head>
        <body>
            <div class="jumbotron">
                <div class="container">
                <h1>Love Ice Cream!</h1>
                <p>Top five Ice Cream shops in Alpharetta based on rating and review.</p>
                </div>
            </div>
            <div class="container-fluid">
        `;
        // Let fill up with data
        this._businessList.forEach(element => {
            part += `
            <div class="container-fluid">
                <div class="panel panel-success">
                    <div class="panel-heading">
                        <h3 class="panel-title"> `+element.name+` <span class="label label-info">`+element.rating+` (`+element.review_count+`)) </span></h3>
                    </div>
                    <ul class="list-group">
                        <li class="list-group-item">Address: `+element.location.address1+`, `+element.location.city+`</li>
            `;
            if (Array.isArray(this._reviews[element.id])) {
                part += `
                        <li class="list-group-item">Review By:  `+this._reviews[element.id][0].user.name+`</li>
                        <li class="list-group-item">Review:  `+this._reviews[element.id][0].text+`+</li>
                `;
            } else {
                part += `<li class="list-group-item">Review not found</li>`;
            }
            part += `
                    </ul>
                </div>
            </div>
            `;
        });
        return part+'</div></body></html>';  // return the final HTML
    }

    // Populate the review as per the business ID provided
    _populateReview = async (id) => {
        let reviews = await this._client.reviews(id);
        if (reviews.jsonBody.hasOwnProperty('reviews')) {
            this._reviews[id] = reviews.jsonBody.reviews;
        } else {
            this._reviews[id] = null;
        }
    };
}

const BusinessList = (param) => {
    return new ListBusiness(param);
};

module.exports = {list: BusinessList};
