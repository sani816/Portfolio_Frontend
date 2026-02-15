const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    try {
        const res = await fetch("https://portfolio-backend-24j4.vercel.app/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });

        const data = await res.json();
        console.log("Response from backend:", data); // check in console/Postman

        if (data.success) {
            alert("Message sent successfully!");
            form.reset();
        } else {
            alert(data.error || "Error sending message");
        }

    } catch (err) {
        alert("Server not connected!");
        console.log(err);
    }
});
