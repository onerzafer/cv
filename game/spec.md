# Spec: Medieval Battle Strategy (working title)

Status: draft for review.
Inputs: `intent.md` (approved), `notes.md` (raw source).
Next step after approval: `plans.md` (milestones and tasks).

Convention used below:
- **Decided** means it came from the notes. Where a rule is labelled this way, change it only by changing the notes.
- **Proposed** means the notes were silent and I filled the gap. Numeric tuning constants (stats, curves, percentages, sizes) appear in place and will live in one data file. Design proposals that change how the game plays are collected in section 15 for you to confirm or change.

---

## 1. Scope

A single-player iPhone game with two layers:

- **Campaign layer**: turn-based, one turn is one season. A map of cities, economy, training, spies, marches, rebellion.
- **Battle layer**: real time, speed-up allowed. Thousands of dots on an open field, moved and fought by a particle simulation, commanded by speech, text and touch.

A run starts when a new leader rises and ends in victory, loss of the army, or loss of the last city. A history log and a calendar persist across runs. Nothing else does.

Out of scope: see the non-goals in `intent.md`.

## 2. Glossary

| Term | Meaning |
|---|---|
| Run | One leader's playthrough, from start to run end. |
| Season / turn | One campaign turn. Four seasons make a year. |
| Gold | The single currency (proposed name). |
| Dot | One soldier in the battle simulation. |
| Unit type | Soldier, spearman, cavalry, archer, catapult. |
| Group | A named set of dots the player can address (for example left wing). Orders go to groups. |
| Training level | 1 to 10, per group and per unit type within a group. |
| Home city | The king's own city. Always garrisoned, rebels less. |
| Garrison | Troops split off the field army and stationed in a city. |
| Intel | What spies reveal about an enemy city. |
| Order delay | Fixed hidden delay between giving an order and the army acting on it. |

## 3. Platform and architecture

**Decided**
- iOS only, iOS 26 or later, Apple Intelligence devices only.
- Voice capture and speech-to-text are on-device.
- Order parsing, mood reading and history narrative use Apple's on-device Foundation Model. The game is fully offline.

**Proposed**
- Swift, SwiftUI for the shell (home, map, menus, reports).
- Metal compute shaders for the battle particle simulation, with a CPU fallback path for tests.
- Apple's on-device speech recognition for voice-to-text.
- Local persistence (SwiftData or plain JSON files) with an autosave at the start of every season and when a battle begins.
- The on-device model is used for: parsing the player's words, enemy commanders (their plans and their orders in battle), parley, and the history narrative. The world (campaign, economy, enemy rulers' choices, spies) runs on code, and so does the battle simulation. The model is never in the simulation loop.
- Modules: `Sim` (battle simulation), `Campaign` (world and economy rules), `Orders` (voice and text to structured orders), `Intel` (spies), `History` (log, lineage, narrative), `UI`.
- `Sim` and `Campaign` are deterministic given a seed and contain no UI or model calls, so they can be unit tested and replayed.

## 4. Game states and flow

```
Home screen -> Campaign map -> (select target) -> March -> Battle -> Campaign map
      ^                                                     |
      |                                          Run end <--+
      +---- History written, calendar advances <------------+
```

1. **Home screen**: shows the current year and the history headline, for example "After the fall of X, new cities rose and a new leader rose from city X". A single action starts the new run.
2. **Campaign map**: the fixed world map with cities placed at random for this run. The player sets taxes, welfare, training, recruits and spies, then ends the season.
3. **March**: the player picks a target city. The army travels for one or more seasons, paying upkeep. The destination can be changed mid-march.
4. **Parley (optional)**: after a target is chosen and before the battle begins, including during a march, the player may send up to three messages to the enemy (section 5.12).
5. **Battle**: the field comes into being when the first army arrives at the target. Real time with speed-up. If the other army has not arrived yet, the early army has time to prepare (section 6.8).
6. **Resolution**: win, lose or retreat, then back to the campaign map.
   A rebellion in the home city starts a battle directly: the garrison already in the city fights the rebel army (no march).
