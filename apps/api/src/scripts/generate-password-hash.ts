import * as bcrypt from 'bcrypt';

async function generateHash() {
  const password = process.argv[2];

  if (!password) {
    console.log(
      'Usage: npx ts-node src/scripts/generate-password-hash.ts <password>',
    );
    console.log(
      'Example: npx ts-node src/scripts/generate-password-hash.ts admin123',
    );
    process.exit(1);
  }

  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  console.log('\nPassword Hash Generator');
  console.log('=======================');
  console.log(`Password: ${password}`);
  console.log(`Hash: ${hash}`);
  console.log('\nAdd this to your .env file:');
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
}

void generateHash();
