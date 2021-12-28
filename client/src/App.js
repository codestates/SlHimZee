import React, { useState, useEffect } from 'react';
// TODO : React Router DOM을 설치 후, import 구문을 이용하여 BrowserRouter, Route, Switch 컴포넌트를 불러옵니다.
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Bar from './components/Pages/Bar';
import Bar2 from './components/Pages/Bar2';
import TL from './components/Pages/TL';
import CS from './components/Pages/CS';
import CA from './components/Pages/CA';
import TD from './components/Pages/TD';
import Main from './components/Pages/Main';
// import Signinfrom from './components/signinfrom';

import CssBaseline from '@mui/material/CssBaseline';
import LandingPage from './components/Pages/LandingPage'
import LoginPage from './components/Pages/Loginpage';
import RegisterPage from './components/Pages/RegisterPage';
import Auth from './components/hoc/auth'
import UploadProductPage from './components/UploadProductPage/UploadProductPage';


const App = (props) => {

  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const isAuthenticated = () => {
    if (userInfo) {
      console.log('have userInfo')
      setIsLogin(true);
    }
  };

  const handleLogin = (req) => {
    const addr = req.address;
    console.log(addr);
    setUserInfo(addr);
    isAuthenticated();
  }

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <CssBaseline />
        <Bar />
        <Bar2 isLogin={isLogin} />
        <Switch>
          <Route exact path="/" isLogin={isLogin}>
            <Main />
          </Route>
          <Route path="/Tl">
            <TL />
          </Route>
          <Route path="/CS">
            <CS />
          </Route>
          <Route path="/CA">
            <CA />
          </Route>
          <Route path="/TD">
            <TD />
          </Route>
          {/* <Route path="/signinfrom">
              <Mui />
            </Route> */}
          {/* <Route path="/Loignpage">
              <Loginpage />
            </Route> */}
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;