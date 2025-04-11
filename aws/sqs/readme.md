queue_url=$(aws sqs list-queues --output text --query "QueueUrls")
aws sqs send-message --queue-url $queue_url --message-body "I'm an SQS message from the CLI"
aws sqs receive-message --queue-url "$queue_url"
aws sqs delete-message --queue-url $queue_url --receipt-handle <receipt_handle>
