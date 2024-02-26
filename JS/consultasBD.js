document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");

  // Agregar evento de envío al formulario
  form.addEventListener("submit", function (event) {
    formulario(event);
  });
});
//FUNCION PRINCIPAL IdTerminal
function formulario(event) {
  event.preventDefault();

  // Resto del código de tu función formulario...

  // Obtener el contenedor donde se agregarán las consultas SQL
  const consultaContainer = document.querySelector(
    ".consulta_busqueda_versionactiva"
  );

  // Crear un nuevo contenedor para la consulta
  const newConsultaContainer = document.createElement("div");
  newConsultaContainer.classList.add("consulta_sql");

  // Llamar a la función consultaSQL para agregar la consulta al nuevo contenedor

  // Agregar el nuevo contenedor al documento HTML
  consultaContainer.appendChild(newConsultaContainer);
  //Variables para formar consulta final
  let idEmpresa = "";
  let version = "";
  let idTerminal = "";
  let tipoDispositivo = "";
  let tipoUpdate = "";
  let tabla = "";
  let consultaFinal = "";
  let fecha = "";
  let condicion = true;

  //VARIABLES DEL FORMULARIO
  const tablaElegida = document.getElementById("id_base");
  const empresaSelect = document.getElementById("id_empresa");
  const empresaInput = document.getElementById("id_empresa_input");
  const terminal = document.querySelector(".mas_internos");
  const internosInputs = terminal.querySelectorAll("input");
  const ver = document.querySelector(".mas_version");
  const versionInputs = ver.querySelectorAll("input");
  const dispositivoInputs = document.querySelectorAll(
    ".dispositivo_iddispositivo"
  );
  const updateInputs = document.querySelectorAll(".dispositivo_tipoupdate");
  const distinto = document.querySelector(".distinto");

  //Devuelve el valor para idEmpresa;
  const empresaId = (empresaInput, empresaSelect) => {
    if (empresaSelect) {
      if (empresaSelect.value === "empresa_todos") {
        return "Todos";
      }
    } else {
      if (
        empresaInput &&
        empresaInput.value !== undefined &&
        empresaInput.value.trim() !== ""
      ) {
        return empresaInput.value.toString();
      }
      if (
        empresaSelect &&
        empresaSelect.value !== undefined &&
        empresaSelect.value.trim() !== ""
      ) {
        return empresaSelect.value.toString();
      }
      return "ID no disponible";
    }
  };

  //Funcion que toma los numeros de interno/internos de los input.
  const terminalId = (internosInputs) => {
    const opcionInterno = document.getElementById("opcionInterno");
    let arrayInternos = [];
    const coma = ",";
    let stringInternos = "";

    if (opcionInterno.value !== "Todos") {
      if (internosInputs.length === 0) {
        return arrayInternos.value.toString();
      }

      internosInputs.forEach((interno) => {
        if (interno.value !== "") {
          arrayInternos.push(interno.value);
        }
      });

      arrayInternos.forEach((interno, index) => {
        if (index !== arrayInternos.length - 1) {
          stringInternos += interno + coma;
        } else {
          stringInternos += interno;
        }
      });

      return stringInternos.toString();
    } else {
      return opcionInterno.value;
    }
  };
  //Funcion que toma los numeros de version/versiones de los input.
  const versionId = (versionInputs) => {
    const opcionVersion = document.getElementById("opcionVersion");
    let arrayVersion = [];
    const coma = ",";
    let stringVersion = "";

    if (opcionVersion.value !== "Todos") {
      if (versionInputs.length === 0) {
        return arrayVersion.value;
      }

      versionInputs.forEach((version) => {
        if (version.value !== "") {
          arrayVersion.push(version.value);
        }
      });

      arrayVersion.forEach((version, index) => {
        if (index !== arrayVersion.length - 1) {
          stringVersion += version + coma;
        } else {
          stringVersion += version;
        }
      });

      return stringVersion;
    } else {
      return opcionVersion.value;
    }
  };

  //Funcion que Devuelve tipo/tipos Dispositivo
  const dispositivoId = (dispositivoInputs) => {
    const arrayDispositivos = [];
    const coma = ",";
    let stringDispositivos = "";

    dispositivoInputs.forEach((dispositivo) => {
      if (dispositivo.checked) {
        switch (dispositivo.value) {
          case "Laser 3075":
            arrayDispositivos.push("54");
            break;
          case "Laser 3090":
            arrayDispositivos.push("68");
            break;
          case "Tallion":
            arrayDispositivos.push("9");
            break;
          case "Sonda":
            arrayDispositivos.push("52");
            break;
          case "Laser 3080":
            arrayDispositivos.push("1");
            break;
          case "Todos":
            arrayDispositivos.push("Todos");
            break;
        }
      }
    });
    if (arrayDispositivos.length === 0) {
      arrayDispositivos.push("Todos");
    }

    arrayDispositivos.forEach((dispositivo, index) => {
      if (index !== arrayDispositivos.length - 1) {
        stringDispositivos += dispositivo + coma;
      } else {
        stringDispositivos += dispositivo;
      }
    });

    return stringDispositivos.toString();
  };

  //Funcion que Devuelve tipo/tipos Update
  const updateId = (updateInputs) => {
    const arrayUpdates = [];
    const coma = ",";
    let stringUpdates = "";

    updateInputs.forEach((update) => {
      if (update.checked) {
        switch (update.value) {
          case "FW":
            arrayUpdates.push("20");
            break;
          case "HOT":
            arrayUpdates.push("132");
            break;
          case "EOD":
            arrayUpdates.push("135");
            break;
          case "LIN":
            arrayUpdates.push("136");
            break;
          case "tipoUpdate":
            arrayUpdates.push("Todos");
            break;
        }
      }
    });

    if (arrayUpdates.length === 0) {
      arrayUpdates.push("Todos");
    }

    arrayUpdates.forEach((update, index) => {
      if (index !== arrayUpdates.length - 1) {
        stringUpdates += update + coma;
      } else {
        stringUpdates += update;
      }
    });

    return stringUpdates.toString();
  };

  //Funcion para crear la consulta final
  const creadorConsulta = (datosConsulta, tabla, fecha) => {
    //VARIABLES CONSULTAS MANAGER
    const BDfisica = `| sqlite3 /opt/ConcentradorUnico/BD_UpdaterV11.db`;
    const In = ` IN `;
    const notIn = ` NOT IN `;
    const selectTotal = `SELECT * from `;
    const echo = `echo "`;
    const concatenador = ` AND `;
    const finalConsulta = `;"`;
    const where = ` WHERE `;
    const limit = ` limit 40`;
    let fechaOrden = ` order by ${fecha} desc`;
    let stringConsulta = echo + selectTotal + tabla;
    let condicionWhere = "";

    if (distinto.checked) {
      condicion = true;
    } else {
      condicion = false;
    }

    console.log(condicion);
    for (const key in datosConsulta) {
      if (datosConsulta.hasOwnProperty(key)) {
        const value = datosConsulta[key];
        if (value !== "Todos") {
          if (condicionWhere !== "") {
            condicionWhere += concatenador; // Si ya hay condiciones, añadir un AND
          }
          condicionWhere += key + In + "(" + value + ")"; // Añadir la condición
        }
      }
    }

    // Si hay condiciones, agregar la cláusula WHERE a la consulta
    if (condicionWhere !== "") {
      stringConsulta += where + condicionWhere;
    }

    if (tabla !== "VersionActiva") {
      stringConsulta += fechaOrden + limit + finalConsulta + BDfisica;
    } else {
      stringConsulta += limit + finalConsulta + BDfisica;
    }

    //Con este condicional modifico el IN por NOT IN si esta seleecionado distinto
    if (condicion) {
      stringConsulta = stringConsulta.replace(/(version\s+)(IN)/, "$1NOT IN");
    }

    return stringConsulta;
  };

  //FUNCION para crear cuadro de texto con la consulta
  const consultaSQL = (container, consultaFinal) => {
    // Crear un nuevo div y span para cada consulta
    const divConsulta = document.createElement("div");
    const spanCopiar = document.createElement("span");
    const spanBorrar = document.createElement("span");
    divConsulta.classList.add("cuadro_consulta");
    divConsulta.innerHTML = consultaFinal;
    container.classList.add("formulario_general");
    spanCopiar.innerHTML = `📋`;
    spanCopiar.classList.add("span_copiar");
    spanBorrar.innerHTML = `💥`;
    spanBorrar.classList.add("span_borrar", "span_copiar");

    container.appendChild(divConsulta);
    container.appendChild(spanCopiar);
    container.appendChild(spanBorrar);

    spanCopiar.addEventListener("click", function () {
      const contenidoDiv = divConsulta.textContent;
      const textarea = document.createElement("textarea");
      textarea.value = contenidoDiv;

      document.body.appendChild(textarea);

      textarea.select();
      document.execCommand("copy");

      document.body.removeChild(textarea);

      spanCopiar.textContent = `👌`;
      setTimeout(function () {
        spanCopiar.textContent = "📋";
      }, 1000);
    });

    spanBorrar.addEventListener("click", function () {
      container.parentNode.removeChild(container);
    });
  };

  idEmpresa = empresaId(empresaInput, empresaSelect);
  idTerminal = terminalId(internosInputs);
  version = versionId(versionInputs);
  tipoDispositivo = dispositivoId(dispositivoInputs);
  tipoUpdate = updateId(updateInputs);

  let datosConsulta = {
    idEmpresa: idEmpresa,
    idTerminal: idTerminal,
    version: version,
    tipoDispositivo: tipoDispositivo,
    tipoUpdate: tipoUpdate,
  };

  switch (tablaElegida.value) {
    case "VersionActiva":
      tabla = tablaElegida.value;
      fecha = "";
      datosConsulta = {
        empresa: idEmpresa,
        idTerminal: idTerminal,
        version: version,
        tipoDispositivo: tipoDispositivo,
        tipoUpdate: tipoUpdate,
      };
      break;
    case "Updated":
      tabla = tablaElegida.value;
      fecha = "fecha";
      break;
    case "versionesRegistradas":
      tabla = tablaElegida.value;
      fecha = "ultimaComunicacion";
      break;
  }

  consultaFinal = creadorConsulta(datosConsulta, tabla, fecha, condicion);

  consultaSQL(newConsultaContainer, consultaFinal);

  window.location.href = "#" + final.id;
}
