npm install
npm run build
# Use a venv to install pipenv (avoids PEP 668 externally-managed-environment on Homebrew Python)
if ! command -v pipenv &>/dev/null; then
  python3 -m venv .pipenv-venv
  .pipenv-venv/bin/pip install --quiet pipenv
  PIPENV_CMD=".pipenv-venv/bin/pipenv"
  # Use same Python for project venv so pipenv does not pick up a different interpreter (e.g. 3.14)
  export PIPENV_PYTHON=".pipenv-venv/bin/python"
else
  PIPENV_CMD="pipenv"
fi
# Create venv in project as .venv with Python 3.12 so we avoid Python 3.14 (Werkzeug/Flask use ast.Str removed in 3.14)
export PIPENV_VENV_IN_PROJECT=1
# Avoid isolated build env so ddtrace builds with this venv's setuptools (pkg_resources present)
export PIP_NO_BUILD_ISOLATION=1
$PIPENV_CMD install

