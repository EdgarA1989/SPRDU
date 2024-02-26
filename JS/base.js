document.addEventListener("DOMContentLoaded", function () {
  const pantallaPrincipal = document.querySelector(".pantalla_principal");

  // Agregar la clase de estilo específico para la página "base.html"
  pantallaPrincipal.classList.add("principal_base");

  //VARIABLES
  const base = document.getElementById("id_base");
  const tipoUpdate = document.querySelector(".tipo_update");
  const idDispositivo = document.querySelector(".iddispositivo");
  const dispositivos = document.querySelectorAll(".dispositivo_iddispositivo");
  const updates = document.querySelectorAll(".dispositivo_tipoupdate");
  const spanMas = document.querySelector(".span_mas");
  const spanMenos = document.querySelector(".span_menos");
  const agregarInterno = document.querySelector(".agregar_interno");
  const quitarInterno = document.querySelector(".quitar_interno");
  const empresaContenedor = document.querySelector(
    ".empresa_consulta_contenedor"
  );
  const selectEmpresa = document.getElementById("id_empresa");
  const volver = document.querySelector(".volver");
  //VARIABLES + INTERNOS/VERSIONES
  const opcionesVersion = document.getElementById("opcionVersion");
  const version = document.getElementById("version");
  const idTerminal = document.getElementById("idTerminal");
  const opcionesInterno = document.getElementById("opcionInterno");
  let masInternos = document.querySelector(".mas_internos");
  let masVersion = document.querySelector(".mas_version");
  const condicion = document.querySelector(".condicion");
  const igual = document.querySelector(".igual");
  const distinto = document.querySelector(".distinto");

  //FUNCIONES
  // Si se selecciona "Todos", deselecciona las demás opciones
  const checkboxTipoDispositivo = (dispositivos, isChecked) => {
    if (isChecked) {
      dispositivos.forEach((dispositivo) => {
        if (dispositivo.value !== "Todos") {
          dispositivo.checked = false;
          dispositivo.disabled = true;
        }
      });
    } else {
      dispositivos.forEach((dispositivo) => {
        dispositivo.disabled = false;
      });
    }
  };

  const checkboxTipoUpdate = (updates, isChecked) => {
    if (isChecked) {
      updates.forEach((update) => {
        // Comprueba si el valor de la opción es diferente de "tipoUpdate"
        if (update.value !== "tipoUpdate") {
          update.checked = false;
          update.disabled = true;
        }
      });
    } else {
      updates.forEach((update) => {
        update.disabled = false;
      });
    }
  };

  const reinicarCheckbox = () => {
    dispositivos.forEach((dispositivo) => {
      dispositivo.disabled = false;
    });
    updates.forEach((update) => {
      update.disabled = false;
    });
  };

  //FUNCION REINICIAR INPUTS
  const reiniciarInputsFull = () => {
    const internosInputs = masInternos.querySelectorAll("input");
    const versionInputs = masVersion.querySelectorAll("input");
    internosInputs.forEach((input, index) => {
      if (index > 0) {
        masInternos.removeChild(input);
      }
    });

    versionInputs.forEach((input, index) => {
      if (index > 0) {
        masVersion.removeChild(input);
      }
    });
  };

  const reiniciarInputs = () => {
    const internosInputs = masInternos.querySelectorAll("input");
    const versionInputs = masVersion.querySelectorAll("input");

    if (opcionesInterno.value === "Todos") {
      internosInputs.forEach((input, index) => {
        if (index > 0) {
          masInternos.removeChild(input);
        }
      });
    }
    if (opcionesVersion.value === "Todos") {
      versionInputs.forEach((input, index) => {
        if (index > 0) {
          masVersion.removeChild(input);
        }
      });
    }
  };

  //Funcion para convertir a input el select de empresa modo prueba programa sin bd
  const convertirEnInput = () => {
    const inputEmpresa = document.createElement("input");
    inputEmpresa.type = "text";
    inputEmpresa.name = "idEmpresa";
    inputEmpresa.id = "id_empresa_input";
    inputEmpresa.placeholder = "Ingresa el ID";
    inputEmpresa.required = true;

    // Reemplazar el select con el input
    empresaContenedor.insertBefore(inputEmpresa, selectEmpresa);
    empresaContenedor.removeChild(selectEmpresa);
    inputCreado = true;
    volver.style.display = "inline";
  };

  //Funcion para convertir a slect el input de empresa modo prueba programa sin bd
  const convertirEnSelect = () => {
    const inputEmpresa = document.getElementById("id_empresa_input");
    if (inputEmpresa) {
      empresaContenedor.removeChild(inputEmpresa);
      inputCreado = false;
    }
    volver.style.display = "none";
    empresaContenedor.insertBefore(selectEmpresa, volver);

    //SELECCIONO EL OPTION EN CUAL COMENZAR
    selectEmpresa.selectedIndex = 0;
  };

  //EVENTOS

  //Agrega Input Versiones

  spanMas.addEventListener("click", function () {
    const masVersion = document.querySelector(".mas_version");
    const versionInputs = masVersion.querySelectorAll("input");
    if (versionInputs.length < 4) {
      const versionInput = document.createElement("input");
      versionInput.type = "text";
      versionInput.id = "version";
      versionInput.disabled = false;
      versionInput.required = true;
      masVersion.appendChild(versionInput);
    }
  });

  //Saca Input de versiones

  spanMenos.addEventListener("click", function () {
    const masVersion = document.querySelector(".mas_version");
    const versionInputs = masVersion.querySelectorAll("input");
    if (versionInputs.length > 1) {
      masVersion.removeChild(versionInputs[versionInputs.length - 1]);
    }
  });

  //Agrega input Internos

  agregarInterno.addEventListener("click", function () {
    const masInternos = document.querySelector(".mas_internos");
    const versionInputs = masInternos.querySelectorAll("input");
    if (versionInputs.length < 12) {
      const versionInput = document.createElement("input");
      versionInput.type = "text";
      versionInput.id = "idTerminal";
      versionInput.disabled = false;
      versionInput.required = true;
      masInternos.appendChild(versionInput);
    }
  });

  //Saca Input Internos

  quitarInterno.addEventListener("click", function () {
    const masInterno = document.querySelector(".mas_internos");
    const versionInputs = masInterno.querySelectorAll("input");
    if (versionInputs.length > 1) {
      masInterno.removeChild(versionInputs[versionInputs.length - 1]);
    }
  });

  igual.addEventListener("change", function () {
    distinto.checked = false;
  });

  distinto.addEventListener("change", function () {
    igual.checked = false;
  });

  idDispositivo.addEventListener("change", function () {
    const isChecked = this.checked;
    checkboxTipoDispositivo(dispositivos, isChecked);
  });
  //
  // Si se selecciona "Todos", deselecciona las demás opciones
  tipoUpdate.addEventListener("change", function () {
    const isChecked = this.checked;
    checkboxTipoUpdate(updates, isChecked);
  });

  //EVENTO PRINCIPAL SELECCION DE BASE DE DATOS
  base.addEventListener("change", function () {
    const spanBase = document.querySelector(".span_base");
    const busquedaVersionActiva = document.querySelector(
      ".consulta_busqueda_versionactiva"
    );
    const formulario = document.querySelector("#form");
    const internoUpdated = document.querySelector(".interno_updated");
    const versionUpdated = document.querySelector(".version_updated");
    const spanInternos = document.querySelector(".span_internos");

    //Reinicar Inputs
    reiniciarInputsFull();
    reinicarCheckbox();
    convertirEnSelect();

    busquedaVersionActiva.style.display = "none";
    versionUpdated.style.display = "none";
    internoUpdated.style.display = "none";
    masInternos.style.display = "none";
    masVersion.style.display = "none";
    spanInternos.style.display = "none";
    spanMas.style.display = "none";
    spanMenos.style.display = "none";
    quitarInterno.style.display = "none";
    agregarInterno.style.display = "none";
    condicion.style.display = "none";
    version.disabled = true;
    idTerminal.disabled = true;

    formulario.reset();
    switch (base.value) {
      case "VersionActiva":
        spanBase.innerHTML =
          "Verifica las versiones de EOD,LIN,HOT y FW disponibles en el concentrador";
        busquedaVersionActiva.style.display = "grid";
        break;
      case "Updated":
        spanBase.innerHTML =
          "Verifica las ultimas descargas de EOD,LIN,HOT y FW disponibles en el concentrador";
        busquedaVersionActiva.style.display = "grid";
        versionUpdated.style.display = "block";
        internoUpdated.style.display = "block";
        masInternos.style.display = "block";
        masVersion.style.display = "block";
        spanInternos.style.display = "block";
        break;
      case "versionesRegistradas":
        spanBase.innerHTML =
          "Verifica las versiones que registro el ENE en su utlima conexión con el concentrador";

        busquedaVersionActiva.style.display = "grid";
        versionUpdated.style.display = "block";
        internoUpdated.style.display = "block";
        masInternos.style.display = "block";
        masVersion.style.display = "block";
        spanInternos.style.display = "block";
        break;
    }
    spanBase.style.display = "block";
  });

  //Eventos habilita inputs versiones
  opcionesVersion.addEventListener("change", function () {
    const versiones = document.querySelectorAll("#version");

    versiones.forEach(function (version) {
      if (opcionesVersion.value === "PorVersion") {
        version.disabled = false;
        spanMas.style.display = "inline";
        spanMenos.style.display = "inline";
        condicion.style.display = "block";
      } else {
        reiniciarInputs();
        version.disabled = true;
        spanMas.style.display = "none";
        spanMenos.style.display = "none";
        condicion.style.display = "none";
        version.value = "";
      }
    });
  });

  //Eventos habilita inputs internos
  opcionesInterno.addEventListener("change", function () {
    const internos = document.querySelectorAll("#idTerminal");

    internos.forEach(function (interno) {
      if (opcionesInterno.value === "PorInterno") {
        interno.disabled = false;
        quitarInterno.style.display = "inline";
        agregarInterno.style.display = "inline";
      } else {
        reiniciarInputs();
        interno.disabled = true;
        quitarInterno.style.display = "none";
        agregarInterno.style.display = "none";
        interno.value = "";
      }
    });
  });
  //EVENTO ESCUCHA SELECT EMPRESA
  selectEmpresa.addEventListener("change", function () {
    const valorSeleccionado = selectEmpresa.value;
    if (valorSeleccionado === "ingreso_manual") {
      convertirEnInput();
    }
  });

  volver.addEventListener("click", function () {
    convertirEnSelect();
  });
});
