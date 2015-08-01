# Lambda on the Loop
_"Lunch as a microservice"_

I work on the Delmar Loop in Saint Louis, MO. It's home to a ridiculous supply of restaraunts, which means our office has the firstest of first-world problems: _What do we eat for lunch?_

That's where Lunch on the Loop (AWS Lambda) comes in. It kicks analysis paralysis in the face, and make a lunch decision for you.

This little 'decision as a service' app is starting to become my personal TodoMVC. I've toyed with a phone app, a web app, and I'm poking around with an Alexa Skills app. But no matter what platform I use, I still need to build the same endpoint. To speed things up, I'm toying with the idea of 'Lunch on the Loop' as a microservice. Partially to spare myself from writing the same Foursquare API endpoints over and over, but mostly because AWS Lambda seems pretty rad.

## About
This is a node project. Lambda runs on Node 10.36, which is safe, and stable and good for production. This project is not safe, stable, or likely good for production. I'll be using Babel to throw in the full might of ES2015, as well as every other experimental feature I can muster.

## Getting set up
```
$ git clone https://github.com/matthewoden/LambdaOnTheLoop.git
$ npm install
$ webpack
```
This will clone the repo, install your dependancies, and compile the source. But (currently) the method doesn't run locally. Mocking up an AWS event/context handler is on the list.

## Roadmap
- Remove Caching. AWS is purely functional. Caching layers belong elsewhere.
- Add Blacklist to search function. Old venues need to be cleaned up.
- Write error handling for FourSquare API failure.
- Look into other async patterns, play with generators.
- AWS event/context handler utility. Check memory usage, report time stamps, and preserve some of those MILLIONS OF FREE CALLS.
- Tests! Get some Mocha in here.