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

  //VARIABLES + INTERNOS/VERSIONES
  const opcionesVersion = document.getElementById("opcionVersion");
  const version = document.getElementById("version");
  const opcionesInterno = document.getElementById("opcionInterno");
  const idTerminal = document.getElementById("idTerminal");

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

  //EVENTOS

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

  base.addEventListener("change", function () {
    const spanBase = document.querySelector(".span_base");
    const busquedaVersionActiva = document.querySelector(
      ".consulta_busqueda_versionactiva"
    );
    const formulario = document.querySelector("#form");
    const internoUpdated = document.querySelector(".interno_updated");
    const versionUpdated = document.querySelector(".version_updated");
    const masInternos = document.querySelector(".mas_internos");
    const masVersion = document.querySelector(".mas_version");

    reinicarCheckbox();

    busquedaVersionActiva.style.display = "none";
    versionUpdated.style.display = "none";
    internoUpdated.style.display = "none";
    masInternos.style.display = "none";
    masVersion.style.display = "none";
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
        break;
      case "versionesRegistradas":
        spanBase.innerHTML =
          "Verifica las versiones que registro el ENE en su utlima conexión con el concentrador";

        busquedaVersionActiva.style.display = "grid";
        versionUpdated.style.display = "block";
        internoUpdated.style.display = "block";
        masInternos.style.display = "block";
        masVersion.style.display = "block";
        break;
    }
    spanBase.style.display = "block";
  });

  opcionesVersion.addEventListener("change", function () {
    if (opcionesVersion.value === "PorVersion") {
      version.disabled = false;
    } else {
      version.disabled = true;
      version.value = "";
    }
  });

  opcionesInterno.addEventListener("change", function () {
    if (opcionesInterno.value === "PorInterno") {
      idTerminal.disabled = false;
    } else {
      idTerminal.disabled = true;
      idTerminal.value = "";
    }
  });
});
