#!/usr/bin/env node

/**
 * CodaiPro Setup Verification Script
 * Checks if all required configuration is in place
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 CodaiPro Setup Verification\n');

let hasErrors = false;
let hasWarnings = false;

// Check 1: Environment file
console.log('📋 Checking environment configuration...');
const envPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), '.env.local.example');

if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found!');
  console.log('   Run: cp .env.local.example .env.local');
  hasErrors = true;
} else {
  console.log('✅ .env.local file exists');
  
  // Check environment variables
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const requiredVars = [
    'NEXT_PUBLIC_APPWRITE_ENDPOINT',
    'NEXT_PUBLIC_APPWRITE_PROJECT_ID',
    'NEXT_PUBLIC_APPWRITE_DATABASE_ID',
  ];
  
  requiredVars.forEach(varName => {
    if (!envContent.includes(varName) || envContent.includes(`${varName}=your-`)) {
      console.log(`⚠️  ${varName} not configured properly`);
      hasWarnings = true;
    } else {
      console.log(`✅ ${varName} configured`);
    }
  });
}

// Check 2: Node modules
console.log('\n📦 Checking dependencies...');
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('❌ node_modules not found!');
  console.log('   Run: npm install');
  hasErrors = true;
} else {
  console.log('✅ Dependencies installed');
}

// Check 3: Required files
console.log('\n📁 Checking required files...');
const requiredFiles = [
  'app/page.tsx',
  'lib/appwrite.ts',
  'hooks/useAuth.ts',
  'components/ui/button.tsx',
  'components/marketing/hero-section.tsx',
];

requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} missing`);
    hasErrors = true;
  }
});

// Check 4: Next.js configuration
console.log('\n⚙️  Checking Next.js configuration...');
const nextConfigPath = path.join(process.cwd(), 'next.config.ts');
if (fs.existsSync(nextConfigPath)) {
  console.log('✅ next.config.ts exists');
} else {
  console.log('⚠️  next.config.ts not found');
  hasWarnings = true;
}

// Summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ Setup incomplete! Please fix the errors above.');
  console.log('\n📚 Refer to SETUP_GUIDE.md for detailed instructions.');
  process.exit(1);
} else if (hasWarnings) {
  console.log('⚠️  Setup mostly complete, but please review warnings.');
  console.log('\n📚 Refer to APPWRITE_SETUP.md to configure Appwrite.');
  console.log('\nYou can still run the app with: npm run dev');
} else {
  console.log('✅ All checks passed! Setup is complete.');
  console.log('\n🎉 You\'re ready to start developing!');
  console.log('\nNext steps:');
  console.log('  1. Configure Appwrite (see APPWRITE_SETUP.md)');
  console.log('  2. Run: npm run dev');
  console.log('  3. Open: http://localhost:3000');
}
console.log('='.repeat(50) + '\n');