7. **Run end**: victory end screen, or the fall of the leader. History is written, the calendar jumps ahead by a random gap, and the home screen shows the next run.

## 5. Campaign layer

### 5.1 World

**Decided**
- The land and terrain of the world map are fixed forever.
- Each run places a new set of small cities at random locations. Each city has a nation colour.
- The player picks their own nation colour at the start of each run. The remaining colours are distributed among the other cities and nations, so no other nation shares the player's colour.
- Nations differ in army composition (for example cavalry-heavy or archer-heavy).
- Without spies the map shows only city size and nation colour. The player's own cities also show unrest.

**Proposed**
- Number of cities per run: 12 to 20, set at world generation.
- Starting cities per nation: 1 to 3. The player starts as one small city.

### 5.2 Time

**Decided**
- One turn is one season. Calendar year advances every four turns.
- The calendar starts at year 1 on the very first run. Between runs it jumps ahead by a random number of years, long enough for cities to dissolve and new ones to be built. There is no end year.

**Proposed**
- Gap between runs: random between 15 and 60 years.
- A march takes whole seasons. Travel cost per season depends on distance and terrain (section 5.9).

### 5.3 Turn resolution order (proposed)

Each season resolves in this order, so every rule has a clear time:

1. Income: taxes and trade for the player's cities.
2. Upkeep: field army, marching army, garrisons, trained groups.
3. Unpaid upkeep consequences (section 5.8).
4. Training completes for groups queued last season (section 5.7).
5. Enemy and rebel cities evolve (section 5.5).
6. Unrest update and rebellion checks (section 5.6).
7. Marches advance. Battles trigger on arrival.
8. Intel from earlier seasons expires.
9. Calendar advances by one season.

### 5.4 City model (proposed state)

Every city holds: size, wealth, population happiness, unrest, tax rate, welfare spending, garrison, army, nation, training levels, and a plan for its AI if not the player's.

### 5.5 Economy (the simulated balance loop)

**Decided**
- Cities earn money from trade and taxes, scaled by size.
- More money allows a larger possible army and more trade, which feeds back into money.
- The tax rate sets how favourable the population is toward the ruler.
- A bigger army means less spending on welfare and services, so fewer people want to live there. This lowers income and eventually shrinks the army.
- The same model runs for the player's cities and for enemy cities. A city left alone can spend money, grow and train its army.
- Enemy cities may train, recruit and move forces in one season, but not all at once. Money is shared across options, and distance limits movement.
- Cities never fight or conquer each other.

**Proposed formulas** (starting point for tuning; all constants live in one data file):

```
trade        = c_trade * size * prosperity
tax_income   = tax_rate * size * prosperity
income       = trade + tax_income

army_cost    = sum over groups of (headcount * upkeep_per_type * (1 + u * training_level))
welfare_cost = welfare_spending

happiness'   = happiness
             + a * welfare_spending / size
             - b * tax_rate
             - c * army_burden        (army headcount / size)
             - d * unpaid_flag
             + e * garrison_presence
clamped to [0, 1]

size'        = size + g * (happiness - h0)       (growth or shrink)
```

The whole world runs on plain code, including the economy for the player's cities and enemy cities alike and the enemy rulers' seasonal choices. Each season an enemy ruler allocates its income by a simple priority list shaped by its nation profile (proposed). It can start at most one training queue per group, cannot exceed its gold, and is limited by travel cost.

### 5.6 Taxes, welfare, unrest, rebellion

**Decided**
- The player sets tax rate and welfare spending per city.
- A city with unhappy people can rebel through a gradual uprising, which the player can prevent by garrisoning troops and spending on welfare.
- Rising unrest is shown on the city on the map.
- A rebelling city goes independent, gets back its original colour, and gets its own army built from its own economy. That army starts weak and hardens each season, so reconquering sooner is easier.
- The home city can rebel but its people rebel less than other cities.

**Proposed**
- Unrest accumulates when happiness is under a threshold: `unrest += k * (h_threshold - happiness)`, and decays when above it. Garrison strength reduces accumulation.
- A rebellion fires when `unrest >= 1`. The home city uses `unrest_gain * 0.5`.
- The rebel army starts at about 30% of the city's potential army and gains one training level and a recruit batch each season until it reaches the city's own economic limit.
- Unrest is displayed as a small coloured ring or marker on the city.

