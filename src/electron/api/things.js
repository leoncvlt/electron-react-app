const { ipcMain } = require("electron");
const { create, insert, find, remove, update } = require("../db");

create("things");

ipcMain.handle("things.insert", async (event, thing) => {
  return await insert("things", thing);
});

ipcMain.handle("things.find", async (event, query) => {
  return await find("things", query);
});

ipcMain.handle("things.remove", async (event, id) => {
  return await remove("things", { id });
});

ipcMain.handle("things.update", async (event, id, set) => {
  return await update("things", { id }, set);
});
