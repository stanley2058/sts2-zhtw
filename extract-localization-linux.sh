#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEFAULT_GAME_DIR="/mnt/steam/steam/steamapps/common/Slay the Spire 2"
GAME_DIR="${1:-${STS2_GAME_DIR:-$DEFAULT_GAME_DIR}}"
OUTPUT_DIR="${2:-${STS2_OUTPUT_DIR:-$SCRIPT_DIR/extracted_localization/localization}}"

print_usage() {
  printf 'Usage: %s [game_dir] [output_dir]\n' "$(basename "$0")"
  printf '\n'
  printf 'Defaults:\n'
  printf '  game_dir   = %s\n' "$DEFAULT_GAME_DIR"
  printf '  output_dir = %s\n' "$SCRIPT_DIR/extracted_localization/localization"
  printf '\n'
  printf 'Env overrides:\n'
  printf '  STS2_GAME_DIR   Game install directory\n'
  printf '  STS2_OUTPUT_DIR Output directory for extracted files\n'
  printf '  GODOT_BIN       Godot executable to use\n'
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  print_usage
  exit 0
fi

if [[ $# -gt 2 ]]; then
  print_usage >&2
  exit 1
fi

if [[ -n "${GODOT_BIN:-}" ]]; then
  GODOT_CMD="$GODOT_BIN"
elif command -v godot >/dev/null 2>&1; then
  GODOT_CMD="godot"
elif command -v godot4 >/dev/null 2>&1; then
  GODOT_CMD="godot4"
else
  printf 'Error: could not find a Godot executable. Set GODOT_BIN to continue.\n' >&2
  exit 1
fi

if ! command -v "$GODOT_CMD" >/dev/null 2>&1; then
  printf 'Error: GODOT_BIN points to a missing executable: %s\n' "$GODOT_CMD" >&2
  exit 1
fi

if ! command -v rsync >/dev/null 2>&1; then
  printf 'Error: rsync is required but was not found.\n' >&2
  exit 1
fi

PCK_PATH="$GAME_DIR/SlayTheSpire2.pck"
EXTRACT_PROJECT_DIR="$GAME_DIR/extract_project"
EXTRACT_SCRIPT="$EXTRACT_PROJECT_DIR/extract.gd"

if [[ ! -f "$PCK_PATH" ]]; then
  printf 'Error: missing PCK file: %s\n' "$PCK_PATH" >&2
  exit 1
fi

if [[ ! -f "$EXTRACT_SCRIPT" ]]; then
  printf 'Error: missing extractor script: %s\n' "$EXTRACT_SCRIPT" >&2
  exit 1
fi

TMP_DIR="$(mktemp -d)"
cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

EXTRACT_DIR="$TMP_DIR/export"
mkdir -p "$EXTRACT_DIR"
mkdir -p "$OUTPUT_DIR"

printf '%s\n' '============================================================'
printf '%s\n' 'Slay the Spire 2 localization extractor'
printf '%s\n' '============================================================'
printf 'Game directory: %s\n' "$GAME_DIR"
printf 'Output directory: %s\n' "$OUTPUT_DIR"
printf 'Godot executable: %s\n' "$GODOT_CMD"
printf '\n'
printf '%s\n' 'Extracting localization from the current game build...'

"$GODOT_CMD" --headless \
  --path "$EXTRACT_PROJECT_DIR" \
  --script "$EXTRACT_SCRIPT" \
  -- "$PCK_PATH" "$EXTRACT_DIR"

printf '\n'
printf '%s\n' 'Copying extracted files into the repo...'
rsync -a --delete "$EXTRACT_DIR/localization/" "$OUTPUT_DIR/"

printf '\nDone.\n'
printf 'Extracted localization synced to: %s\n' "$OUTPUT_DIR"
printf 'Note: extracted_localization/ is ignored by git in this repo.\n'
