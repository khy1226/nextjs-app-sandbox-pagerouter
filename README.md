Welcome to the training week!
Let's start by installing all the libraries!


### Commands
```
	./install.sh
```
- Now open the terminal
```
	./start_nextjs.sh
```
- If you have problem with the node version, instal nvm
```
	brew install nvm
	source ./export_nvm.sh
	nvm use 18.17.0
```
- Now open another terminal
```
	./start_python.sh
```

Now you have the solution up and running!

# Exercise 1
To begin with, create a nextjs application, add datadog RUM and datadog APM to it.
You can follow the following doc:
- https://nextjs.org/docs/pages/api-reference/create-next-app
- https://docs.datadoghq.com/real_user_monitoring/guide/monitor-your-nextjs-app-with-rum/?tab=npm
- https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/

Note: ensure to run the nextjs app as https by adding --experimental-https in the package.json

# Exercise 2
On the newly created app, please try to:
- set context to identify each refresh
- set user data to recognise anonimous users
- create a proxy to a python app you can find in app.py. Run ./start_python.sh
- use beforeSend to track headers
- add APM header to all xhr / fetch requests

# Exercise 3
Error tracking lab
- on a browser, enabled the error tracking
- use datadog logger
- generate Sourcemap and upload them
