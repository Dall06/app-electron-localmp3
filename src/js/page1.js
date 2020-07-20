//-----------------------------REQUIREMENTS-----------------------------------------------
const {ipcRenderer, remote} = require('electron')
const notifier = require('node-notifier');
const path = require('path');

//const fs = require('fs');

//const { dialog } = window.require('electron').remote;
console.log("Hola");
//console.log(dialog);

//-----------------------------VARIABLES GLOBALES-----------------------------------------------
var LstCancion = [
    {Path: '../media/1.mp3', urlImage : '../img/51505.jpg', Name: "cancion 1", Autor : "Unknown", ID: 0},
    {Path: '../media/2.mp3', urlImage: '../img/2.jpg', Name: "cancion 2", Autor : "Unknown", ID: 1},
    {Path: '../media/2.mp3', urlImage: '../img/2.jpg', Name: "cancion 3", Autor : "Unknown", ID: 2},
    {Path: '../media/2.mp3', urlImage: '../img/2.jpg', Name: "cancion 4", Autor : "Unknown", ID: 3},
    {Path: '../media/2.mp3', urlImage: '../img/2.jpg', Name: "cancion 5", Autor : "Unknown", ID: 4},
    {Path: '../media/2.mp3', urlImage: '../img/2.jpg', Name: "cancion 6", Autor : "Unknown", ID: 5},
    {Path: '../media/2.mp3', urlImage: '../img/2.jpg', Name: "cancion 7", Autor : "Unknown", ID: 6},
    {Path: '../media/2.mp3', urlImage: '../img/2.jpg', Name: "cancion 8", Autor : "Unknown", ID: 7}
];

var ID = 0;

var s1 = '<div class="p-2 dvHover"><h6 style="color: white; position: relative; left: 10px" onclick="thisPlay()">'
var s2 = '</h6></div>'

//-----------------------------EVENTOS MATERIALIZE-----------------------------------------------
//BotonFlotante
document.addEventListener('DOMContentLoaded', () => {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems,{
        direction: 'top'
      });
});

//Buscador
function Buscar(){
    var Busqueda = document.getElementById("txtBusqueda");

    $("#blockCanciones").empty();

    LstCancion.forEach(elemento =>
        {
            if(elemento.Name.toUpperCase().includes(Busqueda.value.toUpperCase()))
            {
            var vString = '<div class="p-2 dvHover"><h6 style="color: white; position: relative; left: 30px" onclick="thisPlay('+elemento.ID+')">'
            vString += (elemento.ID + 1) + '.- ' +elemento.Name;
            vString += s2;
            $("#blockCanciones").append(vString);
            }
        });

}
//CargaInicial
window.addEventListener('load', () => {
    setTimeout(function()
    {
        document.getElementById("dv1").className = 'row p-1 container';
        document.getElementById("carga").className = "progress loadingbar hide";
        document.getElementById("btnFlotante").className = "fixed-action-btn";
    },
    2000);
    
    
});

//-----------------------------FUNCIONES DISPLAY-----------------------------------------------
//Carga para aparecer la cancion
var cargaLista = () =>
{
    $("#blockCanciones").empty();

    LstCancion.forEach(element =>
        {
            var vString = '<div class="p-2 dvHover"><h6 style="color: white; position: relative; left: 30px" onclick="thisPlay('+element.ID+')">'
            vString += (element.ID + 1) + '.- ' +element.Name;
            vString += s2;
    
        $("#blockCanciones").append(vString);
        }
    );
};

function thisPlay(id){
    var _id = id;
    
    Song.src = LstCancion[_id].Path;
    console.log("path: " + Song.src);

    document.getElementById("txtNomC").innerHTML = LstCancion[_id].Name;
    document.getElementById("txtAutor").innerHTML = LstCancion[_id].Autor;
    document.getElementById("imgSong").src = LstCancion[_id].urlImage;

    $("#btnPlay").empty();
    var element = '<i class="material-icons" style="color: black;" id="ArrL">pause</i>'
    $("#btnPlay").append(element);

    Song.play();
    aux = 1;

    console.log("Start")

}

