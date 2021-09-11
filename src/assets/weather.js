const axios = require("axios");
const db = require("dotenv").config();
const postalUri = process.env.POSTAL_URI;
const language = process.env.LANGUAGE_ES;
let prueba = 03725;

const weather = async () => {
  const location = await axios.get(`${postalUri}${prueba}${language}`);
  // console.log(location);

  /* const JSON = location.data.map((ciudad) => ciudad.NOMBRE);
  return JSON; */
  /* await axios
    .get(url)
    .then((location) => {
      console.log(JSON.stringify(location.NOMBRE));
    })
    .catch((err) => {
      console.log("algo ha fallado");
    }); */
};

module.exports = weather;
