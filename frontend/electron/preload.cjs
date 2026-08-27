const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  auth: {
    login: (username, password) =>
      ipcRenderer.invoke("auth:login", {
        username,
        password,
      }),

    changePassword: (userId, currentPassword, newPassword) =>
      ipcRenderer.invoke("auth:change-password", {
        userId,
        currentPassword,
        newPassword,
      }),
    changeUserName:(userId,username)=>
      ipcRenderer.invoke("auth:change-username",{
        userId,
        username
      })
    
  },
  customer:{
    add:(name,phone,company,address)=>ipcRenderer.invoke("customer:add",{

    })
  }
});