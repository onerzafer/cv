# Game Notes

Raw capture of the game idea, in the order given. Not yet edited into intent/spec/plans.

## Captured

### Concept
- Mobile game, battle strategy, top-down view.
- Random battlefield each battle (generated).
- Medieval setting (Middle Ages).
- Player is the invader.

### Controls
- Only controls: a text box, finger gestures, or voice.
- Voice: use on-device iOS models to capture voice and convert to text.
- Example commands: "middle hold", "right wing advance". Soldiers do as said.
- Voice and text input are free-form natural language, not a fixed command vocabulary.
- A language model analyses the free-form text and converts it into specific orders using Jev from TypeSafe AI (user said "jev"; a structured-decision model: given state and typed questions it returns choices/scores/probabilities rather than free text; vendor-claimed 70-500ms latency; API, early access since Sept 2026). Note: Jev is a cloud API, so it is not on-device like the iOS voice capture; Apple Foundation Models (on-device, iOS 26+) is an alternative to compare.
- The same analysis also reads the tone/mood of what the player says and applies it to the army's morale:
  - Insulting or disrespectful orders (e.g. "useless sh*ts, attack") can have an adverse effect on morale.
  - Heroic or inspiring speech (e.g. "we came here to liberate these barbarians, save the slaves and protect the lands we have") raises morale and boosts certain dynamics.

### Units / visuals
- Soldiers are tiny dots; no detail on soldiers.
- Movement is particle-based fluid dynamics: units flow around field obstacles (hills etc.).
- Fluid dynamics drives all movement AND the battle itself: opposing infantry can mix together during a fight.
- Each dot's probability of dying depends on local conditions: how surrounded it is, how supported it is by friendly dots nearby, etc. (emergent combat, no scripted duels).
- Bigger dots are catapults that throw rocks.
- Pointy dots are spearmen. Strong against cavalry.
- Cavalry: dots with rectangle horses (rectangle shape attached to the dot). Charge fast and break through lines.
- Archers: specially coloured dots that shoot arrows (small projectiles) from range.

### Opponent
- Controlled by AI or algorithms.
- Open field battle only, no castle or fixed target.

### Economy / progression
- As invaders, we earn money by winning battles.
- Money is spent to train the army, recruit, or feed the soldiers.

## Open questions
- Jev is a cloud API, voice capture is on-device: is network required during battle, or do we need an on-device fallback (e.g. Apple Foundation Models)? Latency budget for an order?
- Morale: which dynamics does it affect (speed, cohesion, death chance, will to flee)? Does it decay over time?
