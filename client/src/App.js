import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import NavBar from './components/Navbar/Navbar.jsx';
import Home from './containers/Home/Home.jsx';
import Search from './containers/Search/Search';
import Create from './containers/Create/Create.jsx';
import About from './components/About/About.jsx';
import GameDetail from './containers/GameDetail/GameDetail.jsx';
import './App.css';

function App() {
	return (
		<div className='App'>
			<React.Fragment>
				<Route path='/results' component={NavBar} />
				<Route path='/home' component={NavBar} />
				<Route exact path='/home' component={Home} />
				<Route exact path='/' component={LandingPage} />
				<Route exact path='/results/:name' component={Search} />
				<Route path='/videogames' component={NavBar} />

				<Route
					exact
					path='/videogames/:id'
					render={({ match }) => <GameDetail id={match.params.id} />}
				/>

				<Route path='/about' component={NavBar} />
				<Route path='/create' component={NavBar} />
				<Route path='/create' exact component={Create} />

				<Route path='/about' component={About} />
			</React.Fragment>
		</div>
	);
}

export default App;
