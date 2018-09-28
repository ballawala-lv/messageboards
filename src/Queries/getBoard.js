import gql from 'graphql-tag';
import {BOARD_ID} from '../constants';

export default gql(
	`
		query GetBoard{
		  getBoard(id:"${BOARD_ID}"){
			id
			title
			messages(limit:100 sortDirection:ASC) {items {
			  username
			  message
			  createdAt
			}
			}
		  }
		}
	`
)