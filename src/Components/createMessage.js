import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import CreateMessage from '../Queries/addMessage';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import {Auth} from 'aws-amplify';


export default class CreateMessageApp extends Component {
	state = {
		message: ''
	};

	handleChange = (e) => {
		this.setState({message: e.target.value});
	}

	render() {
		let input;
		let {user} = this.props;
		return (

			<Mutation mutation={CreateMessage}>
				{
					(createMessage, {data}) => {
						return (
							<div>
								<form onSubmit={
									e => {
										e.preventDefault();
										createMessage({
											variables: {
												username: user,
												message: this.state.message
											}
										})
										this.setState({message: ''})
									}
								}>
									<Input onChange={this.handleChange} value={this.state.message}/>
									<Button variant="raised" color="primary" type="submit">Send</Button>
								</form>
							</div>
						)
					}
				}
			</Mutation>
		)
	}
}