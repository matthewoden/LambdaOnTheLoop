import _ from 'lodash';

//concat api params.
export default function createQueryString(object){
  console.log('creating query string');
  var params = [];
  _.forIn(object, function(value, key) {
    params.push(key + '=' + value);
  });
  console.log('created query string', params.join('&'));
  return params.join('&');
}
