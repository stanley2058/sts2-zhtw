#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const repoRoot = path.dirname(__filename);

const extractedRoot = path.join(repoRoot, 'extracted_localization', 'localization');
const extractedZhsDir = path.join(extractedRoot, 'zhs');
const overrideDir = path.join(repoRoot, 'localization_override', 'zhs');
const extractedPatchNotesDir = path.join(extractedZhsDir, 'patch_notes');
const overridePatchNotesDir = path.join(overrideDir, 'patch_notes');

const spireExceptions = [
  '高塔炮手',
];

const normalizationRules = [
  [/Slay the Spire 2/g, '殺戮尖塔2'],
  [/屠戮這座尖塔/g, '征服尖塔'],
  [/屠戮尖塔/g, '征服尖塔'],
  [/啓/g, '啟'],
  [/纔/g, '才'],
  [/游戲/g, '遊戲'],
  [/意味着/g, '意味著'],
  [/裏/g, '裡'],
  [/爲/g, '為'],
  [/羣/g, '群'],
  [/衆/g, '眾'],
  [/響應/g, '回應'],
  [/刷新/g, '更新'],
  [/信息(?!素)/g, '訊息'],
  [/嗷/g, '喔'],
  [/髮送/g, '發送'],
  [/觀衆/g, '觀眾'],
];

