// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const express = require('express');
//
const app = express();
var router = express.Router();

// [START hello_world]
// Say hello!
router.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + '/index.html');
});

router.post('/webhook', (request, response) => {
	console.log(JSON.stringify(request.body));
	response.status(200).send({
		"fulfillmentText":"Hello from backend",
		"fulfillmentMessages":[
			{
				"text":{
					"text":["hello world", "Hello User","Hello for backend"]
				}
			}
		]
	});
});
//app.post('/webhook', (request, response) => {
	
//	console.log(JSON.stringify(request.body));
//	if(request.body.queryResult.action === 'tell.fact'){
//		if(request.body.queryResult.parameters.fact-category[0] === 'History' || request.body.queryResult.parameters.fact-category[0] === 'Past'){
//				response.status(200).send({
//					"fulfillmentText":"Hello from backend",
//					"fulfillmentMessages":[{
//						"text":{
//							"text":["hello world", "Hello User","Hello for backend"]
//						}
//					}]
//			});
//		}
//	}
//});



// [END hello_world]

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;

app.post('/hello', (request, response) => {
//  res.status(200).send('Hello, world!');
	const DialogflowApp = require('actions-on-google').DialogflowApp;
	exports.factsAboutGoogle = (request, response) => {
		const app = new DialogflowApp({request, response});
		const HISTORY_INTENT = 'tell.fact';
		
		function historyIntent(app){
			app.tell('This fact about history is coming from backend tellFact function');
		}
		
		let actionMap = new Map();
		actionMap.set(HISTORY_INTENT, historyIntent);
		app.handleRequest(actionMap);
	};
});
