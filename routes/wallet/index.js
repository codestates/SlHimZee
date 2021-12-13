var express = require("express");
var router = express.Router();
const lightwallet = require("eth-lightwallet");
const fs = require("fs");

// get random Mnemonic code
router.post("/newMnemonic", async (req, res) => {
    const mnemonic = lightwallet.keystore.generateRandomSeed();
    console.log(mnemonic);
    res.send(mnemonic);
});

// generate keystore and address
router.post("/newWallet", async (req, res) => {
    const password = req.body.password;
    const mnemonic = req.body.mnemonic;

    lightwallet.keystore.createVault(
        {
            password: password,
            seedPhrase: mnemonic,
            hdPathString: "m/0'/0'/0'",
        },
        function (err, ks) {
            if (err) throw err;
            ks.keyFromPassword(password, function (err, pwDerivedKey) {
                if (err) throw err;
                ks.generateNewAddress(pwDerivedKey, 1);
                const addr = ks.getAddresses();
                const keystore = ks.serialize();

                console.log(addr);
                console.log(keystore);

                fs.writeFile("wallet.json", keystore, function (err, result) {
                    if (err) {
                        res.send({ message: "Fault" });
                    } else {
                        res.send({
                            message: "Success. Check your 'wallet.json'",
                        });
                    }
                });
            });
        }
    );
});

module.exports = router;
