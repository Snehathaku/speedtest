document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting immediately

    // Get form values
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    // Validation
    if (name === "" || email === "" || message === "") {
        alert("Please fill in all required fields.");
        return;
    }

    // Email format validation
    let emailPattern = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Success Message
    alert("Thank you, " + name + "! Your message has been sent.");
    this.reset(); // Reset the form
});