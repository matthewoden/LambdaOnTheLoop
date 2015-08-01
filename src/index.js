import { findRandomVenue } from './selection/venueSelection';

exports.handler = function(event, context) {
  return findRandomVenue(event.skipVenue)
  .then(venue => context.succeed(venue))
  .catch(err => context.fail(err));
};
