# Developer Code Chalange (JavaScript)

This script was written to perform a search of top five ice cream shops in Alpharetta with review. As per instruction I hvae used Yelp-Fusion API for that.

# Without reinventing the wheel again
As the Yelp fusion already provide a starter wrapper for the API so I have used that NPM-Package (yelp-fusion: https://github.com/tonybadguy/yelp-fusion). Which should be compatible with Node.js 4 and higher.

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

```
$ node index.js
```

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