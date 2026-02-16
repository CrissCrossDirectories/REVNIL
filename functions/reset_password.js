
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

initializeApp();

async function resetPassword() {
  const email = 'terry@crisscross.com';
  const newPassword = 'temporaryPassword123!'; 
  
  try {
    const user = await getAuth().getUserByEmail(email);
    console.log(`User ${email} found. UID: ${user.uid}`);
    
    await getAuth().updateUser(user.uid, {
        password: newPassword
    });
    console.log(`Password reset to: ${newPassword}`);

  } catch (error) {
    console.error('Error resetting password:', error);
    process.exit(1);
  }
}

resetPassword();
