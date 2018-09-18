import gql from 'graphql-tag';

export default gql(
	`
	subscription subMsg {
	  onCreateMessage {
		id
		message
		username
	  }
	}

	`
)