import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Fetching from './Fetching';
import AddData from './AddData';
import Home from './Home';
import Contact from './Contact';


const Routing = () => (
	<Router>
		<Route exact path="/" component={Fetching} />
		<Route path="/adddata" component={AddData} />
		
		{/*Props*/}
		<Route path="/home" component={Home} />
		<Route path="/contact" component={Contact} />
	

	</Router>
)

export default Routing;
