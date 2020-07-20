'use strict';
//------------------------------REQUERIMENTS----------------------------------------------
const { app, BrowserWindow, Menu, dialog} = require('electron');
const {ipcMain} = require('electron');
const fs = require('fs'); 
const url = require('url');
const path = require('path');

//const Menu = electron.Menu;
 //ES6
//-----------------------------RELOAD-----------------------------------------------
if(process.env.NODE_ENV !== 'production')
{
    require('electron-reload')(__dirname,{
        electron : path.join(__dirname,'../node_modules','.bin','electron')
    });
}
//-----------------------------FUNCIONES APP-----------------------------------------------
app.on('before-quit',() =>
{
    console.log("Saliendo");
});
//-----------------------------FUNCIONES WINDOW-----------------------------------------------
let win;

function createWindow(){
	win = new BrowserWindow(
		{
			width: 850,
			height: 550,
			webPreferences: {
                nodeIntegration: true
            },
            //DESACTIVA EL MENUBAR
            frame: false
        });
        //CONSUME HTML
		win.loadURL(url.format({
			pathname: path.join(__dirname, 'src/html/page1.html'),
			protocol: 'file',
			slashes: true
        }));
        //POSICION DE LA PANTALLA
        win.on('move', () => {
            const position = win.getPosition();
        });
        //CERRAR APP
        win.on('closed', () => {
            app.quit();
        });
        //TEMPLATE
        var menu = Menu.buildFromTemplate([
            {
                label: 'Menu',
                submenu: [
                {
                    label:'File', click(){
                        const files = dialog.showOpenDialog({
                        properties : ['openFile']
                        }).then(result => {
                            //console.log(result.canceled)
                            console.log(result.filePaths)
                            if(result[0] === 'undefined'){ console.log("Vale shit");return;}
                            const file = result[0];
                        }).catch(err => {
                            console.log(err)
                        })
                    },
                    accelerator: 'Ctrl+O'
                },
                {label:'Development tool', click(){win.webContents.openDevTools()}, accelerator: 'Ctrl+T'},
                {label:'Exit', click(){app.quit()} ,accelerator: 'Ctrl+Q'}
                ]
            }
        ])
        Menu.setApplicationMenu(menu); 
}
//-----------------------------FUNCIONES IPC PARA ENVIAR DATOS-----------------------------------------------
//FILE DIALOG
/*ipcMain.on('openFile', (event, arg) => { 
    ipcMain.on('click-button',(event, arg) =>{
        if(arg === 'true'){
            dialog.showOpenDialog(function(fileNames){
                if(fileNames === undefined){
                    console.log("NO FILE");
                }
                else{
                    readFile(fileNames[0]);
                }
            });
        }
    })

    function readFile(filepath){
        fs.readFile(filepath,'utf-8',(err,data)=>{
            if(err){
                alert("ERROR: " + err.message);
                return;
            }
            event.sender.send('fileData',data);
        });
    }
});*/


//-----------------------------FUNCION PARA INICIAR EL PROCESO-----------------------------------------------
app.on('ready', createWindow);