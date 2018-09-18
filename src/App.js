import React, {Component} from 'react';
import {Auth} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react';
import logo from './logo.svg';


import MessageBoard from './Components/messageboard';
import CreateMessage from './Components/createMessage';


import './App.css';


class App extends Component {
	state = {
		user: null
	};

	componentDidMount() {
		Auth.currentAuthenticatedUser().then((u)=>{
			this.setState({user: u.username});
		})
	}

	render() {
		return (
			<div className="App">
				<MessageBoard/>
				{this.state.user ? <CreateMessage user={this.state.user}/> : null}


			</div>
		);
	}
}

export default withAuthenticator(App, true);