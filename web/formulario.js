
let sendForm = () =>{
    let correo = document.getElementById("correo");
    let curp = document.getElementById("curp");
    let nombre = document.getElementById("nombre");
    let apellidoMat = document.getElementById("apellidoMat");
    let apellidoPat = document.getElementById("apellidoPat");
    //let edad = document.getElementById("edad");
    let sexo = document.getElementsByName("sexo");
    let pasatiempos = document.getElementById("pasatiempos");
    let dia = document.getElementById("dia");
    let mes = document.getElementById("mes");
    let ano = document.getElementById("año");
    let calle = document.getElementById("calle");
    let numero = document.getElementById("numero");
    let colonia = document.getElementById("colonia");
    let postal = document.getElementById("postal");
    let delegacion = document.getElementById("delegacion");
    let ciudad = document.getElementById("ciudad");


    console.log(dia);


    if(nombre.value === ""){
        alert("Te falto llenar tu nombre");
        return false;
    } else if (apellidoMat.value === ""){
        alert("Te falto llenar tu apellido materno");
        return false;
    } else if(apellidoPat.value === ""){
        alert("Te falto llenar tu apellido paterno");
        return false;
    } else if(curp.value === ""){
        alert("Te falto llenar tu curp");
        return false;
    } else if(correo.value === ""){
        alert("Te falto llenar tu correo");
        return false;
    } else if(pasatiempos.value === ""){
        alert("Te falto llenar tus pasatiempos");
        return false;
    }

    let aux = 0;
    for(let i =0;i<sexo.length;i++){
        if(!sexo[i].checked){
            aux++;
        } else{
            aux = i;
            break;
        }
    }

    if(aux === sexo.length){
        alert("Te falto especificar tu sexo");
        return false;
    }

    if(!curpValida(curp.value)){
        alert("Tu curp no es válida.");
        return false;
    }

    if(!validateEmail(correo.value)){
        alert("Tu correo no es válido.");
        return false;
    }

    let languages = listOfLanguages();
    if(languages.length === 0){
        alert("Selecciona al menos 1 lenguaje.");
        return false;
    }

    let materias = listOfMaterias();

    alert(`Nombre: ${nombre.value}\n
    Apellidos: ${apellidoPat.value} ${apellidoMat.value}\n
    Fecha de Nacimiento: ${dia.value} / ${mes.value} / ${ano.value}\n
    Correo: ${correo.value}\n
    CURP: ${curp.value}\n
    Sexo: ${sexo[aux].value}\n
    Dirección: ${calle.value} #${numero.value} Col: ${colonia.value} CP: ${postal.value} ${delegacion.value} ${ciudad.value}\n
    Lenguajes: ${languages}\n
    Materias Preferidas: ${materias}\n
    Pasatiempos: ${pasatiempos.value}\n`);
    return true;
}

let listOfMaterias = () =>{
    let materias = document.getElementsByClassName("checkbox");
    console.log(materias);
    let listaMaterias = [];
    for(let i=0;i<materias.length;i++){
        if(materias[i].checked){
            listaMaterias.push(materias[i].attributes[2].nodeValue);
        }
    }
    return listaMaterias;
}


let listOfLanguages = () =>{
    let language = document.getElementById("lenguajes");
    let languagesSelected = [];
    for(let i=0;i<language.length;i++){
        if(language[i].selected){
            languagesSelected.push(language[i].value)
        }
    }
    return languagesSelected;
}

function curpValida(curp) {
    var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
        validado = curp.match(re);
    if (!validado)  //Coincide con el formato general?
        return false;
    //Validar que coincida el dígito verificador
    function digitoVerificador(curp17) {
        //Fuente https://consultas.curp.gob.mx/CurpSP/
        var diccionario  = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
            lngSuma      = 0.0,
            lngDigito    = 0.0;
        for(var i=0; i<17; i++)
            lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
        lngDigito = 10 - lngSuma % 10;
        if (lngDigito == 10) return 0;
        return lngDigito;
    }
    if (validado[2] != digitoVerificador(validado[1]))
        return false;
    return true; //Validado
}

function validateEmail(mail)
{
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return (true)
    }
    return (false)
}