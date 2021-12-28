
import React, { useEffect, useState } from "react";
import { Card, Button } from 'react-bootstrap';
import sen from '../../img/sen.jpg'
function Main() {

  return (
    <div className="App">
      <div className="row no-gutters">
        <div className="col-3">
          <svg
            className="bd-placeholder-img"
            width="100%"
            height="0"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Placeholder: Image"
            preserveAspectRatio="xMidYMid slice"
            role="img">
          </svg>
          {/* <h1 className="title">NFT</h1> */}
          <div className="card">
            <img className="card-img-top" src={sen} alt={"logo"} />
            <div className="card-body">
              <h5 className="card-title">{}</h5>
              <p className="card-text">설명: {} </p>
              <a href="/Auction" class="btn btn-primary">구매</a>
            </div>
          </div>
        </div>
      </div>
    </div>
      );
}

export default Main;

