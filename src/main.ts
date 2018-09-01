import { app, BrowserWindow } from 'electron'
import * as path from 'path'

require('electron-context-menu')({
  prepend: (params: Electron.ContextMenuParams, browserWindow: BrowserWindow) => [{
    visible: params.mediaType === 'image',
  }],
})

let mainWindow: Electron.BrowserWindow
const appURL = 'https://web.whatsapp.com/'
const appName = 'WhatsApp linux'
const bgColor = '#080808'
const fs = require('fs')

const createWindow = () => {
  mainWindow = new BrowserWindow({
    backgroundColor: bgColor,
    height: 600,
    icon: path.join(__dirname, 'icon/64x64.png'),
    width: 900,
  })

  mainWindow.loadURL(appURL)
  mainWindow.setTitle(appName)
  mainWindow.webContents.on('did-finish-load', function() {
  	fs.readFile(__dirname+ '/stylo.css', "utf-8", function(error:any, data:any) {
		if(!error){
			var formatedData = data.replace(/\s{2,10}/g, ' ').trim()
			mainWindow.webContents.insertCSS(formatedData)
		}
	})
  })
  mainWindow.setMenuBarVisibility(false)
  mainWindow.setAutoHideMenuBar(true)
}

app.on('ready', () => createWindow())
app.on('window-all-closed', () => app.quit())
