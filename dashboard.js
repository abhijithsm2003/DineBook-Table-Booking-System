let tables = [

    { id: 1, seats: 4 },
    { id: 2, seats: 4 },
    { id: 3, seats: 4 },
    { id: 4, seats: 4 },
    { id: 5, seats: 4 },
    { id: 6, seats: 4 }

];

let tableContainer = document.getElementById("tableContainer");

let customerName = document.getElementById("customerName");
let customerPhone = document.getElementById("customerPhone");
let bookingDate = document.getElementById("bookingDate");
let bookingTime = document.getElementById("bookingTime");
let guests = document.getElementById("guests");

let selectedTableText = document.getElementById("selectedTable");
let summaryDate = document.getElementById("summaryDate");
let summaryTime = document.getElementById("summaryTime");
let summaryGuests = document.getElementById("summaryGuests");

let logoutBtn = document.getElementById("logoutBtn");
let actionBtn = document.getElementById("actionBtn");

let selectedTable = null;

let actionType = "book";

let bookings = JSON.parse(

    localStorage.getItem("bookings")

) || [];

let loggedInUser = JSON.parse(

    localStorage.getItem("loggedInUser")

);

if (loggedInUser == null) {

    window.location.href = "index.html";

}

function loadTables() {

    tableContainer.innerHTML = "";

    tables.forEach(function (table) {

        let booking = bookings.find(function (item) {

            return item.tableId == table.id;

        });

        let status = "Available";

        let className = "available";

        if (booking) {

            status = "Booked";

            className = "booked";

        }

        tableContainer.innerHTML += `

        <div class="col-md-4">

            <div
                class="table-card ${className}"
                data-id="${table.id}">

                <i class="bi bi-grid-fill"></i>

                <h4>

                    Table ${table.id}

                </h4>

                <p>

                    ${table.seats} Seats

                </p>

                <p class="status">

                    ${status}

                </p>

            </div>

        </div>

        `;

    });

    tableClick();

}

loadTables();

function tableClick() {

    let cards = document.querySelectorAll(".table-card");

    cards.forEach(function (card) {

        card.addEventListener("click", function () {

            let tableId = Number(card.dataset.id);

            let booking = bookings.find(function (item) {

                return item.tableId == tableId;

            });

            if (booking) {

                selectedTable = tableId;

                selectedTableText.innerHTML =
                    "Table " + tableId;

                summaryDate.innerHTML =
                    booking.date;

                summaryTime.innerHTML =
                    booking.time;

                summaryGuests.innerHTML =
                    booking.guests;

                if (booking.userBy == loggedInUser.email) {

                    actionType = "cancel";

                    actionBtn.innerHTML = `

                    <i class="bi bi-trash-fill"></i>

                    Cancel Booking

                    `;

                    actionBtn.classList.remove("auth-btn");

                    actionBtn.classList.add("btn","btn-danger");

                }

                else {

                    actionType = "";

                    actionBtn.innerHTML = `

                    Already Booked

                    `;

                    actionBtn.disabled = true;

                }

                return;

            }

            cards.forEach(function (item) {

                item.classList.remove("selected");

                if (!item.classList.contains("booked")) {

                    item.classList.add("available");

                    item.querySelector(".status").innerHTML =
                        "Available";

                }

            });

            card.classList.remove("available");

            card.classList.add("selected");

            card.querySelector(".status").innerHTML =
                "Selected";

            selectedTable = tableId;

            selectedTableText.innerHTML =
                "Table " + tableId;

            actionType = "book";

            actionBtn.disabled = false;

            actionBtn.classList.remove("btn-danger");

            actionBtn.classList.add("auth-btn");

            actionBtn.innerHTML = `

            <i class="bi bi-check-circle-fill"></i>

            Confirm Booking

            `;

        });

    });

}

actionBtn.addEventListener("click", function () {

    if (actionType == "book") {

        bookTable();

    }

    else if (actionType == "cancel") {

        cancelTable();

    }

});

function bookTable() {

    if (selectedTable == null) {

        alert("Please select a table.");

        return;

    }

    if (

        customerName.value.trim() == "" ||
        customerPhone.value.trim() == "" ||
        bookingDate.value == "" ||
        bookingTime.value == "" ||
        guests.value == ""

    ) {

        alert("Please fill all fields.");

        return;

    }

    let alreadyBooked = bookings.find(function (booking) {

        return booking.tableId == selectedTable;

    });

    if (alreadyBooked) {

        alert("This table is already booked.");

        return;

    }

    let booking = {

        tableId: selectedTable,

        userBy: loggedInUser.email,

        name: customerName.value.trim(),

        phone: customerPhone.value.trim(),

        date: bookingDate.value,

        time: bookingTime.value,

        guests: guests.value

    };

    bookings.push(booking);

    localStorage.setItem(

        "bookings",

        JSON.stringify(bookings)

    );

    summaryDate.innerHTML = booking.date;

    summaryTime.innerHTML = booking.time;

    summaryGuests.innerHTML = booking.guests;

    alert("Booking Successful");

    customerName.value = "";
    customerPhone.value = "";
    bookingDate.value = "";
    bookingTime.value = "";
    guests.value = "";

    selectedTable = null;

    selectedTableText.innerHTML = "-";

    loadTables();

}

function cancelTable() {

    let booking = bookings.find(function (booking) {

        return booking.tableId == selectedTable;

    });

    if (!booking) {

        alert("Booking not found.");

        return;

    }

    if (booking.userBy != loggedInUser.email) {

        alert("You can cancel only your booking.");

        return;

    }

    let confirmCancel = confirm(

        "Are you sure you want to cancel this booking?"

    );

    if (!confirmCancel) {

        return;

    }

    bookings = bookings.filter(function (booking) {

        return !(

            booking.tableId == selectedTable &&

            booking.userBy == loggedInUser.email

        );

    });

    localStorage.setItem(

        "bookings",

        JSON.stringify(bookings)

    );

    selectedTable = null;

    selectedTableText.innerHTML = "-";

    summaryDate.innerHTML = "-";

    summaryTime.innerHTML = "-";

    summaryGuests.innerHTML = "-";

    actionType = "book";

    actionBtn.disabled = false;

    actionBtn.classList.remove("btn-danger");

    actionBtn.classList.add("auth-btn");

    actionBtn.innerHTML = `

        <i class="bi bi-check-circle-fill"></i>

        Confirm Booking

    `;

    loadTables();

    alert("Booking Cancelled Successfully.");

}

logoutBtn.addEventListener("click", function () {

    let confirmLogout = confirm(

        "Are you sure you want to logout?"

    );

    if (!confirmLogout) {

        return;

    }

    localStorage.removeItem("loggedInUser");

    window.location.href = "index.html";

});