@echo off
chcp 65001 >nul
title 殺戮尖塔2 繁體中文補丁一鍵安裝包

echo ========================================================
echo        Slay the Spire 2 - 繁體中文漢化補丁安裝程式
echo ========================================================
echo.
echo [INFO] 正在準備安裝繁體中文語言包...

set "TARGET_DIR=%APPDATA%\SlayTheSpire2\localization_override"

:: 檢查來源資料夾是否存在 (確保玩家有解壓縮)
if not exist "%~dp0\localization_override" (
    echo.
    echo ❌ 錯誤：找不到 localization_override 資料夾！
    echo 請確定你已經把這個壓縮檔「完整解壓縮」到一個資料夾裡，
    echo 而不是在 ZIP 壓縮檔裡面直接雙擊執行喔！
    echo.
    pause
    exit /b
)

:: 建立與檢查目標目錄
if exist "%TARGET_DIR%\*" (
    echo.
    echo ⚠️ 偵測到遊戲目錄中已經安裝過漢化補丁（或存在舊檔案）。
    choice /C YN /M "是否要將現有翻譯檔案徹底覆蓋更新？"
    if errorlevel 2 (
        echo.
        echo 🚫 玩家選擇了取消安裝。
        pause
        exit /b
    )
    echo.
) else (
    echo [INFO] 遊戲資料夾內無定位目錄，正在為你自動建立...
    mkdir "%TARGET_DIR%"
)

:: 複製檔案
echo [INFO] 正在將中文翻譯檔案複製到遊戲的 Override 目錄中...
xcopy "%~dp0localization_override\*" "%TARGET_DIR%\" /E /Y /C /I >nul

if errorlevel 1 goto FAIL_LABEL
goto SUCCESS_LABEL

:SUCCESS_LABEL
echo.
echo ========================================================
echo   ✅ 安裝大成功！
echo ========================================================
echo.
echo  💡 最後一步：
echo    1. 啟動 Slay the Spire 2 遊戲
echo    2. 進入 Settings [設定]
echo    3. 將語言選項切換成「简体中文 - Simplified Chinese」
echo.
echo  遊戲就會載入我們提供的繁中字庫囉！祝你爬塔愉快！
echo.
goto END_LABEL

:FAIL_LABEL
echo ❌ 安裝失敗，請確認你的 C 槽是否有足夠空間，或者請先「關閉遊戲」後再試一次！
goto END_LABEL

:END_LABEL
pause
