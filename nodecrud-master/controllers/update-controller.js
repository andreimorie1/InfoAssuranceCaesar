const updateModel = require("../models/update-model");

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
  editData: function (req, res) {
    const editId = req.params.id;
    updateModel.editData(editId, function (data) {
      // Decrypting data before rendering the edit form
      const decryptedData = {
        id: data.id,
        full_name: caesarCipher(data.full_name, -12),
        email_address: caesarCipher(data.email_address, -16),
        city: caesarCipher(data.city, -96),
        country: caesarCipher(data.country, -68),
      };
      res.render("crud-form", { editData: decryptedData });
      console.log(data.affectedRows + " record fetched");
    });
  },
  updateData: function (req, res) {
    const inputData = {
      id: req.params.id,
      full_name: caesarCipher(req.body.full_name, 12),
      email_address: caesarCipher(req.body.email_address, 16),
      city: caesarCipher(req.body.city, 96),
      country: caesarCipher(req.body.country, 68),
    };

    const updateId = req.params.id;
    updateModel.updateData(inputData, updateId, function (data) {
      res.redirect("/crud/read");
      console.log(data.affectedRows + " record(s) updated");
    });
  },
};
