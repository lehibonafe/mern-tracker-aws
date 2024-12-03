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
      case "GET /tasks":
        body = await dynamo
          .scan({ TableName: "mern-tracker-tasks" })
          .promise();
        break;

      case "POST /tasks":
        let requestJSON = JSON.parse(event.body);
        let taskId;
        if (requestJSON.id) {
          taskId = requestJSON.id;
        } else {
          taskId = AWS.util.uuid.v4();
        }
        await dynamo
          .put({
            TableName: "mern-tracker-tasks",
            Item: {
              id: taskId,
	      description: requestJSON.description,
	      teamId: requestJSON.teamID
            },
          })
          .promise();
        body = `Put team ${taskId}`;
        break;

      case "GET /tasks/{id}":
        body = await dynamo
          .get({
            TableName: "mern-tracker-tasks",
            Key: {
              id: event.pathParameters.id,
            },
          })
          .promise();
        break;

      case "DELETE /tasks/{id}":
        await dynamo
          .delete({
            TableName: "mern-tracker-tasks",
            Key: {
              id: event.pathParameters.id,
            },
          })
          .promise();
        body = `Deleted item ${event.pathParameters.id}`;
        break;

      case "PUT /tasks/{id}":
        let requestJSON2 = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "mern-tracker-tasks",
            Item: {
              id: event.pathParameters.id,
              description: requestJSON2.description,
	      teamId: requestJSON2.teamID
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
