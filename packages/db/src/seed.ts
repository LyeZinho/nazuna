import { db } from './index';
import './seed-categories';
import './seed-works';
import './seed-characters';

async function main() {
  console.log('🎲 Running main seed...');
  console.log('This will run all seeds in order:');
  console.log('1. Categories');
  console.log('2. Works');
  console.log('3. Characters');
  console.log('\nAll seeds have been executed as part of imports above.');
  
  await db.end();
}

main();
