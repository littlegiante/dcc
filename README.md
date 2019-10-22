# Developer Code Challenge (JavaScript)

This script was written to perform a search of top five ice cream shops in Alpharetta with review. As per instruction I hvae used Yelp-Fusion API for that.

# Without reinventing the wheel again - NPM module used
As the Yelp fusion already provide a starter wrapper for the API so only that NPM-Package (yelp-fusion: https://github.com/tonybadguy/yelp-fusion) with its dependent module used. That is all.

## Setup

Clone the repo:

```
$ git clone https://github.com/littlegiante/dcc.git
```

Go into the directory:

```
$ cd dcc
```

Install the dependences:

Hoping you already have Node (npm) installed, if not you can install it from https://nodejs.org

```
$ npm install
```

## Usage
Once you're all setup, you should be able to run the script directly from the command line:

## Approach1: Basic console version

Run the below command in your console. 

```
$ node basic.js
```

In this approch I have use PromiseALL to make things happen. Now Yelp-fusion have Queries-Per-Second (QPS) Rate Limiting so it is high chance that if you increase the limit more than 5, then the concurrent Promise call may throw HTTP 429 error.

## Output

Five top output will come one by one basis on rating in specified location.
Altough rating was not asked to display - but still kept with heading for better presentation

```
------------------------------------------
# 1 Scream'n Nuts (4.5) 
------------------------------------------
Address:  5950 North Point Pkwy ,  Alpharetta
Review By:  Sunita M.
Review:  Step aside diabetes, I am trying this doughnut. The Nutella doughnut is amazing!!! It is jumbo-sized and can definitely be shared among a few.. 

There are...
```

## Approach2: Server & Browser version

Run the below command in your console. 

```
$ node server.js
```

In this approch I have useed Async Await in place of Promise, as a result I can solve the Queries-Per-Second (QPS) limittetion of Yelp-Fusion API. Also I have useed Bootstrap 3 (CDN) to represent the content in presentable way. I also restucture it in to object oriented way so that it can be more extendable and moduler.

## Output

Open the URL showing into your console

## Search Parameter

```
// Set the searchable parameter
{
    categories:'icecream', // As we are looking for the Icecreame Shop
    location: 'Alpharetta', // Location That we have to search for
    radius: 5000, // Has to given to retrict the searcg sprcific to city Alpharetta
    sort_by: 'rating', // As we are looking for top
    limit: 5 // No of records need to be listed
}
```

As it was specified that the listing should be done as per the order returned by API so I have used SORT_BY in API search parameter. RADIUS used to restrict the search result in the asked location Alpharetta, If we don't provide that it will return data from diferrent location includion Alpharetta and which is as per Yelp-Fusion API (Businesses returned in the response may not be strictly within the specified location)

## Goal

I have tryied to ilustrate that we can solve the statement in different way as per requirements and context. My intention was to shoe that the bare menium problem statement should be solved in a presentable way.
