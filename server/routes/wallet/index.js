var express = require("express");
var router = express.Router();
const lightwallet = require("eth-lightwallet");
const fs = require("fs");
const { User } = require("../../models/User");


// get random Mnemonic code
router.get("/newMnemonic", async (req, res) => {
    res.send("GET /newMnemonic router");
})

router.get("/user", async (req, res) => {
    res.send("GET /user router, Please POST your [name] and [password]");
})

//userId로 해당 유저 찾기
router.get('/find/:address', function (req, res) {
    User.findOne({ address: req.params.address }, function (err, user) {
        if (err) return res.status(500).json({ error: err });
        if (!user) return res.status(404).json({ error: '해당 주소가 존재하지 않습니다.' });
        return res.json({message: "존재하는 계정입니다!!", user: user});
    }
    )
});


router.post("/newMnemonic", async (req, res) => {
    const mnemonic = lightwallet.keystore.generateRandomSeed();
    console.log(mnemonic);
    res.send(mnemonic);
});

router.post('/user', async (req, res) => {
    // 포스트맨에서 userName, password를 넣으면
    let reqUserName, reqPassword;
    reqUserName = req.body.userName;
    reqPassword = req.body.password;
    try {
        let mnemonic;
        let address;
        let keyStore;
        mnemonic = lightwallet.keystore.generateRandomSeed();
        // 생성된 니모닉코드와 password로 keyStore, address 생성
        lightwallet.keystore.createVault({
            password: reqPassword,
            seedPhrase: mnemonic,
            hdPathString: "m/0'/0'/0'"
        },
            function (err, ks) {
                ks.keyFromPassword(reqPassword, function (err, pwDerivedKey) {
                    ks.generateNewAddress(pwDerivedKey, 1);

                    address = (ks.getAddresses()).toString();
                    keyStore = ks.serialize();

                    const user = new User();
                    user.name = reqUserName;
                    user.password = reqPassword;
                    user.address = address;
                    user.keyStore = keyStore;
                    // res.json(user); 
                    user.save(function (err) {
                        if (err) {
                            console.error(err);
                            res.json({ message: '생성 실패' });
                            return;
                        }
                        res.json({ message: "생성 완료!", userName: reqUserName, mnemonic: mnemonic, keyStore: keyStore, address: address });
                    });
                })
            });

    } catch (err) {
        console.log(err);
    }
});

module.exports = router;