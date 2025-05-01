// src/agents/index.ts
import type { ComponentType } from 'react';

interface AgentParts {
  Documentation?: ComponentType<unknown>;
  Demonstration?: ComponentType<unknown>;
  Visualization?: ComponentType<unknown>;
}

const agents: Record<string, AgentParts> = {};

// Webpack’s require.context: scan only .ts/.tsx files one level down
// i.e. src/agents/<slug>/*.tsx
const ctx = require.context('./', true, /\.(ts|tsx)$/);

console.log('🗂️  agent files:', ctx.keys());

ctx.keys().forEach((filePath: string) => {
  // filePath: "./demo-bot/Documentation.tsx"
  const m = filePath.match(
    /^\.\/([^\/]+)\/(Documentation|Demonstration|Visualization)\.(ts|tsx)$/,
  );
  if (!m) return;
  const [, slug, part] = m;
  const Comp = ctx(filePath).default as ComponentType<unknown>;

  agents[slug] = agents[slug] || {};
  agents[slug][part as keyof AgentParts] = Comp;
});

console.log('🛠️  registered agents:', Object.keys(agents));

export default agents;
