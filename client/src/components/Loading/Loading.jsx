import React from 'react';
import './Loading.css';
import './loadingimg.gif';

export default function loading() {
	return (
		<div>
			<img className='loading' src='loadingimg.gif' alt='loading' />
		</div>
	);
}
