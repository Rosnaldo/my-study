In a Freestyle Project if server stops the building will terminate.  
In a Pipeline if the server stops and restarts it will resume. 

```bash
java -jar jenkins-cli.jar -s http://[ip]:[port]/ -auth [admin]:[password] build parameterized-pipeline-job -f -d BRANCH_NAME=test

curl -u [admin]:[password] \
-X POST http://localhost:8080/pluginManager/installNecessaryPlugins \
-H 'Content-Type: text/xml' \
-d '<jenkins><install plugin="[plugin]@[version]" /></jenkins>'

# generate crumb and store cookie
curl -s \
-u [admin]:[password] \
http://localhost:8080/crubIssuer/api/json
--cookie-jar /tmp/cookies | jq

curl -s -u admin:password \
--cookie /tmp/cookies \
-H "Jenkins-Crumb:[crumb]" \
-X POST http://localhost:8080/job/parameterized-pipeline-job/buildWithParameters \ 
-d BRANCH_NAME=test -d APP_PORT=6767
```