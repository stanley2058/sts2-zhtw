Slay the Spire 2 Traditional Chinese localization workspace

This repo contains the Traditional Chinese `localization_override` payload and the helper scripts used to maintain it.

What is in this repo:
- `localization_override/` - the translation override to copy into the game data folder
- `extract-localization-linux.sh` - re-extract the game's built-in localization on Linux
- `rebuild-zhtw-from-zhs.mjs` - rebuild the zh-TW override from extracted `zhs`
- `TRANSLATION_SOP.md` - required translation workflow and rules

Install location used by the game:
- Windows: `%APPDATA%\SlayTheSpire2`
- Linux: `~/.local/share/SlayTheSpire2`

How to install the override manually:
1. Copy this repo's `localization_override/` folder into the game's data folder.
2. The final path should look like:
   - Windows: `%APPDATA%\SlayTheSpire2\localization_override\zhs\...`
   - Linux: `~/.local/share/SlayTheSpire2/localization_override/zhs/...`
3. Open the game and set language to Simplified Chinese (`简体中文`).

Linux example:
```bash
rsync -a --delete ./localization_override/ ~/.local/share/SlayTheSpire2/localization_override/
```

How to remove the override manually:
- Delete `localization_override/` from the game data folder.

To re-extract the game's built-in localization on Linux:
- Run: `./extract-localization-linux.sh`
- Default game path: `/mnt/steam/steam/steamapps/common/Slay the Spire 2`
- Default output path: `./extracted_localization/localization`
- Custom paths: `./extract-localization-linux.sh /path/to/game /path/to/output`
- Env overrides: `STS2_GAME_DIR=/path/to/game STS2_OUTPUT_DIR=/path/to/output GODOT_BIN=godot ./extract-localization-linux.sh`

To rebuild the zh-TW override from extracted `zhs`:
- Run: `node ./rebuild-zhtw-from-zhs.mjs`

Notes:
- `extracted_localization/` is ignored by git, so fresh exports will not appear in `git status`
- Translation process is documented in `TRANSLATION_SOP.md`
