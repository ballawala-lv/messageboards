import React, {Component} from 'react';
import {Query} from 'react-apollo';
import getBoard from '../Queries/getBoard';
import _ from 'lodash';


export default class MessageBoard extends Component {
	renderMessages(msgs) {
		console.log('in here', msgs);
		return (
			<ul>
				{
					_.map(msgs.items, (m) => {
						console.log('msg is', m);
						return (
							<li>
								{m.username}: {m.message}
							</li>
						)
					})
				}
			</ul>

		)
	}

	_subscribeToMoreMessages = subscribeToMore => {
		subscribeToMore({
			document: test,
			updateQuery: () => {}
		})
	}

	render() {
		return (
			<div>
				Message Board
				<Query query={getBoard}>
					{({ subscribeToMore, loading, error, data }) => {
						console.log('board data', data);
						if (loading) return "Loading...";
						if (error) return `Error! ${error.message}`;

						this._subscribeToMoreMessages(subscribeToMore);

						return (
							<div>
								<h1>{data.getBoard.title}</h1>
								{JSON.stringify(data)}
								{this.renderMessages(data.getBoard.messages)}
							</div>
						);
					}}

				</Query>
			</div>
		)
	}
}