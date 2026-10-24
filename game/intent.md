# Intent: Medieval Battle Strategy (working title)

Status: draft for review. Source of truth for details is `notes.md`; this document says why and what, and the spec will say how.

## Vision

A top-down medieval conquest game for iPhone. You are a young feudal lord with one small city. You command armies of tiny dots by speaking or typing in plain language, watch thousands of them flow across a kilometres-wide field like fluid, and use the winnings to grow a kingdom, until it falls apart and the next heir begins again in a world whose history you have written.

The player fantasy: being a commander who sees the field from above, gives orders that take time to arrive, and never knows quite as much as they would like.

## Pillars

1. **Speech is command.** Free-form voice or text, with no command list, plus touch: one finger pans the view, a two-finger swipe steers the army in that direction (advance or retreat), and pinch and spread zoom out and in. Pan and zoom feel like Google or Apple Maps, but the view is fixed top-down with no tilt or rotate. Apple's on-device model turns the words into orders and also reads their tone: an insult hurts morale, a heroic speech lifts it. Orders reach the army after a fixed, hidden delay, as if carried by horn, flag or rider.
2. **Combat emerges from the simulation.** Dots move as a particle fluid around terrain. Who dies depends on being surrounded and supported. Morale is local and spreads like fear, and training decides who holds. No scripted duels.
3. **The economy balances itself.** Cities earn from trade and taxes and spend on armies and welfare. Heavy taxes and a big army breed unrest, and unrest breeds rebellion. The player sets tax and welfare per city.
4. **Uncertainty everywhere.** Enemy training, plans and tactics are hidden and can only be inferred from behaviour or bought with spies. Spy reports are true but incomplete, and go stale after one season.
5. **A dynasty chronicle.** Every run ends, and a generated history of leaders from one lineage grows across runs while the calendar moves on.

## Player experience in one loop

- **Campaign (turn-based, one turn is one season):** pick a target on the map of cities, spend money on training, recruits, upkeep and spies, set taxes and welfare, march (a march can take several seasons).
- **Battle (real time, speed-up allowed):** an open-field fight on terrain taken from the target city's surroundings. There are no castles.
- **Parley (before a battle or while marching, up to three rounds):** the player speaks a message to the enemy through the army. The enemy AI may accept, refuse, kill the messenger, counter-offer gold, or ambush. The enemy can do the same to the player. Messengers are heard as bee-like buzzing with the words as text, never seen.
- **Run end:** victory (conquer every city), loss of the army, or loss of the last city. History is written and a new heir rises in a random city on the same world map.

## Scope in brief

- Units: soldiers (dot), spearmen (pointy, strong against cavalry), cavalry (dot with a rectangle horse, charges and breaks lines), archers (dot with tiny cross lines, ranged arrows), catapults (bigger dot, rocks).
- Visuals: shape is unit type, hue is nation, shade is training (10 levels, own army only).
- The world map and land are fixed. Cities are placed randomly each run. Nations differ in army composition.
- Platform: iOS 26+, Apple Intelligence devices only.

## Non-goals

- No single-unit management. The army fights on its own and the player only steers.
- No castles, sieges or fixed-target battles.
- No visible messengers (parley is heard and read, never drawn), spy missions, spy deaths, order delay or intel confidence.
- Cities never fight or conquer each other. The player is the only conqueror.
- No progression carries between runs (no unlocks, army or money). Only the calendar and history persist, and history has no gameplay effect.
- No detailed soldier art, and no player-chosen leader names.
- No fixed command vocabulary.

## Hard constraints

- iOS only, on Apple Intelligence devices, with iOS 26 or later.
- Voice capture, order parsing, mood reading and the history narrative all run on-device with Apple's Foundation Model. The game works fully offline. The narrative is generated at the end of a run.

## Success criteria

- A player can issue a spoken order such as "right wing advance, hold the centre" and see the right part of the army react after a believable delay.
- Cavalry, spearmen and archers visibly behave differently, and a cornered group can rout and spread fear without any scripted rule saying so.
- An unattended city grows, trains and rebels in ways the player can anticipate from tax and welfare choices.
- A full run, from start to run end, produces a history entry that reads as a believable chronicle.
- The battle simulation stays smooth on supported iPhones at the target unit counts (to be set in the spec).

## Risks

- **Parley exploits.** "Join me" or buy-off outcomes could bypass battles. They need low odds, clear costs and per-nation personalities.
- **The model must not decide outcomes.** It reads tone and claims and phrases replies. Fixed rules, seeded, decide what happens, so results stay testable.
- **Simulation cost.** Thousands of fluid-like particles with local combat on a phone is a feasibility risk. Needs an early prototype before the spec locks unit counts.
- **On-device model limits.** Apple's model has a small context window and limited reasoning, so order parsing needs tight, structured prompts.
- **Free-form speech ambiguity.** "Right wing" and "middle hold" must map to real groups reliably, including when the player is vague.
- **Hidden-mechanics balance.** With delay, intel quality and enemy adaptation all hidden, tuning will need telemetry or playtest data.

## Open items

None at the moment.