### 5.7 Training

**Decided**
- 10 levels, applied per group and per unit.
- It changes the shade of the dots on the player's own army (section 9).
- Training costs gold once, rises with each level, and takes one season. A group gains one level per season. Many groups can train in parallel, limited by gold.
- Trained groups also pay higher upkeep every turn.
- Effects: they react to orders more readily, resist fear and demoralising, move faster, and have a better chance to hit and kill.
- Training is lost only after heavy losses: about 50% of a unit lost drops one level, 75% halves the levels, 90% resets to level one.

**Proposed**
- Training cost: `cost(level) = base_cost * 1.5^(level-1)`.
- Effects scale linearly with level from 0 at level 1 to the maximum at level 10, with constants in the data file.

### 5.8 Upkeep and consequences

**Decided**
- The field army, the marching army and garrisons all pay upkeep every season.
- Unpaid upkeep causes desertion and lower morale. If it continues the army can be lost completely.
- Unpaid upkeep does not remove training.

**Proposed**
- Each unpaid season: 5% to 15% of each group deserts and its morale starts the next battle lower. After three unpaid seasons in a row the desertion rate grows. When the army reaches zero the run ends.

### 5.9 Marching

**Decided**
- The player's army travels like an enemy's: time depends on distance and terrain, a march can take several seasons, and upkeep is paid throughout.
- The player can redirect a march in progress.
- Battlefield terrain comes from the target city's surroundings.

**Proposed**
- The map has terrain tiles with a cost multiplier. A march advances by a fixed number of cost points per season. Redirecting keeps the progress already made along the path, and the remaining path is recomputed from the army's current position.

### 5.10 Splitting and garrisons

**Decided**
- Garrisons are split off from the field army and pay upkeep.
- A small garrison always stays in the home city.

**Proposed**
- Splitting also happens in battle by order (section 6.8). On the campaign map it happens here. A split changes the group lists of both forces. Merging is allowed in the same city.
- The home garrison cannot be reduced below a minimum (for example 5% of the starting army).

### 5.11 Spies and intel

**Decided**
- Without spies information is partial. The player can pay for spies to reveal a city's wealth, army size and composition, and its tactics: fake retreats, hidden forces behind hills or under trees, a weak wing.
- The enemy's plan and tactics exist for the AI to follow, and city state exists whether or not spies are sent. The plan is decided early if the player sends spies, and otherwise at battle time. Spies reveal; they do not change anything.
- Detail depends on spending. Reports are always true but incomplete. How much is revealed is random.
- Spies can fail, die or be captured. The player is told only when a spy is captured. Nothing else about spy missions is shown.
- A captured spy can make the enemy AI react: change its plan or use what leaked. The report may then be out of date by battle time.
- Reports arrive as text. The player sees only the result, with no confidence indicator.
- Intel goes stale after one season.
- The enemy AI's reaction obeys the same economic limits as everything else: if it starts training to fix a weakness and the player attacks at once, the training is unfinished.

**Principle: spies are code.** The world runs on code, so spy results come from a simple randomization formula (the one in the notes), not from the model. The player sees only the result, plus the capture notice when a spy is caught.

**Proposed**
- A city's plan (section 6.7) is a set of true facts. Spies reveal some of them. The game picks which facts to include with a seeded random choice weighted by how much gold the player spent. More gold means more facts and finer detail.
- Reports can be incomplete but are never false, because they are written only from the true facts.
- Spies can fail, die or be captured, by a seeded random roll that depends on spend. Only a capture is announced.
- A captured spy tells the enemy something. The enemy commander may adjust the plan, and any changes are carried out in the battle (6.7).
- Intel is kept for one season and then discarded.
- Because a spy report needs the plan to exist, buying spies on a city makes its plan be decided now (see 6.7).

### 5.12 Parley (diplomacy and dirty tricks)

