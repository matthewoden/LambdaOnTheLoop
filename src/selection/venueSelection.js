import Random from 'random-js';

import cache from '../utils/cache.instance';
import createQueryKey from '../utils/createQueryKey';
import { fetchVenues, fetchDetail } from '../foursquare/fetchVenueData';

//random number generator
let engine = Random.engines.mt19937().autoSeed();
let distribution = Random.integer(0, 49);

//finds a mathematically random venue, and optionally retry's on a repeat.
function randomVenueId(venues, id) {
  let venue = venues[distribution(engine)].venue;
  if(id && venue.id === id){
    randomVenueId(venues, id);
  } else {
    return venue;
  }
}

//fetches the list from our cache, or foursquare itself.
export function createVenueList() {
  console.log('creating venue list');
  return new Promise((resolve, reject) => {
    let queryKey = createQueryKey({name: 'listItems'});
    let foundCache = cache.find('venueList', queryKey);

    if(foundCache) {
      console.log('found cache!', foundCache);
      return resolve(foundCache);
    } else {
      return fetchVenues().then(response => { console.log('fetched!'); return resolve(cache.update('venueList', queryKey, response)); })
      .catch(err => reject(err));
    }
  });
}

//finds a random value
export function findRandomVenue(id) {
  console.log('finding random venue');
  return new Promise((resolve, reject) => {
    return createVenueList().then(list => {
      let venue = randomVenueId(list, id);
      let queryKey = createQueryKey({id: venue.id});
      let foundCache = cache.find('venueDetail', queryKey);

      if(foundCache){
        return resolve(foundCache);
      } else {
        return fetchDetail(venue.id)
        .then(response => resolve(cache.update('venueDetail', queryKey, response)))
        .catch(err => reject(err));
      }
    })
    .catch(err => err);
  });
}
