# Plans: Medieval Battle Strategy (working title)

Status: draft for review. Date: 2026-10-24.
Inputs: `intent.md` (approved), `spec.md` (approved). Raw source: `notes.md`.

The workflow follows the intent, spec, plan, build, test, review loop. Each milestone has a kickoff gate: before any milestone starts, the plan for it is shown and you approve it. I did not find Anthropic's own playbook page, only secondary write-ups, so this is the standard structure and not an official template.

## What can and cannot be built in this cloud container

- This container has Node and Python and a headless browser. It has **no Swift toolchain, no Xcode and no iPhone**.
- So here I can build and test web sandboxes and write documents. I cannot build the iOS app, run Metal, or run Apple's on-device models.
- Milestones that need your Mac and iPhone are marked **[needs Mac/iPhone]**. For those, I write the code, and you build and run it, then give me the results.
- Where Swift logic can run on Linux (a platform-neutral Swift package), tests can also run in CI or on any machine with Swift. Check `which swift` on the target machine before relying on that.

## Repository layout (proposed)

```
CLAUDE.md                 project instructions
docs/notes.md             raw captured idea (source of truth for decided rules)
docs/intent.md  docs/spec.md  docs/plans.md
prototype/battle-sandbox.html   browser prototype (milestone 1)
ios/                      Xcode project and Swift packages (from milestone 2)
  Packages/Sim            CPU reference simulation, deterministic, no UI
  Packages/Campaign       world, economy, turn resolution
  Packages/Orders         Order schema and model prompts
  App/                    SwiftUI shell, Metal renderer, speech, audio
```

`Sim` and `Campaign` have no UI or model calls, so they are testable anywhere Swift runs.

## Milestones

Each milestone lists its goal, the spec parts it covers, the section 13 tests it satisfies, the section 14 risk it retires, where it can run, and its gate.

### M0. Project home
- **Goal:** the project lives in its own private repository with the docs, `CLAUDE.md`, and the prototype.
- **Status:** the docs, `CLAUDE.md` and prototype are ready in `game/` of the current repository. Creating the repository failed with a 403 (the connected GitHub integration cannot create repositories). To finish: create an empty private repository on your GitHub account, then I attach it and push.
- **Gate:** you approve the repository name and layout.

### M1. Battle sandbox (browser prototype): built, results below
- **Goal:** see the core idea working and get a first feasibility signal for the particle simulation.
- **Covers:** spec 6.2 to 6.6, 6.9, 7.2 (touch), 6.6 (hidden order delay), with a keyword parser standing in for the on-device model. Voice is not in the sandbox.
- **Results (desktop JavaScript, headless Chromium; not iPhone numbers).** Details and constants are in `prototype/README.md`.
  - Order delay: a group does not move before the delay and moves after it. Passes.
  - Spearmen against a cavalry charge (5 seeds): spearmen lose 11 to 22 of 200, cavalry loses 34 to 48. Passes.
  - Cavalry against a thin untrained line (5 seeds): the line loses 46 to 78, the cavalry loses 36 to 49. The charge bonus does fire, but cavalry does not clearly break the line. **Open gap**, not tuned.
  - Fear spreading (3 seeds): the attacked untrained group flees at about 28 to 30 s, an untrained neighbour that was never attacked flees later (about 39 to 55 s), and a trained neighbour never flees. Passes.
  - Hidden group: all 72 dots of the forest reserve are hidden from the player. Passes.
  - Speed: about 0.6 ms per step for 2,000 dots, 3.2 ms for 10,000 and 7.2 ms for 20,000 (a step is 1/30 s of battle time). This is a desktop signal only.
- **Risk retired:** partly. The simulation design works; phone performance is still unknown (M3).
- **Gate:** you try the published sandbox and tell me what to change.

### M2. Simulation core in Swift (CPU reference) **[needs Mac/iPhone to run on device; logic tests run on any Swift machine]**
- **Goal:** the deterministic `Sim` package, ported from the prototype's design, with seeded tests and a replayable log.
- **Covers:** 6.1 to 6.5, 6.8 (end conditions), visibility.
- **Tests:** 3, 4, 8 (training loss), 12 (hidden groups not visible).
- **Risk retired:** correctness and determinism.
- **Gate:** the unit-behaviour and rout scenarios pass on a fixed seed.

