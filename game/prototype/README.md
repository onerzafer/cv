# Battle sandbox (milestone 1)

A single HTML file with no dependencies: `battle-sandbox.html`. Open it in a browser. It is a design sandbox for the battle layer, not the shipped iOS code.

## What it has

- Five unit shapes (soldier dot, spearman triangle, cavalry dot with a rectangle horse, archer cross, catapult big dot), six groups per side, hills, forests, a pond.
- Particle movement with separation, formation slots, noise that grows as morale drops, and terrain.
- The death formula from spec 6.4 (contact power, exposure, support, attacker training). Morale never changes death chance directly.
- Local morale per group, contagion between nearby groups, fleeing and rallying, training resistance.
- Fixed hidden order delay of 20 s of battle time for every order (text, buttons and swipes).
- Visibility: the enemy reserve hides in the forest until a player unit comes within 30 m. Hills do not block sight yet.
- Enemy commander is a scripted stand-in (advance at 25 s, reserve charges when you come near). The real one is the on-device model.
- Text box with a keyword parser as a stand-in for the on-device model. Voice is not in the sandbox.
- Touch: one finger pans, two-finger swipe orders (toward the enemy advances, away retreats, other directions move), pinch zooms. Desktop: drag pans, wheel zooms.
- Speed-up 1x, 2x, 4x.

## What it does not have

Split, merge, parley, spies, campaign, history, audio, and the confirm-before-execute step for unclear orders.

## Differences from the design

- The group and action buttons under Options are a desktop test aid. The design has only text, voice and touch.
- After a typed command the log echoes how it was understood. This is a stand-in parser aid and is not in the spec for orders that parse cleanly.
- A debug switch shows pending orders and group morale. Off by default.

## Checks

`node prototype/run-checks.mjs` runs the scenarios in headless Chromium and prints JSON. Numbers below are desktop JavaScript and say nothing about iPhone speed.

| Check | Result |
|---|---|
| Console errors | none |
| Order delay | no movement before 20 s, about 15 m moved by 28 s |
| Spearmen vs cavalry charge, 5 seeds | spears lose 11 to 22 of 200, cavalry loses 34 to 48 |
| Cavalry vs thin untrained line, 5 seeds | line loses 46 to 78, cavalry loses 36 to 49 (charge bonus fires in about 25% of cavalry contacts, but cavalry does not clearly break the line: open gap) |
| Rout and fear spreading, 3 seeds | attacked untrained group flees at about 28 to 30 s; unattacked untrained neighbour flees at about 39 to 55 s; trained neighbour holds |
| Hidden reserve | 72 of 72 dots hidden from the player |
| Step time | about 0.6 ms (2,000 dots), 3.2 ms (10,000), 7.2 ms (20,000) per 1/30 s step |

## Constants changed during the run

- Death constant K raised from 0.03 to 0.10 and the morale loss coefficient from 2.2 to 3.5. This was done while the first scenario blocks were still far apart, so the early numbers were measuring the walk and not the fight. After moving the blocks close, the numbers above look plausible, so I kept the new values. Nothing else is tuned. Treat every constant as a first guess.
