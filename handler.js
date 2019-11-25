'use strict';

exports.handler = async event => {

 //use aws profile: [serverless-admin]
  var AWS = require('aws-sdk');

  //if test in local dev , then set credentials
  var credentials = new AWS.SharedIniFileCredentials({profile: 'serverless-admin'});
  AWS.config.credentials = credentials;
  //if in lambda in AWS , use IAM Role for Lambda , the IAM user is serverless-admin at this point

// Replace sender@example.com with your "From" address.
// This address must be verified with Amazon SES.
    const sender = "David <david@deckofcardsfitness.com>";

// Replace recipient@example.com with a "To" address. If your account
// is still in the sandbox, this address must be verified.
    const recipient = "driscoll.davidj@gmail.com";

// Specify a configuration set. If you do not want to use a configuration
// set, comment the following variable, and the
// ConfigurationSetName : configuration_set argument below.
//    const configuration_set = "ConfigSet";

// The subject line for the email.
    const subject = "Amazon SES Test (AWS SDK for JavaScript in Node.js)";

// The email body for recipients with non-HTML email clients.
    const body_text = "Amazon SES Test (SDK for JavaScript in Node.js)\r\n"
        + "This email was sent with Amazon SES using the "
        + "AWS SDK for JavaScript in Node.js.";

// The HTML body of the email.
    const body_html = `<html>
<head></head>
<body>
  <h1>Amazon SES Test (SDK for JavaScript in Node.js)</h1>
  <p>This email was sent with
    <a href='https://aws.amazon.com/ses/'>Amazon SES</a> using the
    <a href='https://aws.amazon.com/sdk-for-node-js/'>
      AWS SDK for JavaScript in Node.js</a>.</p>
</body>
</html>`;

// The character encoding for the email.
    const charset = "UTF-8";

// Create a new SES object.
    var ses = new AWS.SES({region:'us-east-1',apiVersion:'2010-12-01'});

// Specify the parameters to pass to the API.
    var params = {
        Source: sender,
        Destination: {
            ToAddresses: [
                recipient
            ],
        },
        Message: {
            Subject: {
                Data: subject,
                Charset: charset
            },
            Body: {
                Text: {
                    Data: body_text,
                    Charset: charset
                },
                Html: {
                    Data: body_html,
                    Charset: charset
                }
            }
        }
    };

//Try to send the email.
//     ses.sendEmail(params, function(err, data) {
//         // If something goes wrong, print an error message.
//         if(err) {
//             console.log(err.message);
//
//             return {statusCode:400};
//         } else {
//             console.log("Email sent! Message ID: ", data.MessageId);
//             return {statusCode:200};
//         }
//     });


    try{
        let sesReturn = await ses.sendEmail(params).promise();
        return {statusCode:200};
    }
    catch (e) {
        console.log(e);
        return {statusCode:400};
        
    }



    /*end*/


  
    
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(
  //     {
  //       message: 'Go Serverless v1.0! Your function executed successfully!',
  //       input: event,
  //     },
  //     null,
  //     2
  //   ),
  // };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
