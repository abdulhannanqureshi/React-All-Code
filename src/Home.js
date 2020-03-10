import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import About from './About';


class Home extends Component {
    render(){
      return(
          <div className="tableSection">
            <h2><Link to="#">www.google.com</Link></h2>
            <About yah="Yahoo" />
          </div>
        );
    }
}

export default Home;