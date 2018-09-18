import gql from 'graphql-tag';

export default gql(
	`
		query GetBoard{
		  getBoard(id:"6d9b986a-5695-4c87-893a-44f8e0cbf75f"){
			id
			title
			messages {items {
			  username
			  createdAt
			  message
			}
			}
		  }
		}
	`
)