import axios from '../plugins/axios';

async function getCountries(obj) {
  try {
    const response = await axios.get('location/get-countries');
    obj.countries = response;
    return response;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export async function getCities(obj, countryCode) {
  try {
    const response = await axios.get(`location/get-cities/${countryCode}`);
    obj.cities = response;
    return response;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export async function getCountryCode(obj, country) {
  let countriesArr = Object.entries(obj.countries);
  let code = '';
  countriesArr.filter((item) => {
    if (item[1] === country) {
      console.log(item);
      code = item[0];
      return true;
    }
  });
  console.log(code);
  obj.code = code;
  return code;
}

locations = {};

getCountries(locations);

export let locations;
