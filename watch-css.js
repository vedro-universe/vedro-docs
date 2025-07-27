#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const cssPath = path.join(__dirname, './src/pages/IndexPage/Styles/index.min.css');
const cssSourcePath = path.join(__dirname, './src/pages/IndexPage/Styles/index.css');
const jsPath = path.join(__dirname, './src/pages/IndexPage/Styles/index.js');
const tailwindConfigPath = path.join(__dirname, './tailwind.config.js');

let tailwindProcess;

function generateModule() {
  try {
    const css = fs.readFileSync(cssPath, 'utf8');
    // Escape backticks and dollar signs to avoid template literal issues
    const escapedCss = css
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$/g, '\\$');
    
    const js = `// Auto-generated from index.min.css - DO NOT EDIT
export default \`${escapedCss}\`;
`;

    fs.writeFileSync(jsPath, js);
    console.log(`✓ Generated index.js (${new Date().toLocaleTimeString()})`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('Waiting for index.min.css...');
    } else {
      console.error('Error generating module:', err);
    }
  }
}

function startTailwind() {
  console.log('Starting Tailwind CSS compiler...');
  
  tailwindProcess = spawn('npx', [
    'tailwindcss',
    '-c', tailwindConfigPath,
    '-i', cssSourcePath,
    '-o', cssPath,
    '--minify',
    '--watch'
  ], {
    stdio: 'pipe',
    shell: process.platform === 'win32'
  });

  // Handle both stdout and stderr (Tailwind outputs to stderr)
  const handleOutput = (data) => {
    const output = data.toString().trim();
    if (output) {
      console.log(`[Tailwind] ${output}`);
    }
  };

  tailwindProcess.stdout.on('data', handleOutput);
  tailwindProcess.stderr.on('data', handleOutput);

  tailwindProcess.on('error', (err) => {
    console.error('Failed to start Tailwind process:', err);
    process.exit(1);
  });

  tailwindProcess.on('close', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`Tailwind process exited with code ${code}`);
      process.exit(code);
    }
  });
}

function watchCssChanges() {
  // Initial generation attempt
  generateModule();

  // Watch for changes to the minified CSS
  console.log(`Watching ${cssPath} for changes...`);

  let timeout;
  fs.watch(cssPath, (eventType) => {
    // Debounce to avoid multiple rapid regenerations
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (eventType === 'change') {
        generateModule();
      }
    }, 100);
  });
}

// Start both processes
async function start() {
  console.log('=================================');
  console.log('CSS Build Pipeline Started');
  console.log('=================================');
  console.log(`Source CSS: ${cssSourcePath}`);
  console.log(`Output CSS: ${cssPath}`);
  console.log(`Output JS:  ${jsPath}`);
  console.log('=================================\n');

  // Start Tailwind CSS compiler
  startTailwind();

  // Give Tailwind a moment to start up before watching
  setTimeout(() => {
    watchCssChanges();
  }, 1000);
}

// Handle graceful shutdown
function shutdown() {
  console.log('\n\nStopping CSS build pipeline...');
  
  if (tailwindProcess) {
    tailwindProcess.kill('SIGTERM');
  }
  
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Keep the process running
process.stdin.resume();

// Start everything
start();
