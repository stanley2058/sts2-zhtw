Slay the Spire 2 Traditional Chinese helper scripts

These scripts download the latest release from:
https://github.com/www10177/sts2-zhtw

What they do:
- Install or update the translation override
- Put it in the correct game data folder
- Back up your previous localization_override folder if one already exists

Optional env overrides for dev/debug:
- REPO_PATH = use a local repo checkout or a local localization_override folder
- UPSTREAM_URL = use a custom zip URL instead of the default latest release
- REPO_PATH takes priority over UPSTREAM_URL

Files in this folder:
- install-update-windows.cmd
- uninstall-windows.cmd
- install-update-linux.sh
- uninstall-linux.sh
- extract-localization-linux.sh
- TRANSLATION_SOP.md

Windows:
1. Double-click install-update-windows.cmd
2. Wait for it to finish
3. Open the game and set language to Simplified Chinese (简体中文)

Windows examples:
- Command Prompt: set REPO_PATH=C:\path\to\sts2-zhtw && install-update-windows.cmd
- Command Prompt: set REPO_PATH=C:\path\to\localization_override && install-update-windows.cmd
- Command Prompt: set UPSTREAM_URL=https://github.com/www10177/sts2-zhtw/archive/refs/heads/master.zip && install-update-windows.cmd
- PowerShell: $env:REPO_PATH='C:\path\to\sts2-zhtw'; .\install-update-windows.cmd

To remove it on Windows:
- Double-click uninstall-windows.cmd

Linux:
1. Open a terminal in this folder
2. Run: chmod +x install-update-linux.sh uninstall-linux.sh extract-localization-linux.sh
3. Run: ./install-update-linux.sh
4. Open the game and set language to Simplified Chinese (简体中文)

Linux examples:
- REPO_PATH=. ./install-update-linux.sh
- REPO_PATH=/path/to/sts2-zhtw ./install-update-linux.sh
- REPO_PATH=/path/to/localization_override ./install-update-linux.sh
- UPSTREAM_URL=https://github.com/www10177/sts2-zhtw/archive/refs/heads/master.zip ./install-update-linux.sh

To remove it on Linux:
- Run: ./uninstall-linux.sh

To re-extract the game's built-in localization on Linux:
- Run: ./extract-localization-linux.sh
- Default game path: `/mnt/steam/steam/steamapps/common/Slay the Spire 2`
- Default output path: `./extracted_localization/localization`
- Custom paths: `./extract-localization-linux.sh /path/to/game /path/to/output`
- Env overrides: `STS2_GAME_DIR=/path/to/game STS2_OUTPUT_DIR=/path/to/output GODOT_BIN=godot ./extract-localization-linux.sh`

Install location used by these scripts:
- Windows: %APPDATA%\SlayTheSpire2
- Linux: ~/.local/share/SlayTheSpire2

Notes:
- Running the install script again updates to the latest release
- The uninstall script removes the current override
- If the installer made a backup, the uninstall script restores that backup
- `extracted_localization/` is ignored by git, so fresh exports will not appear in `git status`
- Translation process is documented in `TRANSLATION_SOP.md`
