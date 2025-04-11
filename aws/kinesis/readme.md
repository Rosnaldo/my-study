- create a kinesis data streams
  - on-demand

```
#!/bin/bash

aws --version

# PRODUCER
# CLI v2
aws kinesis put-record --stream-name test
--partition-key user1 --data "user signup"
--cli-binary-format raw-in-base64-out

# CLI v1
aws kinesis put-record --stream-name test
--partition-key user1 --data "user signup"


# CONSUMER
# describe the stream
aws kinesis describe-stream --stream-name test

# consume some data
aws kinesis get-shard-iterator --stream-name test
--shard-id shardId-0000000000
--shard-iterator-type TRIM_HORIZON

aws kinesis get-records --shard-iterator <>
```


