#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const isWindows = process.platform === 'win32';
const npmBin = isWindows ? 'npx.cmd' : 'npx';
const webRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = path.resolve(webRoot, '../..');

spawnSync(process.execPath, ['tools/generate-llms.js'], {
  stdio: 'inherit',
  cwd: webRoot,
});

const appViteCli = path.join(webRoot, 'node_modules', 'vite', 'bin', 'vite.js');
const workspaceViteCli = path.join(workspaceRoot, 'node_modules', 'vite', 'bin', 'vite.js');
const localViteCli = existsSync(appViteCli) ? appViteCli : workspaceViteCli;

const command = existsSync(localViteCli) ? process.execPath : npmBin;
const args = existsSync(localViteCli)
  ? [localViteCli, 'build', '--outDir', '../../dist/apps/web']
  : ['vite', 'build', '--outDir', '../../dist/apps/web'];

const result = spawnSync(command, args, {
  stdio: 'inherit',
  cwd: webRoot,
  shell: false,
});

process.exit(result.status ?? 1);
