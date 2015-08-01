/* eslint-disable camelcase */

import request from 'axios';
import { FOURSQUARE_ID, FOURSQUARE_SECRET } from '../config/local.env';

const detailEndpoint = 'https://api.foursquare.com/v2/venues/';
const venuesEndpoint = 'https://api.foursquare.com/v2/venues/explore';

let detailQuery = {
  v: 20140609, // API version
  client_id: FOURSQUARE_ID, // server side auth;
  client_secret: FOURSQUARE_SECRET
};

let venuesQuery = {
  ...detailQuery,
  ll: '38.65571,-90.303563', //delmar loop coordinates
  categoryId: '4d4b7105d754a06374d81259', //food
  limit: 50,  //amount to return (max 50)
  radius: 750, //where to search
  photos: 1, //include a photo with every result.
  openNow: 0 //limit requests to what's open now.
};



/**
 *    Fetch Foursquare Venue Detail
 *    @param  {int}   id - the id of the venue
 *    @return {promise}  a promise, resolved or rejected.
 */
export function fetchDetail(id) {
  return new Promise((resolve, reject) => {
    request
    .get(detailEndpoint + id, { params: detailQuery } )
    .then(body => resolve(body.data.response.venue))
    .catch(err => reject(err));
  });
}


/**
 *    Fetch foursquare venue list - Gets a list of 50 venues around the delmar loop area.
 *    @param  {Number} offset - Gets results, starting at this index. Used for pagination.
= *    @return {Promise}  a promise, resolved or rejected.
 */
export function fetchVenues(offset = 0) {
  return new Promise((resolve, reject) => {
    request
    .get(venuesEndpoint, { params: { ...venuesQuery, offset: offset } })
    .then(body => { return resolve(body.data.response.groups[0].items); })//return only the list of venues.
    .catch(err => { return reject(err); });
  });
}
