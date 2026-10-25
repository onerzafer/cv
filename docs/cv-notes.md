# CV notes

Working notes for the CV rewrite. Facts come from the owner; the page itself is `src/app/page.tsx`.

## Backlog (decided, not started)

- **Chat with the CV.** The page detects what is available, in order: Chrome built-in model, WebLLM on WebGPU, and a small serverless endpoint as the fallback. The model gets a system prompt so it represents the owner: first person, only facts from the CV, refuses off-topic. The CV content should live in one source file that feeds both the page and the chat prompt.
- **PDF version of the CV**, generated from the same content.
- Trim Highlights and Own projects to 2 or 3 sentences each; move details into Medium posts (Worklab, Sifir and Composer).

## Facts captured, not yet on the page

- **PR highlighter plugin.** Built to give every developer a faster review, because review is the new bottleneck.
- **AI-native SDLC (Anthropic's approach), rolled out to the teams.** Repeatable and auditable practice so people stay engineers, not vibe coders. Flow: intent, spec, plans, plans converted to Jira tickets. Jira is managed by agents during development, so management has tracking. Every artifact is reviewed with a human in the loop, which satisfies DORA and BaFin while working fully agentic.

- **PR highlighter roadmap.** Next: automatic reviewer assignment based on the PR classification (classifier from typesafe.ai, called "jev"; planned, not built yet).
- **New-product lesson.** The solo experiment delivered, but the owner judged it a failure as a process: not repeatable, knowledge concentrated in one person even with a knowledge hub. That led to the shared SDLC.
- **Traceability outcome.** Requirements map one to one to tests, so nothing unbuilt or deviating slips through; ripple effects of a change are traceable across plans and PRs. Intent and spec phases align everyone early and capture stakeholders better; demos end with satisfied stakeholders expressing gratitude.
- **Shift-left on wrong assumptions.** Without the intent and spec gate, a false claim gets built and only surfaces at the stakeholder demo: wasted tokens and lost time. With AI the loss is days or weeks, not months, but it is still the main waste the process removes.

## Target role

- Fully remote, Europe-based companies preferred. Company stage and size do not matter. Hands-on or lead. Permanent or contract engagement, billed monthly by hours worked through the owner's own company (max 40 h a week).
- Wants a culture that is data-driven and treats engineering as a discipline: traceable, maintainable, not dependent on individual heroes.

## Open

- Availability and the "available immediately" wording.
- Whether the 800+ commits figure is fine to publish.
- Email: the Drive CV says `onerizafer@gmail.com`, the site button uses `onerzfr@gmail.com`.
