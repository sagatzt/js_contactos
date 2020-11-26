let contactos = [
    { name: "juan", surname: "sanz", age: 26, phone: "299992229", email: "loquesea1@loquesea.com", gender: "m", address: "Av.La Quesea,38 B", city: "Madrid" },
    { name: "pepe", surname: "sanz", age: 34, phone: "299992229", email: "loquesea2@loquesea.com", gender: "m", address: "Av.La Quesea,38 B", city: "Madrid" },
    { name: "alberto", surname: "Rodriguez", age: 40, phone: "61397737", email: "loquesea3@loquesea.com", gender: "m", address: "C/La nave", city: "Barcelona" },
    { name: "lucia", surname: "sanz", age: 55, phone: "299992229", email: "loquesea4@loquesea.com", gender: "f", address: "Av.La Quesea,38 B", city: "Madrid" },
    { name: "fermin", surname: "sanz", age: 89, phone: "299992229", email: "loquesea5@loquesea.com", gender: "m", address: "Av.La Quesea,38 B", city: "Madrid" },
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
let form = document.querySelector("#frmcontacto")

//configuración del boton NUEVO:
let modal = document.querySelector(".modal")
document.querySelector("#btnnuevo").onclick=()=>{
    document.querySelector("#frmcontacto").reset()
    document.querySelector("main").classList.add("modal-blur")
    modal.classList.remove("modal-hidden")

}

//configuración del boton CANCELAR
document.querySelector(".btn-danger[name='cancelar']").onclick=()=>{
    modal.classList.add("modal-hidden")
    document.querySelector("main").classList.remove("modal-blur")
}

//configuración del botón GUARDAR
document.querySelector(".btn-primary[name='guardar']").onclick=()=>{
    modal.classList.add("modal-hidden")
    document.querySelector("main").classList.remove("modal-blur")
    saveContact()
}


showContacts()

function showContacts(){
    cleanContacts()
    sortContacts()
    for(let i=0;i<contactos.length;i++){
        let duplicado=tarjeta.cloneNode(true)
        duplicado.id="tarjeta-" + i
        duplicado.style.display="block"
        duplicado.querySelector(".data[name='name']").textContent=contactos[i].name
        duplicado.querySelector(".data[name='surname']").textContent=contactos[i].surname
        duplicado.querySelector(".data[name='age']").textContent=contactos[i].age
        duplicado.querySelector(".data[name='phone']").textContent=contactos[i].phone
        duplicado.querySelector(".data[name='email']").textContent=contactos[i].email
        duplicado.querySelector(".data[name='address']").textContent=contactos[i].address
        duplicado.querySelector(".data[name='city']").textContent=contactos[i].city   
        if(contactos[i].gender=="f")
            duplicado.querySelector("[name='gender']").src="../images/f.png"
        //Aquí, programamos los enlaces de la tarjeta duplicado
        let links=duplicado.querySelectorAll(".menu-card a")
        links[0].onclick=()=>detailsContact(contactos[i]) //esto es editar
        links[1].onclick=()=>shareContact() //esto es compartir
        links[2].onclick=()=>deleteContact(contactos[i]) //esto es eliminar
        listado.appendChild(duplicado)
    }

    function sortContacts(){
        contactos.sort((a,b)=>{
            if(a.name.toLowerCase()>b.name.toLowerCase()) return 1
            if(a.name.toLowerCase()<b.name.toLowerCase()) return -1
            if(a.name.toLowerCase()==b.name.toLowerCase()) return 0
        })
    }

    function cleanContacts(){
        while (listado.firstChild){
            listado.firstChild.remove()
        }
    }
}

function detailsContact(contacto){
    form.querySelector("input[name='txtname']").value=contacto.name
    form.querySelector("input[name='txtsurname']").value=contacto.surname
    form.querySelector("input[name='txtage']").value=contacto.age
    form.querySelector("input[name='txtphone']").value=contacto.phone
    form.querySelector("input[name='txtemail']").value=contacto.email
    form.querySelector("input[name='txtaddress']").value=contacto.address
    form.querySelector("input[name='txtcity']").value=contacto.city
    form.querySelector("select[name='txtgender']").value=contacto.gender
    modal.classList.remove("modal-hidden")
}

function saveContact(){
    let contacto={}
    contacto.name=form.querySelector("input[name='txtname']").value
    contacto.surname=form.querySelector("input[name='txtsurname']").value
    contacto.age=form.querySelector("input[name='txtage']").value
    contacto.phone=form.querySelector("input[name='txtphone']").value
    contacto.email=form.querySelector("input[name='txtemail']").value
    contacto.address=form.querySelector("input[name='txtaddress']").value
    contacto.city=form.querySelector("input[name='txtcity']").value
    contacto.gender=form.querySelector("select[name='txtgender']").value
    
    let contactoViejo=contactos.find(c=>c.email==contacto.email)
    if(contactos.find(c=>c.email==contacto.email)==undefined)
        contactos.push(contacto)
    else
        contactos.splice(contactos.indexOf(contactoViejo),1,contacto)
    
    showContacts()
}

function shareContact(){
    console.log("compatir")
}
function deleteContact(contacto){
    if(confirm("¿Deseas eliminar a " + contacto.name +"?")) {
        contactos.splice(contactos.indexOf(contacto),1)
        showContacts()
    }

}


//usar correctamente el método sort()
//https://www.todojs.com/usar-correctamente-el-metodo-sort/

//generador online de formularios bootstrap:
//https://bootsnipp.com/forms