**Decided**
- The player can talk to the enemy before a battle and while marching, up to three rounds.
- The player does it by speaking to the army, for example "send a messenger to the enemy and tell them today you will die, or give me the city and join me and we conquer the world".
- The enemy AI may accept (for example join the player), kill the messenger, send a message back, or offer gold in return for the player leaving. The enemy can try the same toward the player.
- Provoked opponents may become aggressive and make mistakes.
- Ambush and dirty work are allowed for both sides.
- Parley is optional and never enforced. The player is hinted that it is possible (a short text hint when a target is chosen or a march is under way), and can ignore it.
- Messenger speech is heard as bee-like buzzing with the words shown as text. Messengers are never drawn on screen.

**Principle (from the notes): live logic, not mechanics.** There is no odds table, no personality-trait formula and no fixed penalties. The game defines only basic things: units, win and loss, and the few events it can carry out. How the other side thinks, trusts, bargains or lies is decided live by the on-device model, playing the enemy as a character.

**Proposed**
- One round is one player message followed by one enemy reply. Three rounds is the maximum per encounter (the approach to one target).
- The enemy is a character, not a table. It is given, in plain words: its nation and city (wealth, mood, army as it knows it), what it believes about the player, a short personality description, and the conversation so far. The model answers in character.
- The game only needs to understand the outcome, so each reply is mapped to one of a few basic events the game can execute:
  - the enemy accepts to join the player (the city joins the kingdom without a battle);
  - the enemy pays gold in return for the player leaving (the march ends or is redirected);
  - the enemy refuses, ignores, or sends a message back (the conversation continues);
  - the enemy kills the messenger (the conversation ends);
  - the enemy attacks by surprise (an ambush).
  The player can likewise ambush or break a truce by ordering an attack during a parley.
- A provoked, insulted or frightened enemy can also change its stance (more aggressive, more cautious). The model chooses this too. The game turns it into a plain change to how the enemy opens the battle (for example attacking early or holding back).
- The enemy can open a parley or try tricks toward the player, in the same way.
- The conversation is kept as a transcript, shown as text with the buzz sound. Nothing in the transcript is a game value; the model's judgement of trust and mood lives only in the conversation.
- Parley takes no calendar time.
- Sound: messenger speech is a procedurally generated buzz. Pitch, speed and rhythm carry the tone, each nation has its own timbre, there is a mute option, and the text of the reply is always shown.
- Accepted risks of live logic: the on-device model can be inconsistent or easy to talk round, and runs cannot be replayed exactly. Mitigation is in the prompt (a persona that stays in character and does not take claims at face value), not in added rules. If testing shows the enemy is too easy to sweet-talk, the persona prompts are adjusted, and no rule is added.

## 6. Battle layer

### 6.1 Battlefield

**Decided**
- Open field only. No castle or fixed target.
- Random each battle, using the terrain of the target city's surroundings.
- Scale: dots are people and the field is a couple of kilometres across.

**Proposed**
- Procedural height and obstacle map (hills, trees, water). The field is about 2 km by 2 km at 1 world unit per metre.
- Hills slow movement and block line of sight for archers. Forests allow hidden reserves. Water blocks movement.
- Armies enter the field from opposite edges as they arrive. The player is the invader.

### 6.2 Units

**Decided**

| Unit | Look | Behaviour |
|---|---|---|
| Soldier | Plain dot | Basic infantry. |
| Spearman | Pointy dot | Strong against cavalry. |
| Cavalry | Dot with a rectangle horse | Charges fast, breaks through lines. |
| Archer | Dot with tiny cross lines | Shoots small arrows from range. |
| Catapult | Bigger dot | Throws rocks. |

**Proposed base stats** (relative; tuned in the data file):

| Unit | Speed | Range | Melee power | Notes |
|---|---|---|---|---|
| Soldier | 1.0 | melee | 1.0 | |
| Spearman | 0.9 | melee | 1.0, ×2 vs cavalry charge | Weak flank. |
| Cavalry | 2.0 | melee | 1.5 while charging | Loses charge bonus if slowed or surrounded. |
| Archer | 1.0 | 150 m | 0.3 melee | Arrows follow a ballistic arc with a cooldown. |
| Catapult | 0.3 | 400 m | none | Area damage, long cooldown, low accuracy. |

