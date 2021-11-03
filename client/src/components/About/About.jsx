import React from 'react';
import reactlogo from './images/react.svg';
import reduxlogo from './images/redux.svg';
import negrohd from './images/negrohd.png';
import postgrelogo from './images/postgresql.svg';
import sequelizelogo from './images/sequelize.svg';
import expresslogo from './images/express.svg';
import './About.css';

function About() {
	return (
		<div className='about'>
			<h1>About Videogames!</h1>
			<div>
				<h4>
					This project use information and images from the{' '}
					{<a href='https://rawg.io/apidocs'>RAWG</a>} API.
				</h4>
				<h4>
					Develop Hevert David Gelis Diaz for individual project for Henry
					Bootcamp.
				</h4>
			</div>
			<div className='logos'>
				<img className='img1' src={reactlogo} alt='Link caido' />
				<img className='img' src={reduxlogo} alt='Link caido' />
				<img className='img' src={expresslogo} alt='Link caido' />
				<img className='img1' src={negrohd} alt='Link caido' />
				<img className='img' src={postgrelogo} alt='Link caido' />
				<img className='img' src={sequelizelogo} alt='Link caido' />
			</div>
		</div>
	);
}

export default About;
