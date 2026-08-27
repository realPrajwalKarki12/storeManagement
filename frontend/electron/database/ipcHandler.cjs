const {db} =require("./dj.cjs")
const bcrypt = require('bcrypt');
const {ipcMain}=require("electron")

function registerIpcHandlers(){



    //Auth part

    ipcMain.handle('auth:login', async (event, { username, password }) => {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (!user) return { success: false };
    const valid = await bcrypt.compare(password, user.password_hash);
    return valid
      ? { success: true, user: { id: user.id, username: user.username, role: user.role } }
      : { success: false };
  });


  //changing username

  ipcMain.handle("auth:change-username",(event,{userId,username})=>{
       try{
        const user=db.prepare('SELECT * FROM users WHERE id= ?').get(userId);
        if (!user) {
      return {
        success: false,
        message: 'User not found'
      };
    }
//   const newUserName=username;
 db.prepare(`
      UPDATE users
      SET username = ?
      WHERE id = ?
    `).run(username, user.id);

      return {
      success: true,
      message: 'Username changed successfully'
    };
       }catch(error){
         console.error('Change password error:', error);

    return {
      success: false,
      message: 'Failed to change username'
    };
       }
  })
//changing password


ipcMain.handle('auth:change-password', (event, { userId, currentPassword, newPassword }) => {
  try {
    // Find the user
    const user = db
      .prepare('SELECT * FROM users WHERE id = ?')
      .get(userId);

    if (!user) {
      return {
        success: false,
        message: 'User not found'
      };
    }

    // Verify current password
    const validPassword = bcrypt.compareSync(
      currentPassword,
      user.password_hash
    );

    if (!validPassword) {
      return {
        success: false,
        message: 'Current password is incorrect'
      };
    }

    // Basic password validation
    // if (!newPassword || newPassword.length < 4) {
    //   return {
    //     success: false,
    //     message: 'New password must be at least 4 characters'
    //   };
    // }

    // Hash the new password
    const newPasswordHash = bcrypt.hashSync(newPassword, 10);

    // Update password
    db.prepare(`
      UPDATE users
      SET password_hash = ?
      WHERE id = ?
    `).run(newPasswordHash, user.id);

    return {
      success: true,
      message: 'Password changed successfully'
    };

  } catch (error) {
    console.error('Change password error:', error);

    return {
      success: false,
      message: 'Failed to change password'
    };
  }
});


//for  customers
ipcMain.handle('customer:add',(event,customer)=>{
 const stmt = db.prepare(`
      INSERT INTO customers (name, phone, company, address)
      VALUES (@name, @phone, @company, @address)
    `);
    const result = stmt.run(customer);
    return { id: result.lastInsertRowid, ...customer };
})
}

module.exports={registerIpcHandlers}