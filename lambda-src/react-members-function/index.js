const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    switch (event.routeKey) {
      case "GET /members":
        body = await dynamo
          .scan({ TableName: "mern-tracker-members" })
          .promise();
        break;

      case "POST /members":
        let requestJSON = JSON.parse(event.body);
        let memberId;
        if (requestJSON.id) {
          memberId = requestJSON.id;
        } else {
          memberId = AWS.util.uuid.v4();
        }
        await dynamo
          .put({
            TableName: "mern-tracker-members",
            Item: {
              id: memberId,
	      firstName: requestJSON.firstName,
	      lastName: requestJSON.lastName,
              position: requestJSON.position,
	      teamId: requestJSON.teamId
            },
          })
          .promise();
        body = `Put team ${memberId}`;
        break;

      case "GET /members/{id}":
        body = await dynamo
          .get({
            TableName: "mern-tracker-members",
            Key: {
              id: event.pathParameters.id,
            },
          })
          .promise();
        break;

      case "DELETE /members/{id}":
        await dynamo
          .delete({
            TableName: "mern-tracker-members",
            Key: {
              id: event.pathParameters.id,
            },
          })
          .promise();
        body = `Deleted item ${event.pathParameters.id}`;
        break;

      case "PUT /members/{id}":
        let requestJSON2 = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "mern-tracker-members",
            Item: {
              id: event.pathParameters.id,
              firstName: requestJSON2.firstName,
	      lastName: requestJSON2.lastName,
	      position: requestJSON2.position,
	      teamId: requestJSON2.teamId
            },
          })
          .promise();
        body = `Put team ${event.pathParameters.id}`;
        break;

      default:
        throw new Error(`Unsupported route: '${event.routeKey}'`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
