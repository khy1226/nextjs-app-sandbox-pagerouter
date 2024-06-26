export NODE_TLS_REJECT_UNAUTHORIZED=0
export DD_SERVICE="nextjs"
export DD_ENV="prod"
export DD_LOGS_INJECTION=true
export DD_AGENT_PORT=8136
export DD_PROFILING_ENABLED=true
export NODE_OPTIONS='--require dd-trace/init'
# npm start TO USE IN PRODUCTION
npm run dev 
