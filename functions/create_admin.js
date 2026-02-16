
const admin = require('firebase-admin');
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

// Initialize Firebase Admin with credentials from env var GOOGLE_APPLICATION_CREDENTIALS
initializeApp();

async function createAdmin() {
  const email = 'terry@crisscross.com';
  const password = 'temporaryPassword123!'; // User should change this later!
  
  try {
    let user;
    try {
      user = await getAuth().getUserByEmail(email);
      console.log(`User ${email} found. UID: ${user.uid}`);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        console.log(`Creating user ${email}...`);
        user = await getAuth().createUser({
          email,
          password,
          emailVerified: true,
          displayName: 'Terry Utley'
        });
        console.log(`User created. UID: ${user.uid}`);
        console.log(`Initial password: ${password}`);
      } else {
        throw error;
      }
    }

    // Set custom claims suitable for "org_admin"
    const claims = {
      platformAdmin: true,
      role: 'org_admin',
      tenantType: 'institution', 
      tenantId: 'inst_ou', // Use a realistic institution ID (Oklahoma, from seed)
      sportIds: []
    };

    await getAuth().setCustomUserClaims(user.uid, claims);
    console.log(` successfully set admin claims for ${email}:`, claims);
    
    // Verify
    const updatedUser = await getAuth().getUser(user.uid);
    console.log('Verified claims:', updatedUser.customClaims);

  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
