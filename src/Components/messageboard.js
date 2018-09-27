import React, {Component} from 'react';
import {Query} from 'react-apollo';
import getBoard from '../Queries/getBoard';
import MessageSubscription from '../Queries/subscribeMessage';
import _ from 'lodash';
import moment from 'moment';


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
								{moment(m.createdAt).format('MMMM Do YYYY, h:mm:ss a')} - {m.username}: {m.message}
							</li>
						)
					})
				}
			</ul>

		)
	}

	_subscribeToMoreMessages = subscribeToMore => {
		subscribeToMore({
			document: MessageSubscription,
			updateQuery: (prev, {subscriptionData} ) => {
				if (!subscriptionData.data) return prev;
				const newMessage = subscriptionData.data.onCreateMessage;
				const newobj = Object.assign({}, prev, {
					...prev,
					getBoard: {
						id: prev.getBoard.id,
						title: prev.getBoard.title,
						messages: {items:  [...prev.getBoard.messages.items, newMessage], __typename: prev.getBoard.messages.__typename},
						__typename: prev.getBoard.__typename
					}
				});
				// console.log('prev.getBoard.messages.items.__typename', prev.getBoard.messages.items.__typename);
				// console.log('newobj', newobj);
				// console.log('dddd', prev.getBoard.messages);
				// console.log('prev is', prev);
				// console.log('dataaa is', subscriptionData);
				// return prev
				return newobj;
			}
		})
	}

	render() {
		return (
			<div>
				Message Board
				<Query query={getBoard} fetchPolicy='network-only'>
					{({ subscribeToMore, loading, error, data }) => {
						console.log('board data', data);
						if (loading) return "Loading...";
						if (error) return `Error! ${error.message}`;

						this._subscribeToMoreMessages(subscribeToMore);

						return (
							<div>
								<h1>{data.getBoard.title}</h1>
								{this.renderMessages(data.getBoard.messages)}
							</div>
						);
					}}

				</Query>
			</div>
		)
	}
}