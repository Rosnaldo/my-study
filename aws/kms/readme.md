# encryption
aws kms encrypt --key-id alias/tutorial --paintext file://ExamplSecretFile.txt --output text --query CiphertextBlob --region eu-west-2 > ExampleSecretFileEncrypted.base64

# base64 decode for Linux or Mac OS
cat ExampleSecretFileEncrypted.base64 | base64 --decode > ExampleSecretFileEncrypted

# decryption
aws kms decrypt --ciphertext-blob file://ExampleSecretFileEncrypted --output text --query Paintext > ExampleFileDecrypted.base64 --region eu-west-2

# base64 decode for Linux or Mac OS
cat ExampleFileDecrypted.base64 | base --decode > ExampleFileDecrypted.txt
