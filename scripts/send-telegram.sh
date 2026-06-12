#!/usr/bin/env bash
# Envoi Telegram via Bot API — nécessite TELEGRAM_BOT_TOKEN et TELEGRAM_CHAT_ID
set -euo pipefail

if [[ -z "${TELEGRAM_BOT_TOKEN:-}" || -z "${TELEGRAM_CHAT_ID:-}" ]]; then
  echo "ERREUR: TELEGRAM_BOT_TOKEN et TELEGRAM_CHAT_ID requis" >&2
  exit 1
fi

API="https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}"

send_text() {
  local text="$1"
  curl -sS -X POST "${API}/sendMessage" \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg chat_id "$TELEGRAM_CHAT_ID" --arg text "$text" \
      '{chat_id: $chat_id, text: $text, parse_mode: "HTML"}')"
}

send_with_buttons() {
  local text="$1"
  local buttons="$2"
  curl -sS -X POST "${API}/sendMessage" \
    -H "Content-Type: application/json" \
    -d "$(jq -n \
      --arg chat_id "$TELEGRAM_CHAT_ID" \
      --arg text "$text" \
      --argjson buttons "$buttons" \
      '{chat_id: $chat_id, text: $text, parse_mode: "HTML", reply_markup: {inline_keyboard: $buttons}}')"
}

send_photo() {
  local photo="$1"
  local caption="$2"
  curl -sS -X POST "${API}/sendPhoto" \
    -H "Content-Type: application/json" \
    -d "$(jq -n \
      --arg chat_id "$TELEGRAM_CHAT_ID" \
      --arg photo "$photo" \
      --arg caption "$caption" \
      '{chat_id: $chat_id, photo: $photo, caption: $caption, parse_mode: "HTML"}')"
}

case "${1:-}" in
  text) send_text "$2" ;;
  buttons) send_with_buttons "$2" "$3" ;;
  photo) send_photo "$2" "$3" ;;
  *) echo "Usage: $0 {text|buttons|photo} ..." >&2; exit 1 ;;
esac
