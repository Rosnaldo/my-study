--> create 2 sqs
--> create sqs and atributte the two sqs to this sns

# get existent sns and attribute to a variable
topic_arn=$(aws sns list-topics --query 'Topics[0].TopicArn' --output text)

# publish message to the two sqs services
aws sns publish --topic-arn $topic_arn --message  "1 x Widget @ 21.99 USD\n2 x Widget Cables @ 5.99 USD"

# get sqs and attribute to a variable
analytics_queue_url=$(aws sqs list-queues --query 'QueueUrls[0]' --output text)
inventory_queue_url=$(aws sqs list-queues --query 'QueueUrls[1]' --output text)

# receive message sqs
aws sqs receive-message --queue-url $analytics_queue_url

inventory_message=$(aws sqs receive-message --queue-url $inventory_queue_url)

receipt_handle=$(echo $inventory_message | python -m json.tool | grep ReceiptHandle | cut -d\" -f 4)
aws sqs delete-message --queue-url $inventory_queue_url --receipt-handle $receipt_handle
