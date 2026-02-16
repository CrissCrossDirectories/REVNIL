
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin
// Note: When running locally with 'firebase functions:shell' or similar, 
// explicit credentials might be needed if not using the emulator. 
// However, effectively for a script, we can often rely on Google Application Default Credentials 
// if authenticated via `gcloud auth application-default login`.
// Or we can just try initializeApp() with no args if we are in an environment 
// that supports it (like Cloud Shell or with GOOGLE_APPLICATION_CREDENTIALS set).

initializeApp();

async function createAdmin() {
  const email = 'terry@crisscross.com';
  const password = 'temporaryPassword123!'; // User should change this
  
  try {
    let user;
    try {
      user = await getAuth().getUserByEmail(email);
      console.log(`User ${email} already exists. UID: ${user.uid}`);
    } catch (error: any) {
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

    // Set custom claims
    const claims = {
      platformAdmin: true,
      role: 'org_admin',
      tenantType: 'institution', // Placeholder to satisfy TenantClaims if strict
      tenantId: 'platform',      // Placeholder
      sportIds: [],
    };

    await getAuth().setCustomUserClaims(user.uid, claims);
    console.log(`Successfully set admin claims for ${email}:`, claims);
    
    // Verify
    const updatedUser = await getAuth().getUser(user.uid);
    console.log('Verified claims:', updatedUser.customClaims);

  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