### 6.3 Movement: particle fluid

**Decided**
- Movement is particle-based fluid dynamics. Units flow around obstacles and mix with opposing infantry during a fight.
- Fluid dynamics drives all movement and the battle itself.

**Proposed** (a position-based or smoothed-particle approach):
- Each dot has position, velocity, group, unit type and health state.
- Forces per tick: goal-seeking toward the group's target, separation from neighbours, cohesion toward the group centre (scaled by morale), obstacle avoidance from a signed distance field, and a pressure term that rises with local density.
- Density limits keep dots from stacking. Pressure also contributes to the exposure value in 6.4.
- Fixed time step (for example 1/30 s of battle time), integrated with sub-steps for the speed-up setting.

### 6.4 Combat: emergent death probability

**Decided**
- A dot's chance of dying depends on how surrounded it is and how supported it is. No scripted duels.
- Trained groups have a better chance to hit and kill.

**Proposed**
Per dot per tick:

```
enemy_contact = number of enemy dots within melee radius (capped)
exposure      = fraction of the dot's surrounding angle covered by enemies (0..1)
support       = number of friendly dots in the supporting arc behind and beside (normalised)
p_death       = clamp( k_unit * enemy_contact * (1 + s * exposure) * (1 + t * attacker_training_mean)
                       / (1 + b * support) , 0, p_max )
```

`attacker_training_mean` is the mean training level of the enemy dots in contact (or of the shooter for ranged attacks). Training does not make a dot harder to kill; it makes its group hit and kill more. Cavalry charge adds a bonus to the attacker's value on the first contact tick and when speed is high. Spearmen apply a multiplier when the attacker is cavalry. Ranged attacks roll a hit chance from distance, target density and the attacker's training, and then apply the same `p_death` logic for the target.

### 6.5 Morale

**Decided**
- Morale is local to a group. A cornered group can become fearful and disoriented while the rest of the army is fine.
- Fear spreads to nearby groups.
- Morale affects movement speed, cohesion, and fleeing. It does not directly change death chance; any effect on survival comes through cohesion, fleeing and support.
- Training determines fear resistance.
- Morale is dynamic: it decays, changes and recovers over time, and reacts to battle events as well as to speech.
- The player's tone of voice, read from words, changes morale: insults hurt, heroic speech raises it.

**Proposed**

```
morale m in [0,1] per group
speed_mult      = lerp(0.5, 1.0, m)
cohesion_mult   = lerp(0.3, 1.0, m)
flee_threshold  = 0.2 - 0.1 * training_resistance      (group flees when m < threshold)
events          : own casualties, being surrounded, enemy rout nearby, victory sign
                  -> subtract or add, scaled by (1 - training_resistance)
contagion       : m_group += lambda * (m_neighbour - m_group) when the neighbour is lower and within radius
recovery        : m moves toward its baseline at rate r when no negative events occur
speech          : mood score from -1 to +1 shifts morale by up to ±0.15, applied when the order arrives
```

A fleeing group moves away from the nearest enemy and ignores new orders until morale recovers above a rally threshold.

### 6.6 Orders and the order delay

**Decided**
- Orders (from speech, text or touch) do not take effect immediately. The delay is a fixed value, hidden from the player and independent of distance, standing in for horns, flags or riders. There are no simulated messengers, no interception, and nothing visible.
- Trained groups react more easily to orders.
- The army is clever enough to fight; the player steers and does not manage single units.

**Proposed**
- The delay is a constant of battle time (for example 20 s). It runs on battle time, so speed-up shortens it in real time.
- The delay is the same for every group. Trained groups "react more easily" after the order arrives: faster turning and acceleration and less hesitation.
- A new order replaces an older queued order for the same group once it arrives.

### 6.7 Enemy AI

**Decided**
- Controlled by AI or algorithm. It follows the plan generated for its city (the same plan spies can reveal).
- The player can only infer enemy quality from behaviour: spacing and alignment, disorder, blocking each other, panic.

