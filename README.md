# Experiment: Lambda on the Loop
_"Lunch as a microservice"_

I work on the Delmar Loop in Saint Louis, MO. It's home to a ridiculous supply of restaurants, which means our office has the firstest of first-world problems: _What do we eat for lunch?_

That's where Lunch on the Loop (AWS Lambda) comes in. Localized random lunch suggestions that kick analysis paralysis in the face.

## About
This is a node project. Lambda runs on Node 10.36, which is safe, and stable and good for production. This project is not safe, stable, or likely good for production. I'll be using Babel to throw in the full might of ES2015, as well as every other experimental feature I can muster.

### Convenience vs Performance: The story so far...
This little 'decision as a service' app is kind of my personal TodoMVC. I've toyed with a phone app, a web app, and I'm poking around with an Alexa Skills app, and looking into a Slack's webhooks. But every prototype still needs to get wired up to the same couple endpoints to generate a random venue, and every time I have to go dig up my secret key and id. A microservice seemed like it could be convienient. 

At the same time, a microsevice that itself uses third party API is going to be slow. Right now, the average response time is 800ms, which is kind of horrific. That's with my Lambda Function set at 512MB, which is roughly where the only thing slowing down the response is Foursquare itself. Implementing a cache layer is going to be pretty critical.

## Getting set up
```
$ git clone https://github.com/matthewoden/LambdaOnTheLoop.git
$ npm install
$ webpack
```
This will clone the repo, install your dependancies, and compile the source. Until local tests are added in, you'll have to upload the file to your AWS account, and test within the service. 

## Roadmap
- Improve caching.
- Add Blacklist to search function. Old venues need to be cleaned up.
- Write error handling for FourSquare API failure.
- Caching venue lists to disk, or dynamoDB.
- Look into other async patterns, play with generators.
- AWS event/context handler utility. Check memory usage, report time stamps, and preserve some of those MILLIONS OF FREE CALLS.
- Tests! Get some Mocha in here.
