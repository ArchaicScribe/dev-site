#!/usr/bin/env bash
# Reads .env.local and saves API keys to 1Password.
# Requires: 1Password CLI (op) — https://developer.1password.com/docs/cli/get-started/
# Run once: op signin

set -euo pipefail

ENV_FILE="$(dirname "$0")/../.env.local"

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: .env.local not found at $ENV_FILE"
  exit 1
fi

# Parse values from .env.local
ANTHROPIC_API_KEY=$(grep '^ANTHROPIC_API_KEY=' "$ENV_FILE" | cut -d '=' -f2-)
RESEND_API_KEY=$(grep '^RESEND_API_KEY=' "$ENV_FILE" | cut -d '=' -f2-)

if [ -z "$ANTHROPIC_API_KEY" ] || [ -z "$RESEND_API_KEY" ]; then
  echo "Error: One or more keys are empty in .env.local"
  exit 1
fi

ITEM_TITLE="dev-site (alexrauenzahn.dev)"

# Check if item already exists
if op item get "$ITEM_TITLE" --vault Personal &>/dev/null; then
  echo "Updating existing 1Password item: $ITEM_TITLE"
  op item edit "$ITEM_TITLE" \
    --vault Personal \
    "ANTHROPIC_API_KEY[password]=$ANTHROPIC_API_KEY" \
    "RESEND_API_KEY[password]=$RESEND_API_KEY"
else
  echo "Creating new 1Password item: $ITEM_TITLE"
  op item create \
    --category "API Credential" \
    --title "$ITEM_TITLE" \
    --vault Personal \
    "ANTHROPIC_API_KEY[password]=$ANTHROPIC_API_KEY" \
    "RESEND_API_KEY[password]=$RESEND_API_KEY"
fi

echo "Done. Keys saved to 1Password > Personal > $ITEM_TITLE"
