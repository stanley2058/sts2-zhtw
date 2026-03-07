# Slay the Spire 2 - 繁體中文漢化補丁

🎉 **目前支援至遊戲版本：v0.98.2** 🎉

這是一個為《殺戮尖塔 2》(Slay the Spire 2) 製作的全繁體中文漢化補丁包。

> 📢 **徵求翻譯校對與貢獻 (Help Wanted)**
> 目前專案內所有的遊戲文本，均初階採用程式進行「極簡的簡體轉正體」轉換而已，很多卡牌與專有名詞可能尚未符合台灣在地化的慣用語。
> 非常歡迎各位玩家協助修正語句，並透過提出 **Pull/Merge Request (MR)** 幫忙校正到適合繁體中文的用詞！讓我們一起完善這款遊戲的翻譯！

---

## 📁 漢化包安裝教學

由於本作引擎的安全機制，本補丁採用最安全的手動「外掛覆蓋」方式安裝。跟著這三個簡單步驟就能搞定！

1. **下載並解壓縮**
   - 請前往最新發布頁面：👉 **[點我前往下載最新版本的安裝包 (Latest Release)](https://github.com/www10177/sts2-zhtw/releases/latest)**
   - 點擊網頁下方的 `Source code (zip)` 下載檔案。
   - 下載後，**請務必在檔案上按右鍵選擇「解壓縮全部...」**，把檔案解壓縮出來。

2. **打開遊戲資料夾**
   - 按下鍵盤的 `Windows 鍵 + R` 打開「執行」小視窗。
   - 在輸入框裡面貼上這段字：`%APPDATA%\SlayTheSpire2`
   - 按下 Enter（確定），就會跳出遊戲的系統資料夾視窗。

3. **丟入漢化檔案**
   - 在你剛才解壓縮的漢化包裡面，找到一個名為 `localization_override` 的資料夾。
   - 對著它點右鍵「**複製**」。
   - 回到步驟 2 打開的那個系統資料夾視窗裡，在空白處點右鍵「**貼上**」。
   - _(如果電腦問你是否覆蓋或取代檔案，點選「是」就好了！)_

4. **進遊戲享受**
   - 打開遊戲，去 Settings (設定) 把語言切成 **「简体中文」**（因為官方還沒加繁中的選單，我們是借用它的位置），大功告成！遊戲會自動變成全繁體中文囉！

**✅ 正確安裝後的資料夾結構參考：**
如果你安裝正確，資料夾的路徑結構應該看起來像這樣：

```text
C:\Users\你的名字\AppData\Roaming\SlayTheSpire2\
 └── localization_override\
       ├── achievements.json
       ├── cards.json
       ├── events.json
       └── (還有其他大約 40 多個 .json 檔案...)
```

---

### 常見問題 Q&A

**Q: 為什麼遊戲更新後，有些字還是英文或簡體？**
A: 因為遊戲新增了新卡牌或怪物，我們還沒來得及翻譯。請隨時回來我們 GitHub 的 Releases 頁面下載最新版本覆蓋過去就好了！

**Q: 這個會導致壞檔或是 Steam 封鎖嗎？**
A: 絕對不會！我們用的 `localization_override` 是遊戲開發商 Godot 引擎官方原本就開放且推薦給玩家自製翻譯的方法，非常安全。

---

### 🎮 Steam Deck 安裝路徑

如果你是在 **Steam Deck** 上遊玩，遊戲透過 Proton 相容層執行，對應的安裝路徑如下：

```text
~/.steam/steam/steamapps/compatdata/2868840/pfx/drive_c/users/steamuser/AppData/Roaming/SlayTheSpire2/
```

請將 `localization_override` 資料夾放到上述路徑底下，最終結構應如下：

```text
~/.steam/steam/steamapps/compatdata/2868840/pfx/drive_c/users/steamuser/AppData/Roaming/SlayTheSpire2/
 └── localization_override/
       ├── achievements.json
       ├── cards.json
       ├── events.json
       └── (還有其他大約 40 多個 .json 檔案...)
```

> 💡 **提示：** 你可以在 Steam Deck 的桌面模式下，打開 Dolphin 檔案管理器，按 `Ctrl + L` 在網址列貼上路徑前往。如果找不到 `.steam` 資料夾，請先在檔案管理器中啟用「顯示隱藏檔案」。
