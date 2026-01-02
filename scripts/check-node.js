#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if .nvmrc exists and warn about version mismatch
const nvmrcPath = path.join(process.cwd(), '.nvmrc');
if (fs.existsSync(nvmrcPath)) {
  const requiredVersion = fs.readFileSync(nvmrcPath, 'utf8').trim();
  const currentVersion = process.version.slice(1); // Remove 'v' prefix
  
  if (!currentVersion.startsWith(requiredVersion)) {
    console.warn(`⚠️  Expected Node ${requiredVersion}, but using ${currentVersion}`);
    console.warn(`   Run: nvm use ${requiredVersion}`);
  }
}

// Run the command
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('No command provided');
  process.exit(1);
}

const child = spawn(args[0], args.slice(1), {
  stdio: 'inherit',
  shell: true
});

child.on('exit', (code) => {
  process.exit(code);
});