### M3. Metal compute and renderer, performance on device **[needs Mac/iPhone]**
- **Goal:** the simulation and drawing at real dot counts on an iPhone 15 Pro class device.
- **Covers:** spec 6.3, 9 (visuals), 11 (performance).
- **Tests:** 11 (frame rate at agreed dot counts).
- **Risk retired:** simulation cost on device. Final dots per side are set here (spec 15, item 8).
- **Gate:** measured numbers from the device and your decision on dot counts.

### M4. Commands: speech, text, touch, order delay **[needs Mac/iPhone]**
- **Goal:** speak or type a free-form order and see the army act after the hidden delay. Pan, swipe and zoom on touch.
- **Covers:** spec 6.6, 7.1, 7.2, the `Order` and `Mood` schemas, unclear-order confirmation.
- **Tests:** 1 (speech order), 2 (mood).
- **Risk retired:** quality of the on-device model for parsing and mood, and speech ambiguity. This milestone starts with a small test set of at least 50 phrases, run on device before the rest is built.
- **Gate:** the phrase set results and your call on whether the on-device model is good enough.

### M5. Campaign core (all code) **[logic runs on any Swift machine]**
- **Goal:** the `Campaign` package: world, cities, seasons, economy, taxes and welfare, unrest and rebellion, training, upkeep and desertion, marching and redirecting, garrisons, win and loss.
- **Covers:** spec 5.1 to 5.10, 5.5 (plain-code enemy rulers).
- **Tests:** 5, 6, 8, 7b (rulers respect limits).
- **Risk retired:** balance of the economy loop (first pass, by simulation of many seeds).
- **Gate:** simulated runs show the loop is balanced enough to play (neither always snowballing nor always collapsing).

### M6. Enemy commander, plans and spies **[needs Mac/iPhone for the model; plan data and spies run anywhere]**
- **Goal:** city plans decided early with spies and at battle setup otherwise; spy reports from true facts; the commander issues orders in the `Order` schema.
- **Covers:** spec 5.11, 6.7.
- **Tests:** 7, 7a.
- **Risk retired:** model call volume and not stalling the simulation.
- **Gate:** battles where the enemy visibly follows a plan and sometimes deviates.

### M7. Parley and the buzz voice **[needs Mac/iPhone]**
- **Goal:** up to three rounds of messages before a battle or during a march, with the model playing the enemy, and the procedural buzz voice and its text.
- **Covers:** spec 5.12.
- **Tests:** 10 (parley scenario checks).
- **Risk retired:** live logic being inconsistent or too easy to sweet-talk. Prompt tuning with scripted messages.
- **Gate:** the scripted message batch and your play-feel.

### M8. Pre-battle preparation
- **Goal:** the battle starts when the first army arrives, the early side prepares (conceal, split, merge), the gap length comes from the campaign map and is capped.
- **Covers:** spec 6.8, 5.10.
- **Tests:** 12.
- **Gate:** you can hide a group and surprise a late enemy.

### M9. History, lineage and narrative **[needs Mac/iPhone for the model]**
- **Goal:** run end for all three outcomes, history log, lineage picker, name generator, and the narrative written at run end by the on-device model; the home screen with year and headline.
- **Covers:** spec 8, 4.
- **Tests:** 9.
- **Gate:** a believable chronicle after several runs.

### M10. Polish, accessibility, balance, TestFlight
- **Goal:** colour palette checks, audio mute and captions, balance passes, resume after closing, TestFlight build.
- **Covers:** spec 9, 10, 11.
- **Gate:** you decide it is ready for a wider test.

## Order and dependencies

M0 and M1 first. M2 and M3 follow M1 (the prototype defines the design). M4 can start once M3 shows the simulation holds up, because its model tests are independent and risky, so I suggest running its **phrase test set early**, even before M3 finishes. M5 can run in parallel with M3 and M4. M6, M7 and M9 depend on M4 and M5. M8 depends on M2 and M5. M10 is last.

## Top risks and where they are handled

| Risk (spec section 14) | Handled in |
|---|---|
| Simulation cost on device | M1 first signal, M3 measured |
| Quality of the on-device model | M4 phrase test set, then M6, M7, M9 |
| Free-form speech ambiguity | M4 confirmation step and test set |
| Hidden-mechanics balance | M5 many-seed simulation, M10 |
| Narrative quality from a small model | M9, structured inputs |
| Live logic being inconsistent | M7 scripted batches |

## Kickoff gate for the next step

The next step is M0 (attach the repository) and your review of M1, the browser prototype. After that, you choose between starting M2 and M5 (code that runs anywhere) or M3 and M4 (code that needs your Mac and iPhone).
