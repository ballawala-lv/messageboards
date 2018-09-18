import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from "react-apollo";
import aws_exports from "./aws-exports";
import { Rehydrated } from 'aws-appsync-react';
import AWSAppSyncClient from "aws-appsync";
import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";
import Amplify, {Auth} from 'aws-amplify';

import registerServiceWorker from './registerServiceWorker';

Amplify.configure(aws_exports);
console.log('ampsl',Amplify.API)
const client = new AWSAppSyncClient({
	url: Amplify.API._api._options.aws_appsync_graphqlEndpoint,
	region: Amplify.API._api._options.aws_project_region,
	auth: {
		// type: AUTH_TYPE.API_KEY,
		// apiKey: 'da2-q6wyx3ufbnfdpfct5o7obr5z6a',

		// type: AUTH_TYPE.AWS_IAM,
		// Note - Testing purposes only
		/*credentials: new AWS.Credentials({
			accessKeyId: AWS_ACCESS_KEY_ID,
			secretAccessKey: AWS_SECRET_ACCESS_KEY
		})*/

		// Amazon Cognito Federated Identities using AWS Amplify
		//credentials: () => Auth.currentCredentials(),

		// Amazon Cognito user pools using AWS Amplify
		type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
		jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
	},
});

const WithProvider = () => (
	<ApolloProvider client={client}>
		<Rehydrated>
			<App />
		</Rehydrated>
	</ApolloProvider>
);


ReactDOM.render(<WithProvider/>, document.getElementById('root'));
registerServiceWorker();
