const photoEndpoint = "/api/photos";
const element = document.querySelector("#element");
const deleteForm = document.querySelector(".deleteForm");

deleteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const theId = document.querySelector("#phid").value;
    deletePhoto(theId);
})

const getPhotos = async () => {
    const photos = await fetch(photoEndpoint);
    const photoData = await photos.json();
    return photoData;
}

const container = document.querySelector('.photoContainer')

const placePhotos = async () => {
    const photoData = await getPhotos();

    console.log(photoData);

    const html = photoData.fotos.map(elem => {
        return (
        `
        <tr>
        <th scope="row">${elem.name}</th>
        <th scope="row">${elem.desc}</th>
        <th scope="row"><img src="${elem.url}"/></th>
        <th scope="row">${elem.category}</th>
        <th scope="row">${elem._id}</th>
        </tr>`
        )
    }).join(" ")
    element.innerHTML += html;
}

const deletePhoto = (id) => {
    return fetch(`http://localhost:8080/api/photos/${id}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
}).then(_ => window.location.replace('/api/viewordelete'))
}

placePhotos();