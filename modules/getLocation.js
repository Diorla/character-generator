import * as cities from "./../data/myCity.json";
import oddCalculator from "./oddCalculator";
import getNationality from "./getNationality";

export default (maintain, country, subcountry, city) => {
  let result;
  if(maintain==="country") result = getLocation(country);
  else if(maintain==="subcountry") result = getLocation(country, subcountry);
  else if(maintain==="city") result = getLocation(country, subcountry, city);
  else result = getOdds(country, subcountry, city);
  return result;
};

const getOdds = (country, subcountry, city) => {
  const odds = oddCalculator(
    ["city", "subcountry", "country", "none"],
    [4, 3, 2, 1]
  );
  if (odds === "city") return getLocation(country, subcountry, city);
  else if (odds === "subcountry") return getLocation(country, subcountry);
  else if (odds === "country") return getLocation(country);
  else return getLocation();
};

const getLocation = (country, subcountry, city) => {
  if (country) {
    if (subcountry) {
      if (city)
        return {
          country,
          subcountry,
          city
        };
      return generateCity(country, subcountry);
    }
    return generateSubcountry(country);
  }
  return generateCountry();
};

const generateCity = (country, subcountry) => {
  const results = [];
  for (let city in cities) {
    const obj = cities[city];
    if (obj["country"] === country) {
      if (obj["subcountry"] === subcountry) {
        results.push(obj);
      }
    }
  }
  return oddCalculator(results);
};

const generateSubcountry = country => {
  const results = [];
  for (let city in cities) {
    const obj = cities[city];
    if (obj["country"] === country) {
      results.push(obj);
    }
  }
  return oddCalculator(results);
};

const generateCountry = () => {
  const country = getNationality();
  return generateSubcountry(country);
};
