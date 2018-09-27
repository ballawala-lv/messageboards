import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import CreateMessage from '../Queries/addMessage';
import {Auth} from 'aws-amplify';


export default class CreateMessageApp extends Component {
	constructor(props) {
		super(props);
		}
	render() {
		let input;
		let {user} = this.props;
		return (

			<Mutation mutation={CreateMessage}>
				{
					(createMessage, {data}) => {
						console.log('createMessage is', createMessage);
						console.log('data is', data);
						return (
							<div>
								<form onSubmit={
									e => {
										e.preventDefault();
										createMessage({
											variables: {
												username: user,
												message: input.value
											}
										})
										input.value = "";
									}
								}>
									<input
										ref={node => {
											input = node;
										}}
									/>
								<button type="submit">Send</button>
								</form>
							</div>
						)
					}
				}
			</Mutation>
		)
	}
}