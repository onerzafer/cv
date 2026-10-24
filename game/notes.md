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
- A language model analyses the free-form text and converts it into specific orders using Jev from TypeSafe AI (user said "jev"; a structured-decision model: given state and typed questions it returns choices/scores/probabilities rather than free text; vendor-claimed 70-500ms latency; API, early access since Sept 2026). Note: Jev is a cloud API, so it is not on-device like the iOS voice capture; Apple Foundation Models (on-device, iOS 26+) is a candidate for the fallback.
- Network connectivity is acceptable during battle (Jev is the primary path), but there must be an on-device fallback model for order parsing when offline or Jev fails.
- The same analysis also reads the tone/mood of what the player says and applies it to the army's morale:
  - Insulting or disrespectful orders (e.g. "useless sh*ts, attack") can have an adverse effect on morale.
  - Heroic or inspiring speech (e.g. "we came here to liberate these barbarians, save the slaves and protect the lands we have") raises morale and boosts certain dynamics.
- Morale affects movement speed, cohesion (how tightly dots stay together), and fleeing.
- Morale has no direct death-chance rule. It affects survival only indirectly, through cohesion, fleeing and support (as in real armies, where most deaths happen when a broken side flees and is cut down, and where tight formations protect each soldier).
- Morale is dynamic: it can decay, change, or recover over time (e.g. through events in the battle, not only speech).
- Morale is local, not army-wide: a group that gets cornered can become fearful and disoriented while the rest of the army stays fine.
- Fear spreads to nearby groups (contagion), so a local rout can cascade if neighbours are not well trained.
- How well a group resists fear depends on its training (trained units hold, untrained ones break), which links to spending money on training.

### Units / visuals
- Soldiers are tiny dots; no detail on soldiers.
- Movement is particle-based fluid dynamics: units flow around field obstacles (hills etc.).
- Fluid dynamics drives all movement AND the battle itself: opposing infantry can mix together during a fight.
- Each dot's probability of dying depends on local conditions: how surrounded it is, how supported it is by friendly dots nearby, etc. (emergent combat, no scripted duels).
- Bigger dots are catapults that throw rocks.
- Pointy dots are spearmen. Strong against cavalry.
- Cavalry: dots with rectangle horses (rectangle shape attached to the dot). Charge fast and break through lines.
- Archers: dots with tiny cross lines (shape, not colour) that shoot arrows (small projectiles) from range.

### Scale and order delivery
- Battles run in real time, and the player can speed time up.
- Realistic scale: dots are people and the field is a couple of kilometres across.
- Reactions are not immediate. The army is huge and responds slowly, like a real one.
- Orders must be physically delivered in medieval ways: horns, flags, or horse messengers.
- Messengers, horns and flags are not simulated entities. They are only a way of calculating the delay (no interception, no visible riders).
- The delay is a fixed value, not shown to the player, purely a mechanic.
- Because of the delay, this naturally hides the AI latency (Jev or fallback).

### Training
- Training can be applied per group and per unit.
- Training changes the shade of the dots, so trained units are visibly distinct.
- Training level is shown as a shade of the player's nation colour. Unit type is shown by shape (pointy, rectangle horse, cross lines, bigger dot).
- Trained groups are more expensive.
- Trained groups react more easily to orders, are hard to demoralize and scare, move fast, and have a better chance to kill or hit the target.

### Campaign / world
- Persistent world of cities/nations. The player chooses whether to go to war with a city; skipping a war is a valid choice.
- The player picks the target from a map of cities.
- The map shows a world of small cities. The player starts as one of them (the first city) and conquers the others to build a kingdom.
- Conquered cities join the player's kingdom, and pay taxes to the player. The city economy (trade, taxes, welfare, happiness) applies to them as part of the kingdom.
- The player sets the tax rate and welfare spending per city. If a city dislikes it (unhappy population), it can rebel and go independent through an uprising, becoming a separate city again that the player may have to reconquer.
- A rebelling city gets its own army, built from its own economy.
- Rebellion is gradual (unrest builds up over turns) and can be prevented by garrisoning troops in the city and by welfare spending.
- Enemy cities are not fully known on the map. The player can spend money on spies to learn more about a city's wealth, army and strength; without spies the information is partial.
- Spies can reveal army size and composition, and also enemy tactics: fake retreats, forces hidden behind hills or under trees, a weak wing (e.g. right wing weakest against cavalry), etc.
- The level of detail depends on how much money is spent.
- Intelligence is probabilistic: spies can fail, die or be captured, and information can be wrong or leaked. This is hidden from the player and is only a randomization formula, with no visible spy missions, deaths or captures.
- Rising unrest is shown on the city itself on the map.
- Garrison troops are split off from the player's battle army, so every garrison weakens the army available for the next fight.
- Garrisons and the field army both cost upkeep every turn.
- Unpaid upkeep (or unfed troops) causes desertion and lower morale. If it continues the player can lose the army completely.
- Losing the army ends the run: the player vanishes from history as a failed feudal leader. If the player chooses to play again, a new leader appears somewhere else in the world (a new start, not a continuation). The new leader starts from a random location and the map is regenerated each run with new cities. Each run is fully fresh: nothing carries over.
- Rebel cities get back their original colour.
- A rebel army starts weak and hardens each turn (more training and strength), so reconquering sooner is easier. This pushes the player to act quickly against uprisings.
- A city's army depends on its richness and on time. If we leave a city alone, it may spend money, grow and train its army, so it is stronger when we return.
- Campaign time is turn-based (battles are real time; the campaign advances in turns). One turn is one season.
- Time passes between battles and cities evolve, so timing of when to attack matters.

### City economy (simulated balance)
- Cities earn money from trade and taxes, scaled by city size.
- More money allows a bigger possible army and more trade, which feeds back into more money.
- The tax rate sets how favourable the population is toward the city/ruler.
- A bigger army means less spending on welfare and services, so fewer people want to live there, which lowers income and eventually shrinks the army.
- The intent is a simulated balance loop between size, wealth, army, taxes and population happiness, rather than scripted growth.
- This runs every campaign turn (season) and is what makes a left-alone city stronger or weaker when we return.

### Opponent
- Enemy armies are coloured per city or nation (faction identity), not by training. The player cannot see enemy training.
- The player's army is also one of the nation colours. Training level is shown by the shade of that colour (not a different hue).
- Nations differ in army composition (e.g. one is cavalry-heavy, another archer-heavy), so each enemy plays differently.
- The player picks their own nation colour; the remaining colours are distributed among the other cities/nations (so the enemy never shares the player's colour).
- The player must infer enemy quality from behaviour: are units well spaced and aligned, small disorders, do they block each other when moving, do they panic or scare easily, etc.
- Controlled by AI or algorithms.
- Open field battle only, no castle or fixed target.

### Economy / progression
- As invaders, we earn money by winning battles.
- Money is spent to train the army, recruit, or feed the soldiers.

## Open questions
- Spies: does intel go stale after a turn? Does the player see how reliable the intel is (e.g. a confidence hint) or just the result?
- Tactics intel: how is it delivered to the player (text report, map markers) and how does it feed the enemy AI's actual behaviour in the battle?
- Map: what is visible about each city without spies (size, nation colour, distance)?
- Is there a win condition? Other ways to lose besides losing the army (e.g. losing the original city)?
- Do cities conquer or fight each other, or do they only evolve on their own?
- Can the player's own army grow or decay between battles (upkeep, feeding, desertion)?
- Fallback scope: should the on-device model also read mood/morale, or only extract orders?
- Training: how many shade levels? Does training cost money once or also upkeep?
