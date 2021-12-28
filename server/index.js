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

// GW DB




//gw db
// const mongoose = require('mongoose')
// mongoose.connect(config.mongoURI
// ).then(() => console.log('MongoDB Connected success !!'))
// .catch(err => console.log(err))

app.use('/api/product', require('./routes/product'));
app.use('/uploads', express.static('uploads'));


app.post('/api/users/register', (req, res) => {

    //회원 가입 할떄 필요한 정보들을  client에서 가져오면 
    //그것들을  데이터 베이스에 넣어준다. 
    const user = new User(req.body)


    const reqEmail = req.body.email;
    const reqPassword = req.body.password;
    const reqName = req.body.name;
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
                    // res.json(user); 
                    user.save(function (err) {
                        if (err) {
                            console.error(err);
                            res.json({ message: '생성 실패' });
                            return;
                        }
                        res.json({ message: "생성 완료!", email: reqEmail, mnemonic: mnemonic, keyStore: keyStore, address: address });
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
  


