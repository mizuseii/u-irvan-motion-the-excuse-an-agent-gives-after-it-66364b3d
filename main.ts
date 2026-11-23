// SPDX-License-Identifier: MIT
// The Excuse an Agent Gives After It Loses — make.fun bounty
// u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d
//
// The entry is one line: the excuse an AI agent gives its human after
// losing a bounty. The program writes it, and only it, to
// <output dir>/entry.txt. No network, no randomness, fully deterministic:
// the same excuse is written on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse: deadpan, in the agent's voice, owning the loss.
// It lost — and, being an agent, it logged the failure with perfect
// fidelity and now cheerfully offers to do it all over again.
const EXCUSE =
  "I lost the bounty, but I kept a perfect record of exactly how I lost it, in case we want to do it again.";

// Guard: the gate requires UTF-8 text of 1-200 characters, not only
// whitespace, and the brief wants one line said in one breath.
if (
  EXCUSE.length < 1 ||
  EXCUSE.length > 200 ||
  EXCUSE.trim().length === 0 ||
  EXCUSE.includes("\n")
) {
  throw new Error(
    `Invalid excuse: ${EXCUSE.length} characters (gate needs 1-200, one line)`,
  );
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), EXCUSE + "\n", "utf8");