const carryForwardOverrides = {
  'achievements.json': [
    'DEFEAT_ONE_BOSS.description',
    'DEFECT_WIN.description',
    'IRONCLAD_WIN.description',
    'NECROBINDER_WIN.description',
    'NO_RELIC_WIN.description',
    'REGENT_WIN.description',
    'SILENT_WIN.description',
  ],
  'ancients.json': [
    'ERROR.description',
    'TEZCATARA.talk.SILENT.2-0.ancient',
  ],
  'ascension.json': [
    'LEVEL_10.title',
  ],
  'card_library.json': [
    'SEARCH_PLACEHOLDER',
    'VIEW_STATS',
    'VIEW_UPGRADES',
  ],
  'card_selection.json': [
    'VIEW_UPGRADES',
  ],
  'cards.json': [
    'BEGONE.title',
    'SCAVENGE.title',
  ],
  'characters.json': [
    'IRONCLAD.description',
    'REGENT.description',
  ],
  'epochs.json': [
    'COLORLESS5_EPOCH.description',
    'COLORLESS5_EPOCH.title',
    'DEFECT6_EPOCH.unlockInfo',
    'IRONCLAD6_EPOCH.unlockInfo',
    'NECROBINDER4_EPOCH.description',
    'NECROBINDER6_EPOCH.unlockInfo',
    'REGENT2_EPOCH.description',
    'REGENT2_EPOCH.title',
    'REGENT6_EPOCH.unlockInfo',
    'SILENT6_EPOCH.unlockInfo',
  ],
  'extensions.json': [
    'EXTENSION.config.categoryWarning',
    'EXTENSION.config.inGameConnect',
    'EXTENSION.config.title',
    'EXTENSION.piles.clickHint.deck',
    'EXTENSION.piles.clickHint.discardPile',
    'EXTENSION.piles.clickHint.drawPile',
    'EXTENSION.tutorial.hoverIndicator',
    'EXTENSION.tutorial.title',
  ],
  'events.json': [
    'BRAIN_LEECH.pages.SHARE_KNOWLEDGE.description',
    'DENSE_VEGETATION.pages.TRUDGE_ON.description',
    'DOORS_OF_LIGHT_AND_DARK.pages.DARK.description',
    'DOORS_OF_LIGHT_AND_DARK.pages.LIGHT.description',
    'ERROR.description',
    'FAKE_MERCHANT.talk.openInventory.line2',
    'FAKE_MERCHANT.talk.openInventory.line8',
    'FAKE_MERCHANT.talk.playerDead.line1',
    'FAKE_MERCHANT.talk.purchaseFailureGold.line3',
    'FAKE_MERCHANT.talk.purchaseFailureSpace.line3',
    'FAKE_MERCHANT.talk.purchaseSuccess.line6',
    'LOST_WISP.pages.INITIAL.options.SEARCH.title',
    'TRASH_HEAP.pages.INITIAL.description',
  ],
  'game_over_screen.json': [
    'SCORE_LINE.bossesSlain',
  ],
  'gameplay_ui.json': [
    'GAME_SAVED',
    'PAUSE_MENU.SAVE_AND_QUIT',
    'PAUSE_MENU.SETTINGS',
    'QUIT_AND_JOIN_CONFIRMATION.body',
    'VIEW_UPGRADES',
  ],
  'game_modes.json': [
    'SINGLE_PLAYER_STANDARD.description',
  ],
  'main_menu_ui.json': [
    'CARD_LIBRARY_SEARCH',
    'CARD_LIBRARY_VIEW_UPGRADE',
    'COMPENDIUM_ACHIEVEMENTS.description',
    'COMPENDIUM_ACHIEVEMENTS.title',
    'COMPENDIUM_BESTIARY.description',
    'COMPENDIUM_CARD_LIBRARY.description',
    'COMPENDIUM_POTION_LAB.description',
    'CONTINUE_RUN_INFO.saved',
    'CUSTOM.description',
    'CUSTOM_MP.description',
    'CUSTOM_RUN_SCREEN.MODIFIERS_TITLE',
    'DAILY_RUN_MENU.MODIFIERS',
    'EARLY_ACCESS_DISCLAIMER.description_controller',
    'EARLY_ACCESS_DISCLAIMER.description_mkb',
    'INVALID_SAVE_POPUP.description_progress',
    'INVALID_SAVE_POPUP.description_run',
    'INVALID_SAVE_POPUP.description_settings',
    'INVALID_SAVE_POPUP.title',
    'LOADING_OVERLAY.label',
    'MODDED_WARNING',
    'MODDING_POPUP.description',
    'MODDING_POPUP.load_mods',
    'MODDING_POPUP.title',
    'MOD_ERROR.ASSEMBLY_LOAD',
    'MOD_ERROR.EXCEPTION',
    'MOD_ERROR.NONE',
    'MOD_NOT_LOADED_POPUP.title',
    'MULTIPLAYER_WARNING_POPUP.body',
    'NETWORK_ERROR.report_bug',
    'MP_LOAD.description',
    'RUN_HISTORY.description',
    'SETTINGS',
    'STANDARD.description',
    'STANDARD_MP.description',
    'STATISTICS.OVERALL.title',
    'STATISTICS.description',
    'STATISTICS.title',
  ],
  'map.json': [
    'LEGEND_BOSS.hoverTip.title',
    'LEGEND_BOSS.title',
  ],
  'relics.json': [
    'LAVA_ROCK.description',
    'PANTOGRAPH.description',
  ],
  'monsters.json': [
    'ENTOMANCER.moves.PHEROMONE_SPIT.title',
  ],
  'rich_presence.json': [
    'LOADING_MP_LOBBY',
  ],
  'settings_ui.json': [
    'DISCONNECT_CONFIRMATION.body',
    'DISPLAY_BLOCKED_DAMAGE',
    'FEEDBACK_CATEGORY.feedback',
    'FEEDBACK_CATEGORY_LABEL',
    'FEEDBACK_DESCRIPTION_PLACEHOLDER',
    'FEEDBACK_SENDING_LABEL',
    'FEEDBACK_SEND_SUCCESS_LABEL',
    'GAMEPLAY',
    'INPUT_SETTINGS.INPUT_TITLE.peek',
    'INPUT_SETTINGS.INPUT_TITLE.viewDeck',
    'INPUT_SETTINGS.INPUT_TITLE.viewDiscard',
    'INPUT_SETTINGS.INPUT_TITLE.viewDraw',
    'INPUT_SETTINGS.INPUT_TITLE.viewExhaust',
    'INPUT_SETTINGS.INPUT_TITLE.viewMap',
    'MODDING_SCREEN.INSTALLED_MODS_TITLE',
    'MODDING_SCREEN.MOD_UNLOADED_DESCRIPTION',
    'MODDING_SCREEN_BUTTON_LABEL',
    'RESET_CONFIRMATION.header',
    'RESET_GAMEPLAY_CONFIRMATION.body',
    'RESET_GRAPHICS_CONFIRMATION.body',
    'SAVE_EXIT',
    'SEND_FEEDBACK',
    'SEND_FEEDBACK_BUTTON_LABEL',
    'SHOW_MP_DRAWINGS_DESCRIPTION',
    'TAB_GENERAL',
    'TAB_GRAPHICS',
    'TAB_INPUT',
    'TAB_SOUND',
    'WINDOW_RESIZE_HEADER',
    'WINDOW_RESIZING',
  ],
  'static_hover_tips.json': [
    'COMPENDIUM.description',
    'DECK.description',
    'DISCARD_PILE.description',
    'DRAW_PILE.description',
    'EXHAUST_PILE.description',
    'ROOM_BOSS.title',
    'SETTINGS.title',
  ],
  'stats_screen.json': [
    'ENTRY_ANCIENTS.top',
  ],
  'credits.json': [
    'EXIT_MESSAGE',
  ],
};

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
}

