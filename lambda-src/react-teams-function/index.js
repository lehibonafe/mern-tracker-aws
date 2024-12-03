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
      case "GET /teams":
        body = await dynamo
          .scan({ TableName: "mern-tracker-teams" })
          .promise();
        break;

      case "POST /teams":
        let requestJSON = JSON.parse(event.body);
        let teamId;
        if (requestJSON.id) {
          teamId = requestJSON.id;
        } else {
          teamId = AWS.util.uuid.v4();
        }
        await dynamo
          .put({
            TableName: "mern-tracker-teams",
            Item: {
              id: teamId,
              name: requestJSON.name,
            },
          })
          .promise();
        body = `Put team ${teamId}`;
        break;

      case "GET /teams/{id}":
        body = await dynamo
          .get({
            TableName: "mern-tracker-teams",
            Key: {
              id: event.pathParameters.id,
            },
          })
          .promise();
        break;

      case "DELETE /teams/{id}":
        await dynamo
          .delete({
            TableName: "mern-tracker-teams",
            Key: {
              id: event.pathParameters.id,
            },
          })
          .promise();
        body = `Deleted item ${event.pathParameters.id}`;
        break;

      case "PUT /teams/{id}":
        let requestJSON2 = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "mern-tracker-teams",
            Item: {
              id: event.pathParameters.id,
              name: requestJSON2.name,
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