**Proposed** (live logic for the enemy commander)
- The enemy commander is the on-device model, playing the city's military leader. It writes the city's plan: formation, wing strengths, reserves, any planned fake retreat.
- **When the plan is decided:** if the player sends spies to the city, the plan is decided when the spies need it, before the battle, and is kept for that season so the reports are true. If no spies are sent, the plan is decided at battle setup. A season's plan is dropped when the season ends.
- During the battle the commander carries out the plan and may deviate when things change (a captured spy, a parley, a flank breaking). It commands its army the same way the player does: it issues orders in the same `Order` schema to its own groups, subject to the same hidden order delay. It decides again at intervals of battle time (for example every 15 to 20 s) and when something important happens (a group routs, a flank breaks). Between decisions groups keep their last orders.
- If the model is slow or unavailable, the enemy keeps its last orders. The simulation never waits for the model.
- The fluid movement, combat and morale stay in code. Untrained enemy groups get sloppier spacing, more jitter and lower fear resistance. These are the cues the player reads.

### 6.8 Battle flow and end

**Proposed** (the notes were silent):
- There is no separate deployment phase and no special rules for preparation. The battle runs in real time from the moment the first army arrives. If the enemy city's army arrives later than the player's, the player has that time to act: send a group to the hills or into the trees, divide the army in two and place the halves on the sides, or any other idea. It is the player's judgement and gut feeling; the game adds no rules, bonuses or timers for it. The same is true the other way: if the enemy is early, it may use the time, and the enemy commander (the model) decides what to do with it.
- How long the gap lasts follows from where the two armies are on the campaign map when the battle triggers. It is turned into battle time by code and capped so a battle never starts with an unreasonably long wait (the cap is a proposed tuning value).
- Visibility is plain code: a group on the far side of a hill, or under trees, is not seen by the other side. The enemy commander model is told only about enemy groups its side can see, so hidden groups really are hidden.
- Groups can be split and merged during the battle by orders such as "divide the right wing in two".
- A battle ends when one side has no organised groups left (all fled or dead), or when one side's remaining headcount falls under 10% of its start, or when the player orders a full retreat and the army leaves the field.
- Winner earns gold equal to a share of the defeated city's wealth. The player's casualties come out of the army. A conquered city joins the kingdom and pays taxes.
- Losing the home city's recapture battle loses the city. If that was the last city the run ends.

### 6.9 Speed-up

**Decided**: the player can speed up time in battle.
**Proposed**: 1×, 2×, 4× buttons. The simulation uses a fixed step and runs more steps per frame; the order delay and cooldowns scale with battle time.

## 7. Command input

### 7.1 Speech and text

**Decided**
- Voice and text are free-form, with no fixed vocabulary. Example orders: "middle hold", "right wing advance".
- Apple's on-device Foundation Model turns the words into specific orders and reads the tone for morale.

**Proposed order schema** (shown in Swift style; exact types are for the plan to settle):

```swift
@Generable struct ParsedCommand {
    var orders: [Order]        // zero or more
    var mood: Mood             // tone of the player's words
}
@Generable struct Order {
    var group: GroupRef        // left wing, centre, right wing, cavalry, archers, catapults, reserve, all, or a named group
    var action: Action         // advance, hold, retreat, attack, flank, withdraw, fireAtWill, holdFire, charge, regroup, split, merge, conceal
    var direction: Direction?  // compass or relative to enemy (toward, away, left, right)
    var target: TargetRef?     // enemy group or map feature (hill, forest)
    var urgency: Urgency       // calm, normal, urgent
}
@Generable struct Mood {
    var valence: Double        // -1 insulting to +1 heroic
    var intensity: Double      // 0 to 1
    var tags: [MoodTag]        // insult, threat, heroic, calm, doubt
}
```

- The model receives a compact context: current group names and positions, nearby terrain features, last orders. The total prompt stays well under the model's context limit.
- Voice flow: hold-to-talk button, on-device speech-to-text, then the same pipeline as text.
- Failure handling: if the model returns no orders or an unknown group, the UI shows the interpreted result in plain text and nothing executes until the player confirms or re-speaks. (Proposed. It prevents silent misinterpretation.)
- Mood only affects morale when at least one order or a clear speech act was parsed.

