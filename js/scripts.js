
const baseUrl = 'https://randomuser.me/api';
fetch(`${baseUrl}/?results=12`)
.then( (response) => response.json())
.then( (data) => {
displayUsers(data.results);

} )

function displayUsers (users) {
    console.log(users);
    const gallery = document.querySelector('#gallery');
    users.forEach(user => {
       let userCard = `
       <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="${user.picture.large}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                        <p class="card-text">${user.email}</p>
                        <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                    </div>
                </div>` 
                gallery.insertAdjacentHTML('beforeend', userCard)
    });

}
