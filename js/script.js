let contactos = [
    { name: "juan", surname: "sanz", age: 24, phone: "299992229", email: "loquesea1@loquesea.com", gender: "m", address: "Av.La Quesea,38 B", city: "Madrid" },
    { name: "pepe", surname: "sanz", age: 24, phone: "299992229", email: "loquesea2@loquesea.com", gender: "m", address: "Av.La Quesea,38 B", city: "Madrid" },
    { name: "alberto", surname: "sanz", age: 24, phone: "299992229", email: "loquesea3@loquesea.com", gender: "m", address: "Av.La Quesea,38 B", city: "Madrid" },
    { name: "lucia", surname: "sanz", age: 24, phone: "299992229", email: "loquesea4@loquesea.com", gender: "f", address: "Av.La Quesea,38 B", city: "Madrid" },
    { name: "fermin", surname: "sanz", age: 24, phone: "299992229", email: "loquesea5@loquesea.com", gender: "m", address: "Av.La Quesea,38 B", city: "Madrid" },
    { name: "juan", surname: "sanz", age: 24, phone: "299992229", email: "loquesea6@loquesea.com", gender: "m", address: "Av.La Quesea,38 B", city: "Madrid" },
    { name: "juan antonio", surname: "sanz", age: 24, phone: "299992229", email: "loquesea7@loquesea.com", gender: "m", address: "Av.La Quesea,38 B", city: "Madrid" },
    { name: "pedro", surname: "sanz", age: 24, phone: "299992229", email: "loquesea8@loquesea.com", gender: "m", address: "Av.La Quesea,38 B", city: "Madrid" },
    { name: "ana", surname: "sanz", age: 24, phone: "299992229", email: "loquesea9@loquesea.com", gender: "f", address: "Av.La Quesea,38 B", city: "Madrid" },
    { name: "antonia", surname: "sanz", age: 24, phone: "299992229", email: "loquesea10@loquesea.com", gender: "f", address: "Av.La Quesea,38 B", city: "Madrid" },
    { name: "felisa", surname: "sanz", age: 24, phone: "299992229", email: "loquesea11@loquesea.com", gender: "f", address: "Av.La Quesea,38 B", city: "Madrid" },
    { name: "hugo", surname: "sanz", age: 24, phone: "299992229", email: "loquesea12@loquesea.com", gender: "m", address: "Av.La Quesea,38 B", city: "Madrid" },
    { name: "andres", surname: "sanz", age: 24, phone: "299992229", email: "loquesea13@loquesea.com", gender: "m", address: "Av.La Quesea,38 B", city: "Madrid" },
    { name: "joaquín", surname: "sanz", age: 24, phone: "299992229", email: "loquesea14@loquesea.com", gender: "m", address: "Av.La Quesea,38 B", city: "Madrid" },
    { name: "juan", surname: "sanz", age: 24, phone: "299992229", email: "loquesea15@loquesea.com", gender: "m", address: "Av.La Quesea,38 B", city: "Madrid" }
]

//al arrancar:
let tarjeta = document.querySelector("#tarjeta")
let listado = document.getElementById("contact-list")
showContacts(contactos)

//preparar ventana modal:
let modal = document.querySelector(".modal")
modal.onclick = (e) => {
    let container = modal.querySelector(".modal-container")
    if (e.target !== modal && e.target !== container) return;
    modal.classList.add("modal-hidden");
    document.querySelector("main").classList.remove("modal-blur")
}
//programar click botón NUEVO:
document.querySelector("#btnnuevo").onclick=()=>detailContact()

//programar click botón GUARDAR:
document.querySelector("button[name='guardar']").onclick=()=>saveContact()


////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

