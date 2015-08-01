
class RequestCache {
  constructor() {
    this.cache = {};
  }

  setExpiry = (name, time) => {
    this.cache[name].expiry = time;
  }

  createCache = (name) => {
    this.cache[name] = {
      expiry: new Date().getHours() + 1
    };
  }

  find = (name, key) => {
    let expired = new Date().getHours() + 1;
    if(this.cache[name]){
      if(this.cache[name][key] && this.cache[name][key].expiresOn < expired) {
        return this.cache[name][key].value;
      }
    }

    return false;
  }

  update = (name, key, value) => {
    if(!this.cache[name]){
      this.createCache(name);
    }

    let expiresOn = new Date().getHours() + 1;

    this.cache[name][key] = {
      value,
      expiresOn
    };
    return this.cache[name][key].value;
  }

  clear = (name) => {
    this.cache[name] = {
      expiry: -1
    };
  }
}

let cacheInstance = new RequestCache();

export default cacheInstance;
