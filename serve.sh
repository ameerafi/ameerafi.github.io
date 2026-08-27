#!/usr/bin/env bash
# Local preview. Ctrl+C to stop.
cd "$(dirname "$0")" || exit 1
PORT=${1:-8000}
echo "→ http://localhost:$PORT"
python3 -m http.server "$PORT"