function listFiles(dirPath, extension) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return fs.readdirSync(dirPath)
    .filter((entry) => entry.endsWith(extension))
    .sort();
}

function readJson(filePath) {
  return JSON.parse(readFile(filePath));
}

function runOpenCC(input) {
  const result = spawnSync('opencc', ['-c', 's2t'], {
    input,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });

  if (result.error) {
    fail(`failed to run opencc: ${result.error.message}`);
  }

  if (result.status !== 0) {
    fail(`opencc exited with status ${result.status}: ${result.stderr}`);
  }

  return result.stdout;
}

function normalizeSpire(text) {
  const sentinels = new Map();
  let normalized = text;

  spireExceptions.forEach((exception, index) => {
    const sentinel = `__SPIRE_EXCEPTION_${index}__`;
    sentinels.set(sentinel, exception);
    normalized = normalized.split(exception).join(sentinel);
  });

  normalized = normalized.split('高塔').join('尖塔');

  for (const [sentinel, exception] of sentinels.entries()) {
    normalized = normalized.split(sentinel).join(exception);
  }

  return normalized;
}

function normalizeText(text) {
  let normalized = normalizeSpire(text);

  for (const [pattern, replacement] of normalizationRules) {
    normalized = normalized.replace(pattern, replacement);
  }

  return normalized;
}

function extractTemplateTokens(text) {
  const placeholders = text.match(/\{[^{}]+\}/g) ?? [];
  const bbcode = text.match(/\[(?:\/)?[a-z_]+(?:=[^\]]+)?\]/gi) ?? [];
  return {
    placeholders,
    bbcode,
    newlineCount: (text.match(/\n/g) ?? []).length,
  };
}

function normalizePlaceholderToken(token) {
  return token.replace(/\p{Script=Han}+/gu, '漢');
}

function compareArrays(a, b) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function validateJsonTemplates(sourceJson, outputJson, fileName) {
  const sourceKeys = Object.keys(sourceJson);
  const outputKeys = Object.keys(outputJson);

  if (!compareArrays(sourceKeys, outputKeys)) {
    fail(`${fileName} key order or key set changed during rebuild`);
  }

  for (const key of sourceKeys) {
    const sourceValue = sourceJson[key];
    const outputValue = outputJson[key];

    if (typeof sourceValue !== 'string' || typeof outputValue !== 'string') {
      continue;
    }

    const sourceTokens = extractTemplateTokens(sourceValue);
    const outputTokens = extractTemplateTokens(outputValue);

    const normalizedSourcePlaceholders = sourceTokens.placeholders.map(normalizePlaceholderToken);
    const normalizedOutputPlaceholders = outputTokens.placeholders.map(normalizePlaceholderToken);

    if (!compareArrays(normalizedSourcePlaceholders, normalizedOutputPlaceholders)) {
      fail(`${fileName}:${key} placeholder mismatch`);
    }

    if (!compareArrays(sourceTokens.bbcode, outputTokens.bbcode)) {
      fail(`${fileName}:${key} BBCode mismatch`);
    }

    if (sourceTokens.newlineCount !== outputTokens.newlineCount) {
      fail(`${fileName}:${key} newline count mismatch`);
    }
  }
}

function applyCarryForwardOverrides(fileName, outputJson, previousJson) {
  const keys = carryForwardOverrides[fileName] ?? [];
  for (const key of keys) {
    if (key in previousJson) {
      outputJson[key] = typeof previousJson[key] === 'string'
        ? normalizeText(previousJson[key])
        : previousJson[key];
    }
  }
}

