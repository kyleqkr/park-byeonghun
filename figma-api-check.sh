#!/bin/zsh

set -euo pipefail

if [[ -f ".env" ]]; then
  set -a
  source ./.env
  set +a
fi

if [[ -z "${FIGMA_TOKEN:-}" ]]; then
  echo "Missing FIGMA_TOKEN. Add it to .env or export it in your shell."
  exit 1
fi

if [[ -z "${FIGMA_FILE_KEY:-}" ]]; then
  echo "Missing FIGMA_FILE_KEY. Add it to .env or export it in your shell."
  exit 1
fi

curl --silent \
  --header "X-Figma-Token: ${FIGMA_TOKEN}" \
  "https://api.figma.com/v1/files/${FIGMA_FILE_KEY}" | head -c 1200

echo ""
echo ""
echo "Request finished. If you see JSON above, the API connection works."
