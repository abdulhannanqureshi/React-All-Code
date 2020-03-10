import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class About extends Component {

    

    render(){
      return(
            <h2><Link to="#">www.{this.props.yah}.com</Link></h2>
        );
    }
}

export default About;