//-----------------------------FUNCIONES FILECHOOSER-----------------------------------------------
//Eleccion de archivo de audio
var ImgSrc = document.getElementById("ImgSrc");
var SongSrc = document.getElementById("SongSrc");

var Nickname = document.getElementById("Nickname");
var ImgSrcU = document.getElementById("ImgSrcU");

var txtNombre = document.getElementById("SongName");
var txtAutor = document.getElementById("SongAutor");
var AddAux = 0;
var editAux = 0;

function addFuncion(){
    if(AddAux === 0){
        document.getElementById("dv1").className = 'row p-1 container hide';
        document.getElementById("carga").className = "progress loadingbar hide";
        document.getElementById("blockAdd").className = "Add";
        document.getElementById("blockEdit").className = "Add hide";
        AddAux = 1;
    }
    else{
        document.getElementById("dv1").className = 'row p-1 container';
        document.getElementById("carga").className = "progress loadingbar hide";
        document.getElementById("blockAdd").className = "Add hide";
        document.getElementById("blockEdit").className = "Add hide";
        AddAux = 0;
    }

}

function AgregarCancion(){
    if(!ImgSrc.files)
    {
        alert("Selecciona una imagen");
    }

    if(!SongSrc.files)
    {
        alert("Selecciona una Cancion");
    }
    _ID = LstCancion.length;

    var data = {Path: SongSrc.files[0].path, urlImage : ImgSrc.files[0].path, Name: txtNombre.value, Autor : txtAutor.value, ID: _ID};
    LstCancion.push(data);

    document.getElementById("dv1").className = 'row p-1 container';
    document.getElementById("carga").className = "progress loadingbar hide";
    document.getElementById("blockAdd").className = "Add hide";
    document.getElementById("blockEdit").className = "Add hide";

    notificacionAgregar();
    cargaLista();
}

function editFuncion(){
    if(editAux === 0){
        document.getElementById("dv1").className = 'row p-1 container hide';
        document.getElementById("carga").className = "progress loadingbar hide";
        document.getElementById("blockAdd").className = "Add hide";
        document.getElementById("blockEdit").className = "Add";
        editAux = 1;
    }
    else{
        document.getElementById("dv1").className = 'row p-1 container';
        document.getElementById("carga").className = "progress loadingbar hide";
        document.getElementById("blockAdd").className = "Add hide";
        document.getElementById("blockEdit").className = "Add hide";
        editAux = 0;
    }
}

function EdicionCompleta(){
    if(!ImgSrcU.files)
    {
        alert("Selecciona una imagen");
    }

    document.getElementById("lblUser").innerHTML = Nickname.value;
    document.getElementById("lblImg").src = ImgSrcU.files[0].path;

    document.getElementById("dv1").className = 'row p-1 container';
    document.getElementById("carga").className = "progress loadingbar hide";
    document.getElementById("blockAdd").className = "Add hide";
    document.getElementById("blockEdit").className = "Add hide";

    notificacionEditar();
}

//-----------------------------FUNCIONES MP3-----------------------------------------------
//
var songTitle = document.getElementById("txtNomC");
var fillBar = document.getElementById("fill");

var Song = new Audio();
let currSong = 0;
let aux = 0;

function StartSong(){
    Song.src = LstCancion[currSong].Path;
    console.log("path: " + Song.src)
    document.getElementById("txtNomC").innerHTML = LstCancion[currSong].Name;
    document.getElementById("txtAutor").innerHTML = LstCancion[currSong].Autor;
    document.getElementById("imgSong").src = LstCancion[currSong].urlImage;
    Song.pause();
    aux = 0;
    console.log("Start")
}


