export FLASK_APP=app
export FLASK_ENV=development
export FLASK_DEBUG=1
export DD_SERVICE="dummy-server" 
export DD_ENV="prod" 
export DD_AGENT_PORT=8126
export DD_LOGS_INJECTION=true 
export DD_PROFILING_ENABLED=true
# Prefer in-project .venv (Python 3.12) over global pipenv venv (may be 3.14)
export PIPENV_VENV_IN_PROJECT=1
if command -v pipenv &>/dev/null; then
  pipenv run ddtrace-run flask run --host=0.0.0.0 --port=443 --cert=adhoc
else
  ./.pipenv-venv/bin/pipenv run ddtrace-run flask run --host=0.0.0.0 --port=443 --cert=adhoc
fi