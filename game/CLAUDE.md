# CLAUDE.md

Project: a medieval battle strategy game for iPhone (working title). You command armies of tiny dots by speaking or typing in plain language and by touch. Read the documents below before changing anything.

## Document map (read in this order)

Paths are for the project's own repository. While the files still live in the `game/` folder of another repository they sit flat, without the `docs/` folder.

1. `docs/notes.md`: raw captured idea in the owner's words. The source of truth for every **Decided** rule.
2. `docs/intent.md`: why and what (vision, pillars, non-goals, constraints). Approved.
3. `docs/spec.md`: how (rules, schemas, data model, acceptance tests). Approved. Section 15 holds accepted defaults.
4. `docs/plans.md`: milestones M0 to M10 with kickoff gates.
5. `prototype/battle-sandbox.html`: browser sandbox of the battle (milestone 1). Not the shipped code.

## Workflow

Capture, then intent, spec, plans, then one kickoff per milestone (the owner approves each before work starts), build, test, review.

- Any decided change goes into `docs/notes.md` first, then into `docs/intent.md` and `docs/spec.md`, and `docs/plans.md` if scope moves. Do not change the spec without recording why in the notes.
- Label what you add yourself as **Proposed**. Do not add game mechanics the owner did not ask for. The owner wants live logic and basic things, not rule tables.
- If two documents contradict each other, say so and ask. Do not silently pick one.

## The main invariant: code versus AI

- **Code:** the whole world (campaign, economy, enemy rulers' choices, spies) and the battle simulation (fluid movement, combat, morale, visibility). Deterministic and seeded.
- **AI (Apple's on-device Foundation Model):** parsing the player's words into orders and mood, the enemy commander (its plan and its orders in battle), parley conversations, and the history narrative.
- **The model is never in the simulation loop** and the simulation never waits for it.
- Spy reports are written only from true facts. The model may choose and phrase, but cannot state a falsehood.

## Platform constraints

- iOS 26 or later, Apple Intelligence devices only. Fully offline. Voice, parsing and narrative are on-device.
- This cloud container has no Swift, no Xcode and no iPhone. Work that needs them is marked in `docs/plans.md`. Do not claim iOS code was built or run unless it was.
- Do not report prototype timings as iPhone numbers.

## Conventions

- Shape means unit type, hue means nation, shade means training level (own army only). Enemy training is never shown.
- Order delay is fixed, hidden, and applies to speech, text and touch alike. Nothing is shown before an order takes effect.
- Messengers, spies and the order delay are never drawn on screen. Parley is heard (buzz voice) and read (text).
- Keep model identifiers out of every file and commit message.

## Commands

- Prototype: open `prototype/battle-sandbox.html` in a browser. It has no dependencies.
- Prototype check: `node prototype/run-checks.mjs` (headless sanity and timing; requires Playwright, which is pre-installed in the cloud container).

## Working with the owner

Short answers, plain language, and a clear list of what is still open. Decisions are theirs. Gate each milestone: show the plan, wait for approval.
