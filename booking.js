let bookingContainer = document.getElementById("bookingContainer");

let loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

let bookings = JSON.parse(
    localStorage.getItem("bookings")
) || [];

let myBookings = bookings.filter(function (booking) {

    return booking.userBy == loggedInUser.email;

});

displayBookings();

function displayBookings() {

    bookingContainer.innerHTML = "";

    if (bookings.length == 0) {

        bookingContainer.innerHTML = `

        <div class="col-12">

            <div class="dashboard-card text-center">

                <i class="bi bi-calendar-x display-1 text-secondary"></i>

                <h3 class="mt-4">No Bookings Found</h3>

                <p class="text-secondary">

                    You haven't booked any tables yet.

                </p>

            </div>

        </div>

        `;

        return;

    }

    myBookings.forEach(function (booking, index) {

        bookingContainer.innerHTML += `

        <div class="col-lg-4 col-md-6">

            <div class="dashboard-card">

                <h3 class="card-title">

                    <i class="bi bi-table"></i>

                    Table ${booking.table}

                </h3>

                <p>

                    <strong>Name :</strong>

                    ${booking.name}

                </p>

                <p>

                    <strong>Phone :</strong>

                    ${booking.phone}

                </p>

                <p>

                    <strong>Date :</strong>

                    ${booking.date}

                </p>

                <p>

                    <strong>Time :</strong>

                    ${booking.time}

                </p>

                <p>

                    <strong>Guests :</strong>

                    ${booking.guests}

                </p>

                <button
                    class="btn btn-danger w-100 mt-3"
                    onclick="cancelBooking(${index})">

                    <i class="bi bi-trash"></i>

                    Cancel Booking

                </button>

            </div>

        </div>

        `;

    });

}

function cancelBooking(index) {

    let confirmDelete = confirm(

        "Cancel this booking?"

    );

    if (!confirmDelete) {

        return;

    }

    bookings.splice(index, 1);

    localStorage.setItem(

        "bookings",

        JSON.stringify(bookings)

    );

    displayBookings();

}