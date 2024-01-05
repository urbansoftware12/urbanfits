const AWS = require('aws-sdk');
import { SNSClient } from "@aws-sdk/client-sns";
import { PublishCommand } from "@aws-sdk/client-sns";

const sendSMS = async (to, msg) => {
    try {
        const snsClient = new SNSClient({
            region: 'eu-north-1',
            credentials: {
                accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
                secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY
            }
        });
        const response = await snsClient.send(
            new PublishCommand({
                Message: msg,
                PhoneNumber: to,
            })
        );
        console.log(response);
        return response
    } catch (error) { console.log(error); throw new Error(error) }
}
export default sendSMS