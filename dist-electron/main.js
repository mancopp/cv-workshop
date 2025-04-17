import { app as o, BrowserWindow as n } from "electron";
const t = () => {
  new n({
    width: 800,
    height: 600
  }).loadURL("http://localhost:3000");
};
o.whenReady().then(() => {
  t();
});