### 7.2 Touch

**Decided**
- One finger touch and move pans the view.
- A two-finger swipe orders the army to move in that direction: advance toward the enemy or retreat from it, depending on direction.
- Two fingers pinching in zooms out; spreading them apart zooms in.
- Pan and zoom follow Google Maps and Apple Maps conventions. The view is fixed top-down, with no tilt or rotate.
- No single-unit management.

**Proposed**
- Touch orders go through the same order delay as speech.
- The swipe applies to the groups whose centre lies in the swiped area. A swipe over no group applies to the whole army. No arrow or other cue appears before the order takes effect, so the hidden delay stays hidden.

## 8. History, lineage and narrative

**Decided**
- History is a running log of every run, shown only as narrative on the end screen and home screen. It has no gameplay effect.
- It records fallen leaders and victors.
- The calendar always moves forward.
- Leaders are always the same lineage. There is always an heir, always a relative (son, daughter, cousin, uncle or similar), who rises from one of the new cities.
- Succession is narrative only: a relationship picker, a gender picker and a name generator, with a simple believable formula and nothing magical. Names are generated, not chosen by the player.
- The AI writes the narrative, generated at the end of a run, using the on-device model.

**Proposed**
- A log entry holds: year range, leader name and relation, home city, outcome (victory, army lost, last city lost), key events (cities conquered, rebellions, largest battle), and the generated paragraph.
- Name generator draws from medieval name lists with a family surname or epithet carried through the lineage.
- Relation picker draws from weighted options (son, daughter, brother, cousin, uncle, niece...) with sensible weights by age and gender.
- The narrative prompt gets the entry's facts as structured fields and a short style guide. The model may not invent outcomes; it only phrases them.

## 9. Visual specification

**Decided**
- Top-down view. Dots are tiny with no detail.
- Shape is unit type, as in 6.2. Hue is nation. Shade is training level (10 steps), shown on the player's own army only. Enemy training is never shown.
- Enemy armies use their city's or nation's colour. The player picks their own colour and no one else uses it.

**Proposed**
- Render with instanced points or small quads in Metal. Pointy dots use a small triangle, cavalry a small rectangle behind the dot, archers a tiny cross, catapults a larger dot.
- A palette of 8 to 10 distinct hues with 10 shades each. Hue contrast is checked against colour-blind simulations.
- Map: flat, readable terrain with a minimal map style. Unrest markers on the player's cities.
- Reports and the history narrative appear as text panels.

## 10. Persistence

- Run state (world, cities, armies, gold, calendar, queued training, marches) saved at the start of each season and when a battle begins.
- History log and global calendar persist across runs.
- Nothing else persists across runs (**decided**).
- A run in progress can be resumed after the app is closed (proposed).

## 11. Non-functional requirements (proposed targets)

- **Performance**: battle at 30 fps minimum on the oldest supported Apple Intelligence iPhone (iPhone 15 Pro class) with at least 5,000 dots per side visible; target 60 fps on newer devices. Final counts are set after the prototype (milestone 1 in the plan).
- **Latency**: order parsing under 2 s typical on-device; the UI shows an "interpreting" state. The order delay hides this in play.
- **Offline**: no network at any time.
- **Privacy**: audio and text stay on device. No analytics that include speech or text (proposed).
- **Accessibility**: captions for any audio, adjustable colour palette, text-only input path (already present).
- **Determinism**: the sim and campaign are seeded so tests and replays are reproducible.

## 12. Data model (proposed)

```
World        { seed, mapTerrain, cities[], calendar }
City         { id, nation, size, wealth, happiness, unrest, tax, welfare, army, garrison, plan?, colour }
Army         { groups[], location|march, gold? }
Group        { id, name, unitMix, headcount, trainingByType, morale }
March        { army, path, progress, destination }
Intel        { cityId, season, facts[] }
Run          { leader, lineage, startYear, state, cities, army, gold }
HistoryEntry { yearStart, yearEnd, leader, relation, homeCity, outcome, events[], narrative }
Plan         { formation, wings, reserves, fakeRetreat, objective }
```

