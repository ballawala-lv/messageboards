import gql from 'graphql-tag';

export default gql(
	`
		subscription messageSubscription {
		  onCreateMessage {
			id
			message
			username
		  }
		}
	`
)