const createModel = require("../models/create-model");

function caesarCipher(text, key) {
  let result = "";
  const alphabet =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  const alphabetLength = alphabet.length;

  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    let index = alphabet.indexOf(char);
    if (index !== -1) {
      let newIndex = (index + key + alphabetLength) % alphabetLength;
      result += alphabet[newIndex];
    } else {
      result += char; // If the character is not in the alphabet, leave it unchanged
    }
  }

  return result;
}

module.exports = {
  crudForm: function (req, res) {
    res.render("crud-form");
  },
  createData: function (req, res) {
    const inputData = {
      full_name: caesarCipher(req.body.full_name, 12),
      email_address: caesarCipher(req.body.email_address, 16),
      city: caesarCipher(req.body.city, 96),
      country: caesarCipher(req.body.country, 68),
    };

    createModel.createData(inputData, function (data) {
      console.log(data.affectedRows + "record created");
      res.redirect("/crud/read"); // Redirect to the page where data is viewed
    });
  },
};
