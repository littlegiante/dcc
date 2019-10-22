const http = require('http');
const BusinessList = require('./listbusiness'); // lets include the listbusiness

const hostname = '127.0.0.1'; 
const port = 3000; // Please change if you want host in different port

// Set the searchable parameter
const searchRequest = {
    categories:'icecream', // As we are looking for the Icecreame Shop
    location: 'Alpharetta', // Location That we have to search for
    radius: 5000, // Has to given to retrict the searcg sprcific to city Alpharetta
    sort_by: 'rating', // As we are looking for top
    limit: 5 // No of records need to be listed
};

const list = BusinessList.list(searchRequest);

// Creating the HTTP server
const server = http.createServer((req, res) => {
   
    // Lets Show the business content
    list.showBusiness().then(html => {
        console.log(html);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
    })
  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});