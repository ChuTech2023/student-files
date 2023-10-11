//empty array of users
let usersData = [];

//step 4
const baseUrl = 'https://randomuser.me/api';
fetch(`${baseUrl}/?results=12`)
    .then((response) => response.json())
    .then((data) => {
        displayUsers(data.results);
        usersData = data.results;
    })

function displayUsers(users) {
    console.log(users);
    const gallery = document.querySelector('#gallery');

    //using forEach to pass data in each card
    users.forEach( (user, index) => {
        let userCard = `
       <div class="card" id="${index}">
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
    showModal();
}

//looping the card element
function showModal() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', (event) => {

            //this element returns the index id that was created on line 19
            let index = +event.target.closest('.card').id;

            //target user being clicked
            const user = usersData[index];
            const modalContent = `
            <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                        <p class="modal-text">${user.email}</p>
                        <p class="modal-text cap">${user.location.city}</p>
                        <hr>
                        <p class="modal-text">(555) 555-5555</p>
                        <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                        <p class="modal-text">Birthday: 10/21/2015</p>
                    </div>
                </div>

                // IMPORTANT: Below is only for exceeds tasks 
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
            `
            document.querySelector('body').insertAdjacentHTML('beforeend', modalContent);
            closeModal();
        })

    })
}

function closeModal() {
    const closeBtn = document.querySelector("#modal-close-btn");
    closeBtn.addEventListener('click', () => {
        closeBtn.parentElement.parentElement.remove();
    })
   
}

function formatPhoneNumber(phone) {
    let phoneNumbers = '';
    for (const char of phone) {
        if (!isNaN(char)) {
            phoneNumbers += char;
        } 
    }
//modify phone numbers

}