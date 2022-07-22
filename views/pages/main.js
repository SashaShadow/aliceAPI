const photoEndpoint = "/api/photos";

export const getPhotos = async () => {
    fetch(photoEndpoint)
    .then(response => response.json())
    .then(data => {
        return data
    })
}

await getPhotos()