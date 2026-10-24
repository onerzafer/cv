# Game Notes

Raw capture of the game idea, in the order given. Not yet edited into intent/spec/plans.

## Captured

### Concept
- Mobile game, battle strategy, top-down view.
- Random battlefield each battle (generated). The terrain comes from the target city's surroundings.
- Medieval setting (Middle Ages).
- Player is the invader.

### Controls
- Only controls: a text box, finger gestures, or voice.
- Voice: use on-device iOS models to capture voice and convert to text.
- Gestures: a swipe over an area of the field advances the units in that area, or retreats them. (Gestures are order shortcuts; they go through the same order delay as speech.)
- Example commands: "middle hold", "right wing advance". Soldiers do as said.
- Voice and text input are free-form natural language, not a fixed command vocabulary.
- Apple's on-device Foundation Model (iOS 26+) analyses the free-form text and converts it into specific orders. Everything runs on-device, so no network is needed for order parsing. (Jev from TypeSafe AI was considered and dropped.)
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
- Because of the delay, this naturally hides the AI latency (on-device model).

### Training
- Training can be applied per group and per unit.
- Training changes the shade of the dots, so trained units are visibly distinct.
- Training level is shown as a shade of the player's nation colour. Unit type is shown by shape (pointy, rectangle horse, cross lines, bigger dot).
- Training has 10 shade levels. Training costs money once (no ongoing training cost, though the army still pays normal upkeep) and takes one season. A group trains one level per season. Many groups and units can train in parallel; money is the only limit. Trained units lose their training only after heavy losses, defined as more than half of the unit being gone (unpaid upkeep does not remove training). The cost of training rises with each level.
- Training loss scales with casualties: about 50% lost drops one level, 75% lost halves the levels, and 90% lost resets the unit to level one.
- Trained groups are more expensive.
- Trained groups react more easily to orders, are hard to demoralize and scare, move fast, and have a better chance to kill or hit the target.

### Campaign / world
- Win condition: conquer all the cities on the map.
- Cities do not fight or conquer each other; they only evolve on their own (economy, army). The player is the only conqueror.
- Victory shows an end screen. History records the feudal leader as the king; after the king's death, for some reason, the kingdom dissolves into new cities and a new game begins (a fresh run).
- History: the history of this imaginary land is a running log of previous games, shown only as end-screen/home-screen narrative. It carries no gameplay effect.
- History records both fallen leaders and victors (this replaces the earlier note that failed leaders vanish from history).
- Leader names are generated (not chosen by the player).
- Leaders are always the same lineage: each new leader is a relative of the previous one: a son, daughter, cousin, uncle or similar. There is always an heir, always related (this replaces the earlier "son of X"). The new leader rises from one of the new cities.
- Succession is the same whether the leader fell or won: everyone dies, early or late, and the next leader follows. It is only for the narrative, with no complex mechanic: a simple relationship picker, a gender picker and a name generator, using a simple but believable formula (nothing magical).
- AI writes the history narrative (titles and log entries) from what happened in each run (leader, cities, outcome), using Apple's on-device Foundation Model (so it works offline and needs iOS 26+ on an Apple Intelligence device). The narrative is generated at the end of a run.
- World time always moves forward across runs. The game starts at year 1. The next run starts later in history after a random gap (the AD 1000 to AD 1015 figures in the original example are only illustrative). The home screen shows a title such as "After the fall of X, new cities rose and a new leader rose from city X".
- There is no end year; the calendar runs forever. The gap length is random with no fixed range.
- The player always has at least one city. The last city is not immune: it can rebel based on taxes, but it is the home city of the king, so its population rebels less than the other cities.
- If the home city rebels, the player gets one last chance to recapture it, using the small garrison army that is always kept in the home city, in a normal real-time battle (garrison versus the rebel army) (the main army is split when raiding other cities, so some units always stay behind). If the player loses that last battle, the city is lost; if it was the last city, the run ends: history records the fallen feudal leader, time passes, and a new leader rises again in a random city.
- The time gap between one run ending and the next starting is random, but long enough to be realistic for old cities to dissolve and new ones to be built (read as the gap between runs; "between turns" in the original note, to confirm).
- The home screen shows the current year and this narrative title.
- A run ends in exactly three ways: the player conquers every city (victory), the army is lost completely, or the last city is lost. Losing the original city alone does not end the run.
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
- Spy reports are always true but incomplete. How much gets revealed is probabilistic: spies can fail, die or be captured.
- If a spy is captured, the enemy AI may react and change its plan or turn the leaked information to its own advantage, so intel gathered can end up slightly wrong by battle time (the report was true when written, not necessarily later). Whether a spy was captured is known to the player. Everything else about spies stays hidden: no visible missions or deaths, only a randomization formula behind the reports.
- Tactics intel is delivered as a text report.
- The enemy's plan, tactics and city state are generated whether or not spies exist, and the enemy AI drives the battle from that information. Spies do not change anything; they only reveal part of it (AI plans, city state, tactics such as fake retreats, hidden forces, weak wings).
- The enemy AI's adaptation is simulated with realistic conditions and limits: it needs money and time. For example, if it decides to train its army to cover a weakness and the player attacks right away, the training may not be finished and the weakness is still there.
- Within one season the enemy can train, recruit and move forces, but not all at once. The economy is the boundary (money is shared between options), and distances can be hard to traverse, limiting how fast forces can move.
- Travel time on the map depends on distance and terrain. The player's army travels too, and a march can take multiple seasons, and the army costs upkeep while marching. The player can redirect a march in progress.
- The player sees only the intel result, never a confidence hint or reliability indicator.
- Intel goes stale after one turn (one season), so it has to be bought again to stay current.
- Without spies the map shows only city size and nation colour. Unrest is shown on the player's own cities.
- Rising unrest is shown on the city itself on the map.
- Garrison troops are split off from the player's battle army, so every garrison weakens the army available for the next fight.
- Garrisons and the field army both cost upkeep every turn.
- Unpaid upkeep (or unfed troops) causes desertion and lower morale. If it continues the player can lose the army completely.
- Losing the army ends the run: the player falls as a failed feudal leader (recorded in history as a fallen leader). If the player chooses to play again, a new leader appears somewhere else in the world (a new start, not a continuation). The world map (land, terrain) is always the same; only the cities are placed at new random locations each run, and the new leader starts from one of them. No gameplay progress carries over between runs (no unlocks, army or money), but the world's calendar and history do (see History).
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
- Income comes from winning battles and from taxes paid by the cities the player holds.
- Money is spent to train the army, recruit, or feed the soldiers.

- Platform: iOS only, and only Apple Intelligence-capable devices are supported (iOS 26+). This guarantees the on-device Foundation Model is available for the order-parsing fallback and the history narrative, so no non-Apple-Intelligence fallback is needed.

## Open questions
- Gesture details: how is advance told apart from retreat (swipe direction toward or away from the enemy)? How does the player pan and zoom the field?
- Run gap: read as the gap between runs ("between turns" in the original note), to confirm.
- "Trained groups are more expensive": only the one-time training cost, or higher upkeep too?

