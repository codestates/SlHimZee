import React from 'react';
// TODO : React Router DOM을 설치 후, import 구문을 이용하여 BrowserRouter, Route, Switch 컴포넌트를 불러옵니다.
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Bar from './Bar';
import Bar2 from './Bar2';
import TL from './components/TL';
import CS from './components/CS';
import CA from './components/CA';
import TD from './components/TD';
import Main from './components/Main';

const App = (props) => {
  

  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Bar />
          <Bar2 />
          <Switch>
            <Route exact path="/">
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
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;