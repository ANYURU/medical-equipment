#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

const nvmrcPath = path.join(process.cwd(), '.nvmrc');

if (!fs.existsSync(nvmrcPath)) {
  console.error('No .nvmrc file found');
  process.exit(1);
}

const required = fs.readFileSync(nvmrcPath, 'utf8').trim();
const current = process.version.slice(1);

if (current.startsWith(required)) {
  // Correct version, run command
  const args = process.argv.slice(2);
  execSync(args.join(' '), { stdio: 'inherit', shell: true });
  process.exit(0);
}

// Wrong version - check for nvm
const nvmDir = process.env.NVM_DIR || path.join(os.homedir(), '.nvm');
const nvmScript = path.join(nvmDir, 'nvm.sh');

if (!fs.existsSync(nvmScript)) {
  console.error(`\n❌ Node version mismatch: using ${current}, need ${required}`);
  console.error(`❌ nvm not found at ${nvmDir}\n`);
  console.log('📦 Install nvm:');
  console.log('   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash\n');
  console.log('Then restart your terminal and run:');
  console.log(`   nvm install ${required}`);
  console.log(`   nvm use ${required}\n`);
  process.exit(1);
}

// nvm exists - auto-switch
console.log(`🔄 Switching Node ${current} → ${required}...`);

const command = process.argv.slice(2).join(' ');
const script = `
export NVM_DIR="${nvmDir}"
source "$NVM_DIR/nvm.sh"

# Check if version is installed
if ! nvm ls ${required} >/dev/null 2>&1; then
  echo "📦 Installing Node ${required}..."
  nvm install ${required} || exit 1
fi

nvm use ${required} || exit 1
${command}
`;

try {
  execSync(script, { 
    stdio: 'inherit', 
    shell: '/bin/bash',
    env: { ...process.env, NVM_DIR: nvmDir }
  });
} catch (error) {
  process.exit(error.status || 1);
}