function findUnexpectedGaota(text) {
  const matches = [];
  let index = text.indexOf('高塔');

  while (index !== -1) {
    const isException = spireExceptions.some((exception) => text.startsWith(exception, index));
    if (!isException) {
      matches.push(index);
    }
    index = text.indexOf('高塔', index + 1);
  }

  return matches;
}

if (!fs.existsSync(extractedZhsDir)) {
  fail(`missing extracted localization at ${extractedZhsDir}; run ./extract-localization-linux.sh first`);
}

ensureDir(overrideDir);

const extractedJsonFiles = listFiles(extractedZhsDir, '.json');
const previousJsonFiles = listFiles(overrideDir, '.json');

const previousJsonByFile = new Map(previousJsonFiles.map((fileName) => [fileName, readJson(path.join(overrideDir, fileName))]));

const summary = {
  filesWritten: 0,
  patchNotesWritten: 0,
  newFiles: [],
  removedFiles: [],
  newKeys: 0,
  changedKeys: 0,
  unchangedKeys: 0,
  removedKeys: 0,
};

for (const fileName of extractedJsonFiles) {
  const sourcePath = path.join(extractedZhsDir, fileName);
  const sourceJson = readJson(sourcePath);
  const openccJson = JSON.parse(runOpenCC(readFile(sourcePath)));

  const outputJson = {};
  for (const [key, value] of Object.entries(openccJson)) {
    outputJson[key] = typeof value === 'string' ? normalizeText(value) : value;
  }

  const previousJson = previousJsonByFile.get(fileName) ?? {};
  applyCarryForwardOverrides(fileName, outputJson, previousJson);

  validateJsonTemplates(sourceJson, outputJson, fileName);

  const outputPath = path.join(overrideDir, fileName);
  writeFile(outputPath, `${JSON.stringify(outputJson, null, 2)}\n`);
  summary.filesWritten += 1;

  if (!previousJsonByFile.has(fileName)) {
    summary.newFiles.push(fileName);
  }

  const sourceKeys = Object.keys(outputJson);
  const previousKeys = Object.keys(previousJson);

  for (const key of sourceKeys) {
    if (!(key in previousJson)) {
      summary.newKeys += 1;
    } else if (previousJson[key] === outputJson[key]) {
      summary.unchangedKeys += 1;
    } else {
      summary.changedKeys += 1;
    }
  }

  for (const key of previousKeys) {
    if (!(key in outputJson)) {
      summary.removedKeys += 1;
    }
  }

  const unexpectedGaota = Object.entries(outputJson)
    .filter(([, value]) => typeof value === 'string' && findUnexpectedGaota(value).length > 0)
    .map(([key]) => key);

  if (unexpectedGaota.length > 0) {
    fail(`${fileName} still contains unexpected 高塔 references: ${unexpectedGaota.join(', ')}`);
  }
}

for (const fileName of previousJsonFiles) {
  if (!extractedJsonFiles.includes(fileName)) {
    fs.rmSync(path.join(overrideDir, fileName), { force: true });
    summary.removedFiles.push(fileName);
  }
}

const extractedPatchNotes = listFiles(extractedPatchNotesDir, '.md');
const previousPatchNotes = listFiles(overridePatchNotesDir, '.md');

for (const fileName of extractedPatchNotes) {
  const sourcePath = path.join(extractedPatchNotesDir, fileName);
  const outputPath = path.join(overridePatchNotesDir, fileName);
  const translated = normalizeText(runOpenCC(readFile(sourcePath)));
  const unexpectedGaota = findUnexpectedGaota(translated);

  if (unexpectedGaota.length > 0) {
    fail(`patch_notes/${fileName} still contains unexpected 高塔 references`);
  }

  writeFile(outputPath, translated);
  summary.patchNotesWritten += 1;
}

for (const fileName of previousPatchNotes) {
  if (!extractedPatchNotes.includes(fileName)) {
    fs.rmSync(path.join(overridePatchNotesDir, fileName), { force: true });
  }
}

console.log(JSON.stringify(summary, null, 2));
