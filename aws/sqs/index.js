import { SQS } from '@aws-sdk/client-sqs'
import config from './aws-config.json'
// Create an S3 client in the us-west-1 Region

const sqs = new SQS({
  region: 'sa-east-1',
  credentials: {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  }
})

// sqs.sendMessage({
//   MessageAttributes: {
//     'Title': {
//       DataType: 'String',
//       StringValue: 'The Whistler'
//     },
//     'Author': {
//       DataType: 'String',
//       StringValue: 'John Grisham'
//     },
//     'WeeksOn': {
//       DataType: 'Number',
//       StringValue: '6'
//     }
//   },
//   MessageBody: 'Information about current NY Times fiction bestseller for week of 12/11/2016.',
//   MessageDeduplicationId: 'TheWhistler',  // Required for FIFO queues
//   MessageGroupId: 'Group1',  // Required for FIFO queues
//   QueueUrl: 'https://sqs.sa-east-1.amazonaws.com/077104975186/sqs-test.fifo'
// }, (err, data) => {
//   console.log(err, data)
// })

 sqs.receiveMessage({
  AttributeNames: [
    'SentTimestamp'
  ],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: [
    'All'
  ],
  QueueUrl: 'https://sqs.sa-east-1.amazonaws.com/077104975186/sqs-test.fifo',
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0,
}, (err, data) => {
  console.log(err, data)
})
