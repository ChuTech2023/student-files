//empty array of users
let usersData = [];

//step 4
// fetching 12 random users from the API
const baseUrl = 'https://randomuser.me/api';
fetch(`${baseUrl}/?results=12`)
    .then((response) => response.json())
    .then((data) => {
        displayUsers(data.results);
        usersData = data.results;
    })

    // created function to display the users
function displayUsers(users) {
    console.log(users);

    // variable to select gallery div
    const gallery = document.querySelector('#gallery');

    //using forEach to pass data in each card
    users.forEach((user, index) => {
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

                //adding usercard to the end of gallery div
        gallery.insertAdjacentHTML('beforeend', userCard)
    });
    showModal();
}

//function to show the modal
function showModal() {

    // select all card div and iterating for all the divs.
    // adding a click event listener to show the modal
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
                        <p class="modal-text">${formatPhoneNumber(user.phone)}</p>
                        <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                        <p class="modal-text">Birthday: ${formatDate(user.dob.date)}</p>
                    </div>
                </div>

                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
            `

            //adding the modal to the body element
            document.querySelector('body').insertAdjacentHTML('beforeend', modalContent);
            //calling the closeModal function
            closeModal();

        })

    })
}
// function to close the modal
function closeModal() {

    //variable to select close button form element
    //added event listener to click close button 
    const closeBtn = document.querySelector("#modal-close-btn");
    closeBtn.addEventListener('click', () => {
        //delecting modal div from the DOM
        closeBtn.parentElement.parentElement.remove();
    })

}

function formatPhoneNumber(phone) {
    let phoneNumbers = '';

    // checking if a character ia a number using a loop
    for (const char of phone) {
        if (!isNaN(char)) {
            phoneNumbers += char;
        }
    }
    //modify phone numbers
    //variable for 1st three numbers
    let g1 = phoneNumbers.slice(0, 3);
    //variable for 2nd three numbers
    let g2 = phoneNumbers.slice(3, 6);
    // variable for last 4 numbers
    let g3 = phoneNumbers.slice(6, 10);

    return `(${g1}) ${g2}-${g3}`
}

function formatDate(date) {
    //variable to split the date into date and time sections. 
    //Select the date section and split by - to get year, month, date
    let dt = date.split('T')[0].split('-')
    return `${dt[1]}/${dt[2]}/${dt[0]}`
}