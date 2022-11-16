const onLoad = () => {
    fetch("http://192.168.60.3:5000/books", {mode: 'cors'})
        .then(res => {
            res.json()
                .then(json => {
                    console.log(json.books); // {title: 23232, author: "sdsds"}
                    let datos = json.books;
                    let contenedorGeneral = document.getElementById('contenedorGeneral');

                    for (let eachBook in datos) {
                        let filaAgregar = document.createElement('div');
                        filaAgregar.className = "row text-center";
                        let idLibro = datos[eachBook]['id'];

                        for (let keyData in datos[eachBook]) {
                            if (keyData == 'id') {
                                let valoresAgregar = document.createElement('input');
                                valoresAgregar.className = "col themed-grid-col text-center";
                                valoresAgregar.id = idLibro + "-" + keyData;
                                valoresAgregar.disabled = true;
                                valoresAgregar.value = datos[eachBook][keyData];
                                filaAgregar.appendChild(valoresAgregar);
                            } else {
                                let valoresAgregar = document.createElement('input');
                                valoresAgregar.className = "col themed-grid-col text-center";
                                valoresAgregar.id = idLibro + "-" + keyData;
                                valoresAgregar.value = datos[eachBook][keyData];
                                filaAgregar.appendChild(valoresAgregar);
                            }

                        }

                        let filaBoton = document.createElement('div');
                        filaBoton.className = "col themed-grid-col";
                        
                        // Botones
                        let btnAccionVer = document.createElement('button');
                        btnAccionVer.className = "btn btn-success me-1";
                        btnAccionVer.innerHTML = 'Ver';
                        btnAccionVer.addEventListener('click', () => {
                            verLibro(idLibro);
                        })

                        let btnAccionEditar = document.createElement('button');
                        btnAccionEditar.className = "btn btn-warning me-1";
                        btnAccionEditar.innerHTML = 'Editar';
                        btnAccionEditar.addEventListener('click', () => {
                            editarLibro(idLibro);
                        })
                        
                        let btnAccionEliminar = document.createElement('button');
                        btnAccionEliminar.className = "btn btn-danger";
                        btnAccionEliminar.innerHTML = 'Eliminar';
                        btnAccionEliminar.addEventListener('click', () => {
                            eliminarLibro(idLibro);
                        })
                        
                        filaBoton.appendChild(btnAccionVer);
                        filaBoton.appendChild(btnAccionEditar);
                        filaBoton.appendChild(btnAccionEliminar);

                        filaAgregar.appendChild(filaBoton);
                        contenedorGeneral.appendChild(filaAgregar);
                    }
                    
                })
        })

        .catch(err => {
            console.log(err);
        })
}

onLoad();

const verLibro = (id) => {
    location.href = `./book.html?${id}`;
}

const eliminarLibro = (id) => {
    console.log(id);

    fetch(`http://192.168.60.3:5000/books/${id}`, {
            mode: "cors",
            method: "DELETE"
        })

        .then(res => res.json())
        .then(json => {
                if (json['result'] == true) {
                    alert('El libro fue eliminado con éxito');
                    location.reload();
                }
            })
        .catch(err => {
            alert('Ocurrió un error al intentar eliminar el libro');
            console.log(err);
        })
}

const editarLibro = (id) => {
    let nuevoTitulo = document.getElementById(id + "-title").value;
    let nuevoAutor = document.getElementById(id + "-author").value;
    let nuevaDescripcion = document.getElementById(id + "-description").value;

    fetch(`http://192.168.60.3:5000/books/${id}`, {
        mode: "cors",
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: nuevoTitulo,
            author: nuevoAutor,
            description: nuevaDescripcion
        })
    })

        .then(res => res.json())
        .then(json => {
            alert('El libro fue editado con éxito');
            console.log(json);
            location.reload();
        })
        .catch(err => {
            alert('Ocurrió un error al intentar editar el libro');
            console.log(err);
        })
    
}

const agregarLibro = () => {
    let title = prompt('Ingrese el título');
    let description = prompt('Ingrese la descripción');
    let author = prompt('Ingrese el autor');

    fetch(`http://192.168.60.3:5000/books`, {
            mode: "cors",
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                author,
                description
            })
        })
            .then(res => res.json())
            .then(json => {
                alert('El libro ha sido creado con éxito');
                location.reload();
            })
}