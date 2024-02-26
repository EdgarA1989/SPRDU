//EVENTO QUE ELIMINA FLECHA AL SCROLLEAR

window.addEventListener("scroll", function () {
  const elemento = document.getElementById("flecha");

  if (window.scrollY === 0) {
    elemento.style.display = "none";
  }
});

//FUNCION QUE SE DISPARA POR EVENTO SI SE CAMBIA EL VALOR DE EQUIPAMIENTO.
//PARA NO MOSTRAR SOLUIOCNES Tll Y lsr 3080 AL ACTUALIZAR CONSOLAS.

const equipamientoSelect = document.getElementById("equipamiento");

equipamientoSelect.addEventListener("change", function () {
  const t1000Laser = document.querySelector(".LSRT1000");
  const t1000Tallion = document.querySelector(".TLLT1000");

  if (equipamientoSelect.value === "Consola") {
    t1000Laser.style.display = "none"; // Utilizar .style.display en lugar de setAttribute
    t1000Tallion.style.display = "none";
  } else {
    t1000Laser.style.display = "block";
    t1000Tallion.style.display = "block";
  }
});

//FUNCIONES PARA SABER NUMEROS DE MODELO
function numeroEquipamiento(equipamiento) {
  if (equipamiento == "Validador") {
    return 20;
  } else if (equipamiento == "Consola") {
    return 1;
  }
}

function numeroModelo(modelo) {
  switch (modelo) {
    case "Laser 3090":
      return 68;
    case "Laser 3075":
      return 54;
    case "Laser 3080":
      return 1;
    case "Tallion":
      return 9;
    case "Sonda":
      return 52;
  }
}

//FUNCIONES SOBRE LOS INSERTS A LA BASE DE DATOS
function AvailablesRawSQL(ruta) {
  return `echo "INSERT INTO AvailablesRaw (isPathToFile,datos)VALUES(1,'${ruta}');"  | sqlite3 /opt/ConcentradorUnico/BD_UpdaterV11.db`;
}

function AvailablesSQL(
  idEmpresa,
  idTerminal,
  tipoUpdate,
  tipoTerminal,
  version,
  ruta
) {
  return `echo "INSERT INTO Availables VALUES(${idEmpresa},0,1,${idTerminal}, ${tipoUpdate}, ${tipoTerminal}, ${version},0,0,0,1,1,(select MAX(idUpdate) FROM AvailablesRaw WHERE datos = '${ruta}') ,NULL,NULL,1);" | sqlite3 /opt/ConcentradorUnico/BD_UpdaterV11.db`;
}

function VersionActivaSQL(
  idEmpresa,
  idTerminal,
  tipoUpdate,
  tipoTerminal,
  version
) {
  return `echo "INSERT INTO VERSIONACTIVA VALUES (${idEmpresa},0,1,${idTerminal}, ${tipoUpdate}, ${tipoTerminal}, ${version});"  | sqlite3 /opt/ConcentradorUnico/BD_UpdaterV11.db`;
}

function UpdateVersionActivaSQL(
  idEmpresa,
  idTerminal,
  tipoUpdate,
  tipoTerminal,
  version
) {
  return `echo "UPDATE  VERSIONACTIVA  set version=${version} WHERE empresa=${idEmpresa} and tipoUpdate=${tipoUpdate} 
  and tipoDispositivo=${tipoTerminal} and idTerminal=${idTerminal};" | sqlite3 /opt/ConcentradorUnico/BD_UpdaterV11.db`;
}

function creadorConsultas(
  AvailablesRaw,
  Availables,
  VersionActiva,
  UpdateVersionActiva,
  idTerminal,
  idEmpresa,
  version,
  modelo
) {
  let carga = `<h4 style="color:yellow;margin-bottom:10px;">#*Cargar en la empresa ${idEmpresa} Interno ${idTerminal} la Versión de  FW ${version} Dispositivo ${modelo}*</h4>`;
  let sudobash = `<h4>sudo bash</h4>`;
  let stopConcentradorUnico = `<h4>stop ConcentradorUnico</h4>`;
  let stopConfigurador = `<h4>stop Configurador</h4>`;
  AvailablesRaw = `<h4>${AvailablesRaw}</h4>`;
  Availables = `<h4>${Availables}</h4>`;
  VersionActiva = `<h4>${VersionActiva}</h4>`;
  UpdateVersionActiva = `<h4>${UpdateVersionActiva}</h4>`;
  let sleep = `<h4>sleep 2</h4>`;
  let startConcentradorUnico = `<h4>start ConcentradorUnico</h4>`;
  let startConfigurador = `<h4>start Configurador</h4>`;
  let espacio = `<br></br>`;
  return [
    carga,
    sudobash,
    stopConcentradorUnico,
    stopConfigurador,
    AvailablesRaw,
    Availables,
    VersionActiva,
    UpdateVersionActiva,
    sleep,
    startConcentradorUnico,
    startConfigurador,
    espacio,
  ];
}

