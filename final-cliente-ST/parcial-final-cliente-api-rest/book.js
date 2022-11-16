const onLoad = () => {
    const queryString = window.location.search.substring(1);

    fetch(`http://192.168.60.3:5000/books/${queryString}`, {mode: 'cors'})
        .then(res => res.json())
        .then(json => {
            json = json['book'];

            let h1TitleId = document.getElementById('titleId');
            let pDescription = document.getElementById('description');
            let h6Author = document.getElementById('author');

            h1TitleId.innerHTML = json['title'] + " #" + json['id']
            pDescription.innerHTML = json['description'];
            h6Author.innerHTML = "Autor: " + json['author'];

            console.log(json);
        })

}

onLoad();