## 13. Acceptance tests (mapped to the intent success criteria)

1. **Speech**: the spoken or typed order "right wing advance, hold the centre" parses to two orders for the right groups, applies after the order delay, and the right wing visibly moves while the centre stays.
2. **Mood**: "useless sh*ts, attack" lowers morale and "we came here to liberate these lands" raises it, on at least 20 scripted phrases with the expected sign.
3. **Unit behaviour**: spearmen beat cavalry charge on a fixed seed in a head-on scenario more often than not; cavalry breaks a thin infantry line; archers hurt targets at range and lose to melee contact.
4. **Rout**: in a scripted scenario, an untrained group cornered on a flank routs, fear spreads to a neighbouring untrained group, and a trained neighbour holds.
5. **Economy**: with fixed seeds, raising taxes lowers happiness and eventually causes rebellion; welfare and a garrison delay it; a left-alone enemy city is stronger after N seasons.
6. **Rebellion**: a rebel city has its original colour and an army that grows each season; the home city rebels less than a normal city at equal settings.
7. **Spies**: every fact in a report is true (checked against the plan's facts); reports vary in completeness with spend and the same seed gives the same report; a captured spy is announced and, over a batch of scenarios, can lead to changed enemy plans; intel from last season is gone; buying spies makes the plan exist before the battle.
7a. **Enemy commander**: every enemy order in battle parses to the `Order` schema; the plan is decided early when spies were sent and at battle setup otherwise; a stalled model does not stall the simulation.
7b. **Enemy rulers**: each season every enemy ruler's allocation respects gold, one training level per season, and travel cost.
8. **Training**: levels rise by one per season; 50%, 75% and 90% loss thresholds change levels as specified; unpaid upkeep leaves levels untouched.
9. **Run end**: each of the three endings produces a history entry and a new leader from the same lineage in a random new city at a later year.
10. **Parley**: no more than three rounds are accepted; every enemy reply maps to one of the basic events; over a batch of scripted messages (insults, bluffs, bribes, offers to join) the enemy replies in character and the outcomes vary sensibly across messages and personas (a scenario check, not exact reproduction); an ambush starts the ambushed side out of formation.
11. **Performance**: the sim holds the frame-rate targets at the agreed dot counts on the reference device.
12. **Preparation**: with the enemy arriving later, the player's "conceal" and "split" orders work; a group behind a hill or under trees is not visible to the enemy commander; the enemy commander is not told about groups it cannot see.

## 14. Risks carried into the plan

- Simulation cost on device (needs a prototype before final counts).
- Quality of the on-device model for order parsing and mood: needs a test set and tight prompts.
- Free-form speech ambiguity when groups are vague or overlapping.
- Balance of hidden mechanics with no visible telemetry to the player.
- Narrative quality from a small model; constrain by structured inputs.

## 15. Proposed values to confirm

I filled these because the notes did not say. Change any of them and I will update the spec.

1. Currency called "gold".
2. 12 to 20 cities per run.
3. Gap between runs: 15 to 60 years.
4. Battle end conditions (section 6.8) and how winnings are computed (a share of the defeated city's wealth).
5. Order delay: a constant of about 20 s of battle time, and gestures use the same delay.
6. Speed-up options 1×, 2×, 4×.
7. Failed or unclear order handling: show the interpreted result and ask before executing.
8. Dots per side and target frame rates (set after the prototype).
9. Resume a run after closing the app; autosave each season.
10. No separate deployment phase: the battle runs from the first army's arrival, and the player prepares during any gap. Cap on the gap length (a proposed tuning value).
11. Minimum home garrison size.
12. Live logic scope: parley is decided by the model with no rule tables. Should the same principle be applied to the rest of the game (see the question in chat)?
13. Touch: a two-finger swipe over no group applies to the whole army, and no cue appears before the order takes effect.
14. Battles take no calendar time (the calendar advances only by seasons on the campaign map).
15. Names of the groups the player can address (left wing, centre, right wing, cavalry, archers, catapults, reserve) and whether the player can rename or create groups.
