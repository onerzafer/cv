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
- Voice/text: free-form natural language, or a fixed command vocabulary?
