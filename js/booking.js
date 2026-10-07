document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("bookingForm");
    const checkin = document.getElementById("checkin");
    const checkout = document.getElementById("checkout");
    const room = document.getElementById("room");

    if (!form) {
        console.error("bookingForm was not found.");
        return;
    }

    // Room prices
    const roomPrices = {
        "Deluxe Room": 120,
        "Executive Room": 180,
        "Royal Suite": 300
    };

    // Set today's date
    const today = new Date().toISOString().split("T")[0];

    if (checkin) {
        checkin.min = today;
    }

    if (checkout) {
        checkout.min = today;
    }

    // Change checkout minimum date when check-in changes
    if (checkin && checkout) {
        checkin.addEventListener("change", function () {
            checkout.min = checkin.value;

            if (checkout.value && checkout.value <= checkin.value) {
                checkout.value = "";
            }
        });
    }

    // Form submission
    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        const checkinValue = checkin.value;
        const checkoutValue = checkout.value;
        const selectedRoom = room.value;

        // Check dates
        const checkInDate = new Date(checkinValue);
        const checkOutDate = new Date(checkoutValue);

        const difference = checkOutDate - checkInDate;
        const nights = difference / (1000 * 60 * 60 * 24);

        if (nights <= 0) {
            alert("Please select a valid check-out date.");
            return;
        }

        // Check room
        if (!roomPrices[selectedRoom]) {
            alert("Please select a room.");
            return;
        }

        // Calculate price
        const pricePerNight = roomPrices[selectedRoom];
        const total = nights * pricePerNight;

        // Show confirmation
        alert(
            "Reservation Request Received!\n\n" +
            "Thank you, " + firstName + " " + lastName + ".\n\n" +
            "Room: " + selectedRoom + "\n" +
            "Check-in: " + checkinValue + "\n" +
            "Check-out: " + checkoutValue + "\n" +
            "Nights: " + nights + "\n" +
            "Price per night: $" + pricePerNight + "\n" +
            "Estimated Total: $" + total + "\n\n" +
            "We will contact you to confirm your booking."
        );

        form.reset();

        // Restore minimum date
        checkin.min = today;
        checkout.min = today;
    });

});