//FUNCION PARA MOSTRAR CONTACTOS
function showContacts(cArr) {
    //primero ordenamos el array contactos
    sortContacts()
    //segundo limipiamos el listado:
    cleanContacts()
    //ahora lo recorremos para crear una tarjeta por contacto y mostrarla:
    for (let i = 0; i < cArr.length; i++) {
        let duplicado = tarjeta.cloneNode(true)
        duplicado.id = "tarjeta-" + i
        //rellenamos con datos la tarjeta:
        /*duplicado.querySelector("[name='name']").textContent=cArr[i].name
        duplicado.querySelector("[name='surname']").textContent=cArr[i].surname
        duplicado.querySelector("[name='age']").textContent=cArr[i].age
        duplicado.querySelector("[name='phone']").textContent=cArr[i].phone
        duplicado.querySelector("[name='email']").textContent=cArr[i].email
        duplicado.querySelector("[name='address']").textContent=cArr[i].address
        duplicado.querySelector("[name='city']").textContent=cArr[i].city
        duplicado.querySelector("[name='gender']").textContent=cArr[i].gender*/
        Object.keys(contactos[i]).forEach(key =>
            duplicado.querySelector("[name='" + key + "']").textContent = cArr[i][key]
        )
        duplicado.querySelector("[name='gender']").src = "../images/" + cArr[i].gender + ".png"
        //hacer visible y agregamos la nueva tarjeta al listado:
        duplicado.style.display = "block"
        listado.appendChild(duplicado)
        //configuramos las opciones del menú:
        duplicado.querySelectorAll(".menu-card a").forEach(link => {
            if (link.textContent == "Editar") link.onclick = () => detailContact(cArr[i].email)
            if (link.textContent == "Compartir") link.onclick = () => editContact(cArr[i].email)
            if (link.textContent == "Eliminar") link.onclick = () => removeContact(cArr[i].email)
        })
    }
    ////////////////////////////////////////////////////////////////////////////
    //////////// FUNCIONES INTERNAS ////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    //función interna para ordenar el array:
    function sortContacts() {
        cArr.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
    }
    //función interna para limpiar la lista de contactos antes de mostrarlos
    function cleanContacts() {
        while (listado.firstChild) {
            listado.removeChild(listado.firstChild);
        }
    }  
}


//FUNCIÓN PARA VER EL DETALLE DE UN CONTACTO
function detailContact(email="") {
    document.querySelector("#frmcontacto").reset()
    if(email!=""){
        //cargar los datos de "contacto" en el formulario:
        let contacto = contactos.find(c=>c.email==email)
        /*let form=document.querySelectorAll("[name^='txt']")
        form.forEach(ele=>{
            ele.getAttribute("name")=="txtname"?ele.value=contacto.name:""
        })*/
        Object.keys(contacto).forEach(key => {
            document.querySelector("[name='txt" + key + "']").value = eval("contacto." + key)
        })
    }
    //abrir ventana modal:
    modal.classList.remove("modal-hidden")
    document.querySelector("main").classList.add("modal-blur")  
}  

//GUARDAR CONTACTO 
function saveContact(){
    let form = document.querySelector("#frmcontacto")
    /*Object.keys(contacto).forEach(key=>{
        document.querySelector("[name='txt" + key + "']").value=eval("contacto." + key)            
    })*/
    let contacto={}
    contacto.name=form.querySelector("[name='txtname']").value
    contacto.surname=form.querySelector("[name='txtsurname']").value
    contacto.age=form.querySelector("[name='txtage']").value
    contacto.phone=form.querySelector("[name='txtphone']").value
    contacto.email=form.querySelector("[name='txtemail']").value
    contacto.address=form.querySelector("[name='txtaddress']").value
    contacto.city=form.querySelector("[name='txtcity']").value
    contacto.gender=form.querySelector("[name='txtgender']").value
    let contactoOld=contactos.find(c=>c.email==contacto.email)
    if(contactos.find(c=>c.email==contacto.email)==undefined)
        contactos.push(contacto)
    else
        contactos.splice(contactos.indexOf(contactoOld),1,contacto)
    showContacts(contactos)
}

//FUNCIÓN PARA ELIMINAR UN CONTACTO
function removeContact(email) {
    let contacto = contactos.find(c=>c.email==email)
    if (confirm("¿Desea eliminar a " + contacto.name + "?"))
        contactos.splice(contactos.indexOf(contacto), 1)
    showContacts(contactos)
}

//CARGA LAS LETRAS DE LA AGENDA
loadAbc()
function loadAbc() {
    let abc = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
    let aside = document.querySelector("aside>ul")
    for (let i = 0; i < abc.length; i++) {
        let letra = document.createElement("li")
        letra.textContent = abc[i]
        aside.appendChild(letra)
        letra.onclick = (e) => {
            cArr=contactos.filter(c =>
                c.name[0].toUpperCase() == e.target.textContent
            )
            showContacts(cArr)
        }
    }
}



//usar correctamente el método sort()
//https://www.todojs.com/usar-correctamente-el-metodo-sort/

//generador online de formularios bootstrap:
//https://bootsnipp.com/forms