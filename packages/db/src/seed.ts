import { db } from './index';

async function main() {
  console.log('🎲 Running main seed...');
  
  console.log('This will run all seeds in order:');
  console.log('1. Categories');
  console.log('2. Works');
  console.log('3. Characters');
  console.log('\nRun individually:');
  console.log('  pnpm db:seed:categories');
  console.log('  pnpm db:seed:works');
  console.log('  pnpm db:seed:characters');
  
  await db.end();
}

main();
