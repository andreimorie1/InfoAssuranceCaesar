const readModel = require("../models/read-model");

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
  readData: function (req, res) {
    readModel.readData(function (data) {
      // Decrypting fetched data before rendering the view
      const decryptedData = data.map((item) => {
        return {
          id: item.id,
          full_name: caesarCipher(item.full_name, -12),
          email_address: caesarCipher(item.email_address, -16),
          city: caesarCipher(item.city, -96),
          country: caesarCipher(item.country, -68),
        };
      });

      res.render("crud-table", { fetchData: decryptedData });
    });
  },
};
