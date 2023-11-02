const URL = (paramUrl) => `https://6542beb501b5e279de1f8312.mockapi.io/${paramUrl}`

//Results
const results = document.getElementById('results');
//GET
const btnBuscar = document.getElementById('btnGet1');
const idABuscar = document.getElementById('inputGet1Id');
//POST
const btnPost = document.getElementById('btnPost');
//PUT
const inputModificar = document.getElementById("inputPutId");
const btnModificar = document.getElementById("btnPut");
const btnSendChanges = document.getElementById('btnSendChanges');
//DELETE
const btnDelete = document.getElementById("btnDelete");
const inputDelete = document.getElementById("inputDelete");

const postName = document.getElementById('inputPostNombre');
const postLastName = document.getElementById('inputPostApellido');
const putName = document.getElementById('inputPutNombre');
const putLastName = document.getElementById('inputPutApellido');

//Alternar la propiedad disabled
document.addEventListener('DOMContentLoaded', () => {

    postName.addEventListener('input', () => {
        if (postName.value.trim() !== '' && postLastName.value.trim() !== '') {
            btnPost.removeAttribute('disabled');
        } else {
            btnPost.setAttribute('disabled', 'true');
        }
    });
    
    postLastName.addEventListener('input', () => {
        if (postName.value.trim() !== '' && postLastName.value.trim() !== '') {
            btnPost.removeAttribute('disabled');
        } else {
            btnPost.setAttribute('disabled', 'true');
        }
    });

    inputModificar.addEventListener('input', () => {
        if(inputModificar.value.trim() !== ''){
            btnModificar.removeAttribute('disabled');
        } else {
            btnModificar.setAttribute('disabled', 'true');
        }
    });

    inputDelete.addEventListener('input', () => {
        if(inputDelete.value.trim() !== ''){

            btnDelete.removeAttribute('disabled');
        } else {
            btnDelete.setAttribute('disabled', 'true');
        }
    })

    

    putName.addEventListener('input', () => {
        if (putName.value.trim() !== '' && putLastName.value.trim() !== '') {
            btnSendChanges.removeAttribute('disabled');
            btnSendChanges.setAttribute('data-bs-dismiss', 'modal');
            
        } else {
            btnSendChanges.setAttribute('disabled', 'true');
            btnSendChanges.removeAttribute('data-bs-dismiss');
        }
    });
    
    putLastName.addEventListener('input', () => {
        if (putName.value.trim() !== '' && putLastName.value.trim() !== '') {
            btnSendChanges.removeAttribute('disabled');
            btnSendChanges.setAttribute('data-bs-dismiss', 'modal');
            
        } else {
            btnSendChanges.setAttribute('disabled', 'true');
            btnSendChanges.removeAttribute('data-bs-dismiss');
            

        }
    });
})
  
//FETCH GET *COMPLETADO----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function showUser(paramUrl){
    try {
        const response = await fetch(URL(paramUrl));
        if(!response.ok) {
            throw error();
        }
        const data = await response.json();
        showData(data);
    } catch (error) {
        console.log(error);
    }
};

//GET
btnBuscar.addEventListener('click', () => {
    results.innerHTML = '';
    if(idABuscar.value.trim() == ""){
        showUser('users');
    } else {
        showUser(`users/${idABuscar.value}`);
    }
    idABuscar.value = ''; 
});


//FETCH POST *COMPLETADO--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function postUser(){
    const name = postName.value.trim();
    const lastName = postLastName.value.trim();

    const newUser = {
        name: name,
        lastname: lastName
    };
    
    const optionsPost = {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-Type": "application/json"
        } 
    }

    try {
        const response = await fetch(URL('users'), optionsPost);
        if(!response.ok) {
            throw new Error(`Ha ocurrido un error: ${response.status}`);
        } else{
            showUser('users');
        }
         
    } catch (error) {
        console.log(error);
    }
};


btnPost.addEventListener('click', () => {
    results.innerHTML = '';
    postUser();
    postName.value = '';
    postLastName.value = '';
})

//FETCH PUT------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function putUser(param) {

    const name = document.getElementById('inputPutNombre').value; 
    const lastname = document.getElementById('inputPutApellido').value;

    const updatedUser = {
        name: name,
        lastname: lastname
    };

    const optionsPut = {
        method: "PUT",
        body: JSON.stringify(updatedUser),
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(URL(`${param}`), optionsPut);
        if(!response.ok) {
            error();
        }
        showUser('users');
    } catch (error) {
        console.log(error);
    }
}
btnSendChanges.addEventListener('click', () => {
    results.innerHTML = '';
    putUser(`users/${inputModificar.value}`);
    inputModificar.value = '';
});

//FETCH DELETE--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  async function deleteUser(param){
    
    const optionsDelete = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      };

    try {
        const response = await fetch(URL(`${param}`), optionsDelete);
        if(!response.ok) {
            error();
        }

        showUser('users');
    } catch (error) {
        console.log(error);
    }
};

//DELETE
btnDelete.addEventListener('click', () => {
    results.innerHTML = '';
    if(inputDelete.value.trim() == ""){
        error();
    } else {
        deleteUser(`users/${inputDelete.value}`);
    }
    inputDelete.value = '';
})

function showData(datosEpicos) {
    if(Array.isArray(datosEpicos)){
        datosEpicos.forEach(element => {
            results.innerHTML += `
                <ul class="card bg-dark py-2 pl-3">
                    <li>ID: ${element.id}</li>
                    <li>NAME: ${element.name}</li>
                    <li>LASTNAME: ${element.lastname}</li>
                </ul>
                `
        });

    }else {
        results.innerHTML += `
        <ul class="card bg-dark py-2 pl-3">
            <li>ID: ${datosEpicos.id}</li>
            <li>NAME: ${datosEpicos.name}</li>
            <li>LASTNAME: ${datosEpicos.lastname}</li>
        </ul>
        `
    }
}


function error() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        width: 600,
        background: '#F8D7DA',
        color: '#9B1D20',
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'Algo salió mal...'
      })
      return console.log('Error');
}