function PlaySong(){
    Song.src = LstCancion[currSong].Path;
    console.log("path: " + Song.src);

    document.getElementById("txtNomC").innerHTML = LstCancion[currSong].Name;
    document.getElementById("txtAutor").innerHTML = LstCancion[currSong].Autor;
    document.getElementById("imgSong").src = LstCancion[currSong].urlImage;

    $("#btnPlay").empty();
    var element = '<i class="material-icons" style="color: black;" id="ArrL">pause</i>'
    $("#btnPlay").append(element);

    Song.play();
    aux = 1;

    console.log("Start")
}

StartSong();

function PlayPause(){
    console.log("hola")
    if(aux === 0)
    {
        aux = 1;
        Song.play();
        console.log("play")
        $("#btnPlay").empty();
        var element = '<i class="material-icons" style="color: black;" id="ArrP">pause</i>'
        $("#btnPlay").append(element);
    }
    else
    {
        aux = 0;
        Song.pause();
        console.log("pausa")
        $("#btnPlay").empty();
        var element = '<i class="material-icons" style="color: black;" id="ArrP">play_arrow</i>'
        $("#btnPlay").append(element);
    }
}

Song.addEventListener('timeupdate',() =>{
    var position = Song.currentTime / Song.duration;
    fillBar.style.width = position * 100+'%';
})

function NextSong()
{
    console.log(currSong++);
    if(currSong > LstCancion.length)
    {
        currSong = 0;
    }
    PlaySong();
}

function PrevSong()
{
    console.log(currSong--);
    if(currSong < 0)
    {
        currSong = LstCancion.length - 1;
    }
    PlaySong();
}

function playThis(){

}
//-----------------------------FUNCIONES MENUBAR-----------------------------------------------
//Minimizar
document.getElementById('minimize-button').addEventListener('click', () => {
  remote.getCurrentWindow().minimize()
})
//Salir
function exit(){
    document.getElementById("dv1").className = 'row p-1 container hide';
    document.getElementById("carga").className = "progress loadingbar";
    document.getElementById("btnFlotante").className = "fixed-action-btn hide";
    setTimeout(function()
    {
        remote.app.quit()
    },
    1500);
}
//Boton salir
document.getElementById('close-button').addEventListener('click', () => {
  exit();
})

//-----------------------------FUNCIONES NOTIFICACIONES----------------------------------------------
         
function notificacionAgregar(event){
    var user = document.getElementById("lblUser").innerHTML;

    notifier.notify(
    {
        title: 'Cancion agregada',
        message: 'Hola '+ user +', has agregado una cancion!',
        icon: path.join(__dirname, '../img/info.png'), // Absolute path (doesn't work on balloons)
        sound: true, // Only Notification Center or Windows Toasters
        wait: true // Wait with callback, until user action is taken against notification
    },
    function(err, response) {/* Response is response from notification*/}
    );
         
    notifier.on('click', function(notifierObject, options) {
    // Triggers if `wait: true` and user clicks notification
    });
         
    notifier.on('timeout', function(notifierObject, options) {
         // Triggers if `wait: true` and notification closes
        });
}

function notificacionEditar(event){
    var user = document.getElementById("lblUser").innerHTML;

    notifier.notify(
    {
        title: 'Usuario configurado',
        message: 'Hola '+ user +', agregaste tu nombre y una imagen personalizada',
        icon: path.join(__dirname, '../img/info.png'), // Absolute path (doesn't work on balloons)
        sound: true, // Only Notification Center or Windows Toasters
        wait: true // Wait with callback, until user action is taken against notification
    },
    function(err, response) {/* Response is response from notification*/}
    );
         
    notifier.on('click', function(notifierObject, options) {
    // Triggers if `wait: true` and user clicks notification
    });
         
    notifier.on('timeout', function(notifierObject, options) {
         // Triggers if `wait: true` and notification closes
        });
}

//Cargado de lista para proyectar
cargaLista();