//FUNCION PRINCPILA
function script(event) {
  //DECLARACION DE VARIABLES
  event.preventDefault(); // Evita que el formulario se envíe

  let container = document.querySelector(".consultas");
  let equipamiento = document.getElementById("equipamiento").value;

  let idEmpresa = parseInt(document.getElementById("idEmpresa").value);
  let modelo = document.getElementById("tipoTerminal").value;
  let idTerminal = parseInt(document.getElementById("idTerminal").value);
  let version = parseInt(document.getElementById("version").value);
  let ruta = document.getElementById("ruta").value;
  let tipoUpdate = 0;
  let tipoTerminal = 0;

  //VERIFICA EL EQUIPAMIENTO Y SEGUN SI ES TECLADO O VALIDADOR ASIGANE EL TIPOUPDATE

  tipoUpdate = numeroEquipamiento(equipamiento);

  //SELECCION DE TIPO DE DISPOSITIVO
  tipoTerminal = numeroModelo(modelo);

  //GUARDO CONSULTA PARA INSERTAR EN LA TABLA AVAILABLESRAW
  let AvailablesRaw = AvailablesRawSQL(ruta);

  //GUARDO CONSULTA PARA INSERTAR EN LA TABLA AVAILABLES
  let Availables = AvailablesSQL(
    idEmpresa,
    idTerminal,
    tipoUpdate,
    tipoTerminal,
    version,
    ruta
  );

  //GUARDO CONSULTA PARA INSERTAR EN VERSIONACTIVA
  let VersionActiva = VersionActivaSQL(
    idEmpresa,
    idTerminal,
    tipoUpdate,
    tipoTerminal,
    version
  );
  let UpdateVersionActiva = UpdateVersionActivaSQL(
    idEmpresa,
    idTerminal,
    tipoUpdate,
    tipoTerminal,
    version
  );

  //GENERO LAS CONSULTAS SQL COMO UN p
  let consultas = creadorConsultas(
    AvailablesRaw,
    Availables,
    VersionActiva,
    UpdateVersionActiva,
    idTerminal,
    idEmpresa,
    version,
    modelo
  );

  //DOM
  let final = document.getElementById("final");
  let divConsultas = document.createElement("DIV");

  divConsultas.classList.add("consultas__SQL", "copiable");

  let copiar = document.createElement("button");
  copiar.classList.add("boton__copiar");
  copiar.setAttribute("id", "botonCopiar");
  copiar.textContent = "Copiar Contenido"; // Agrega el texto al botón

  //FUNCION PARA COPIAR EL TEXTO.
  copiar.addEventListener("click", function () {
    const contenidoDiv = divConsultas.innerText;

    const textarea = document.createElement("textarea");
    textarea.value = contenidoDiv;

    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand("copy");

    document.body.removeChild(textarea);

    copiar.textContent = "Copiado!";
    setTimeout(function () {
      copiar.textContent = "Copiar Contenido";
    }, 1000);
  });

  //DOM INGRESA LOS p CON LAS CONSULTAS

  consultas.forEach((h4) => {
    divConsultas.innerHTML = divConsultas.innerHTML + h4;
  });

  container.appendChild(divConsultas);
  container.appendChild(copiar); // Agregar el botón al div

  // Desplazarse hacia el nuevo div

  window.location.href = "#" + final.id;

  //Flecha hacia arriba
  let flecha = document.getElementById("flecha");
  flecha.setAttribute("style", "display:inline");
}

function flecha() {
  let flecha = document.getElementById("flecha");
  flecha.setAttribute("style", "display:none");
}
