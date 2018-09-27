import gql from 'graphql-tag';
import {BOARD_ID} from '../constants';

export default gql(
	`
	mutation CreateMessage($username: String!, $message: String!)
	{
	  createMessage(input:{
		username: $username
		messageBoardId: "${BOARD_ID}"
		message: $message
	  }){
		message
		id
		createdAt
		username
	  }
	}

	`
)