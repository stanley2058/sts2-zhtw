# Slay the Spire 2 zh-TW Translation SOP

This document defines the required workflow for updating `localization_override/zhs/` in this repo.

Even though the folder name is `zhs`, this repo uses it as the Traditional Chinese override payload for the game.

## Goal

Produce Traditional Chinese localization that:

- starts from the latest in-game Simplified Chinese translation
- preserves all technical syntax exactly
- stays faithful to the original English intent
- reads like polished game writing, with novelty, creativity, and storytelling where appropriate
- remains terminologically consistent across the whole project

## Non-Negotiable Rules

1. Use extracted `zhs` as the base for every line.
2. The first-pass conversion must use `opencc` with `s2t`.
3. Template syntax must follow `zhs` exactly, not `eng`.
4. `eng` is the intent reference, not the syntax reference.
5. `Spire` as a general place or concept must be translated as `尖塔`.
6. Proper nouns and established names that are exceptions to rule 5 must remain unchanged.
7. Entity names and system labels are not creative-writing targets. They must stay consistent.
8. Descriptions and narrative copy should optimize for novelty, creativity, and storytelling, but must not diverge from the original intent.

## Source Precedence

When sources disagree, use this precedence order:

1. Extracted `zhs` for structure, template syntax, placeholders, BBCode, SmartFormat, line breaks, spacing, and punctuation shape.
2. Project glossary and required terminology rules.
3. Project exception list.
4. Extracted `eng` for intended meaning, tone, and narrative purpose.
5. Creative polish.

In short:

`zhs syntax` > `glossary` > `exceptions` > `eng intent` > `creative polish`

## Locked vs Flexible Text

The following text must stay stable and consistent across the repo:

- entity names
- card types
- rarity labels
- mechanic labels
- status names
- keyword names
- UI system labels
- menu labels
- recurring proper nouns

The following text may be creatively improved as long as intent remains intact:

- descriptions
- flavor text
- event text
- epoch text
- banter and dialogue
- achievement descriptions
- non-system UI copy

Creative improvement does not allow changing gameplay meaning, template syntax, or established terminology.

## Required Terminology Rule

Translate `Spire` as `尖塔` when it refers to the place, the structure, the journey, or the general concept.

Required examples:

- `高塔故事` -> `尖塔故事`
- `生於高塔` -> `生於尖塔`
- `征服高塔` -> `征服尖塔`
- `高塔中` -> `尖塔中`
- `進入高塔` -> `進入尖塔`
- `殺死高塔` -> `殺死尖塔`

Do not force this replacement for established exception terms such as `高塔炮手`.

## Translation Workflow

Follow these steps in order for every update.

### 1. Extract latest game localization

Run:

```bash
./extract-localization-linux.sh
```

This refreshes `extracted_localization/localization/` from the installed game build.

### 2. Build the work set

Compare:

- extracted `zhs`
- extracted `eng`
- current `localization_override/zhs`

Classify keys into:

- new keys
- changed keys
- removed keys
- unchanged keys

Only new and changed keys enter the translation queue.

### 3. Create the first pass with OpenCC

For each file or work set, convert the extracted `zhs` text using `opencc` with `s2t`.

Required command form:

```bash
opencc -c s2t
```

This is the mechanical Traditional Chinese baseline. It is not the final translation.

### 4. Apply mandatory terminology normalization

After the `opencc` pass:

- enforce `Spire` references as `尖塔`
- preserve known exceptions such as `高塔炮手`
- normalize any locked project terms to their approved forms

This step happens before creative editing.

### 5. Run parallel review with 3 or more subagents

At least 3 review agents must inspect the same changed work set. Preferred setup is 4 agents.

Agent roles:

1. Syntax Guardian
   Checks placeholders, BBCode, SmartFormat, line breaks, spacing, punctuation shape, and all syntax parity against extracted `zhs`.
2. Terminology Guardian
   Enforces glossary consistency, `Spire -> 尖塔`, and exception handling.
3. Intent Guardian
   Checks the final line against extracted `eng` to ensure the original meaning, tone, and narrative intent remain intact.
4. Narrative Polish Guardian
   Improves flow, punch, readability, and storytelling while preserving all technical and intent constraints.

All agents review the same changed keys. Do not split responsibility by random file chunks alone.

### 6. Merge agent feedback in fixed order

Apply findings in this exact order:

1. syntax fixes
2. terminology fixes
3. intent corrections
4. narrative polish

This merge order is mandatory. Creative improvements must never override syntax correctness or terminology consistency.

### 7. Final human review

The final editor performs the last pass and decides unresolved cases.

The editor must check:

- consistency with approved names and terms
- fidelity to `eng` intent
- adherence to `zhs` syntax
- overall readability and game-writing quality

### 8. Update the override files

Only after all review stages are complete should `localization_override/zhs/` be updated.

## Per-Line Checklist

Every final line must pass all of the following checks:

1. It started from extracted `zhs`.
2. Its first pass came from `opencc -c s2t`.
3. Its placeholders exactly match extracted `zhs`.
4. Its BBCode exactly matches extracted `zhs`.
5. Its SmartFormat and branch syntax exactly match extracted `zhs`.
6. Its line breaks match extracted `zhs` unless there is a strong approved reason to differ.
7. Its meaning matches extracted `eng`.
8. `Spire` references are translated as `尖塔` unless the term is on the exception list.
9. Locked terms remain consistent with the rest of the project.
10. If the line is descriptive or narrative, it should read like polished game writing rather than literal machine-converted prose.

## Do Not Do This

Do not:

- translate directly from `eng` when `zhs` already exists
- copy `eng` template structure when it differs from `zhs`
- let creative rewriting change gameplay meaning
- rename established entities for style reasons
- introduce multiple variants for the same locked term
- bulk-replace `高塔` blindly without respecting exceptions

## Decision Rules for Ambiguous Cases

If a line is ambiguous, resolve it in this order:

1. check extracted `zhs`
2. check extracted `eng`
3. check approved term consistency elsewhere in the repo
4. preserve the safer gameplay meaning
5. apply creative polish only after the above is settled

If a term appears to conflict with the `Spire -> 尖塔` rule, treat it as an exception only when it behaves like an established name or proper noun.

## Output Quality Standard

The final zh-TW text should feel like:

- written for a commercial game
- natural in Traditional Chinese
- expressive and memorable in descriptions and story text
- stable and consistent in names and system terminology
- technically exact with respect to `zhs` syntax

If a choice is between a literal but flat line and a vivid line that preserves the same intent, prefer the vivid line for descriptions and narrative text.
