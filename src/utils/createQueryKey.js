export default function createQueryKey(query) {
  let newString = '';
  for (var property in query) {
    if (query.hasOwnProperty(property)) {
      let suffix = typeof query[property] === 'string' ? query[property].replace(' ', '_') : query[property];
      newString += property + '_' + suffix;
    }
  }
  return newString;
}
