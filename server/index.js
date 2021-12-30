// const port = 4000
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require("./models/User");
const lightwallet = require("eth-lightwallet");
const cors = require('cors');
const Web3 = require('web3');
const async = require('async');
const erc20Abi = require('./erc20/erc20Abi')
const erc20Bytecode = require('./erc20/erc20Bytecode');
const contractAddress = require('./erc20/contractAddress');

// app.use(cors())
//application/x-www-form-urlencoded, 분석
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//application/json, 제이슨 타입 분석 
app.use(bodyParser.json());
app.use(cookieParser());



app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS']
  })
);
const uri = "mongodb+srv://BEB01_project2:hello123@cluster0.g5xbs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const mongoose = require('mongoose');
//minjeong DB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected success !!"))
  .catch(err => console.log(err))
//minjeong DB

//gw db
// const mongoose = require('mongoose')
// mongoose.connect(config.mongoURI
// ).then(() => console.log('MongoDB Connected success !!'))
// .catch(err => console.log(err))

app.use('/api/product', require('./routes/product'));
app.use('/uploads', express.static('uploads'));

// user의 id와 비밀번호 입력 시, 1ETH 제공
app.post('/ethFaucet', async(req, res) => {
  const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
  const accounts = await web3.eth.getAccounts();
  let balance, txHash;
  console.log(web3);
  console.log(accounts);

  User.findOne({ email: req.body.email }, (err, user) => {

    console.log('user', user)
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      // console.log('err',err)
      // console.log('isMatch',isMatch)
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

      //비밀번호 일치한다면 1ETH 전송
      User.findOne({ role: 1 }, (err, server) => {
        if (!server) {
          return res.json({
            faucetSuccess: false,
            message: "Error: Faucet Transaction Faield"
          })
        }
        console.log('server', server.privateKey);
        // 개인 키 등록
        web3.eth.accounts.privateKeyToAccount(server.privateKey);
        console.log('개인 키 등록 완료');

        //트랜잭션 서명
        web3.eth.accounts.signTransaction({
          to: user.address,
          value: 1000000000000000000, // 1ETH
          gas: 21000
        }, server.privateKey, (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log(result);
          txHash = result.transactionHash;
          web3.eth.sendSignedTransaction(result.rawTransaction).on('receipt', console.log);
          web3.eth.getBalance(user.address, "latest", function (err, result) {
            if (err) {
              console.log(err);
              return;
            }
            console.log(result);
            balance = result;
            return res.json({ message: "Faucet Successed", data: { username: user.name, address: user.address, balance: balance, txHash: txHash } });
          }); 
        });
     }) 
    })
  })
})


// ERC20 토큰 제공
// API 명세에는 userName으로 되어 있으나, 중복 이슈가 있을 수 있으므로 eamil로 변경
app.post("/serveToken", async(req, res) => {

  const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
  const accounts = await web3.eth.getAccounts();
  let address, txHash, balance;

  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      res.json({ message: 'Error: sendSignedTransaction Failed' })
    }
    address = user.address;

    // 토큰 제공을 위한 서버 계정
    User.findOne({ role: 1 }, (err, server) => {
      if (!server) {
        return res.json({
          faucetSuccess: false,
          message: "Error: Faucet Transaction Faield"
        })
      }
      console.log('server', server.privateKey);

      // 개인 키 등록
      web3.eth.accounts.privateKeyToAccount(server.privateKey);
      console.log('개인 키 등록 완료');


      // Contract Object 생성
      const contract = new web3.eth.Contract(erc20Abi, contractAddress);
      console.log('contract object 생성');

      const data = contract.methods.transfer(user.address, 1).encodeABI(); //Create the data for token transaction.

      const rawTransaction = { "to": contractAddress, "gas": 100000, "data": data }; 

      console.log("debug");
      web3.eth.accounts.signTransaction(rawTransaction, server.privateKey, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        txHash = result.transactionHash;
        console.log(txHash);
        web3.eth.sendSignedTransaction (result.rawTransaction, async(err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          balance = await contract.methods.balanceOf(user.address).call();
          res.json({message: "Serving Successed", data: {name: user.name, address: user.address, txHash: txHash, tokenBalance: balance}})
        })
      })
    })
  })  
})

app.post('/api/users/register', (req, res) => {

    //회원 가입 할 때 필요한 정보들을  client에서 가져오면 
    //그것들을  데이터 베이스에 넣어준다. 
    const user = new User(req.body)


    const reqEmail = req.body.email;
    const reqPassword = req.body.password;
    const reqName = req.body.name;
    const role = req.body.role || 0;

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
                    user.name = reqName;
                    user.email = reqEmail;
                    user.password = reqPassword;
                    user.address = address;
                    user.keyStore = keyStore;
                    user.role = role;
                  if (role == 1) { //admin
                    user.privateKey = req.body.privateKey;
                    }
                    // res.json(user); 
                    user.save(function (err) {
                        if (err) {
                            console.error(err);
                            res.json({ success: false, message: '생성 실패' });
                            return;
                        }
                        res.json({ success: true, message: "생성 완료!", email: reqEmail, mnemonic: mnemonic, keyStore: keyStore, address: address });
                    });
                })
            });

    } catch (err) {
        console.log(err);
    }
  })


  //로그인
  app.post('/api/users/login', (req, res) => {

    // console.log('ping')
    //요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
  
      console.log('user', user)
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다."
        })
      }
  
      //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
      user.comparePassword(req.body.password, (err, isMatch) => {
        // console.log('err',err)
        // console.log('isMatch',isMatch)
        if (!isMatch)
          return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
  
        //비밀번호 까지 맞다면 토큰을 생성하기.
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
  
          // 토큰을 저장한다.  어디에 ?  쿠키 , 로컳스토리지 
          res.cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, token: user.token, name: user.name, userId: user._id, address: user.address, message: `반갑습니다 ${user.name}님`})
        })
      })
    })
  })

  // role 1 어드민    role 2 특정 부서 어드민 
// role 0 -> 일반유저   role 0이 아니면  관리자 
app.get('/api/users/auth', auth, (req, res) => {
    //여기 까지 미들웨어를 통과해 왔다는 얘기는  Authentication 이 True 라는 말.
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
      token: req.user.token,
    })
  })
  
  app.get('/api/users/logout', auth, (req, res) => {
    // console.log('req.user', req.user)
    User.findOneAndUpdate({ _id: req.user._id },
      { token: "" }
      , (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
          success: true
        })
      })
  })
  
  
  if (process.env.NODE_ENV === "production") {

    // Set static folder   
    // All the javascript and css files will be read and served from this folder
    app.use(express.static("client/build"));
  
    // index.html for all page routes    html or routing and naviagtion
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
  }
  
  const port = process.env.PORT || 4000
  
  app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
  });
  


