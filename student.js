document.addEventListener("DOMContentLoaded", function () {

    // Firebase config
    const firebaseConfig = {
        apiKey: "AIzaSyCM6bcEhPExLo1Put0tCmSrHEQHcS0inJA",
        authDomain: "qr-attendance-system-fd0d1.firebaseapp.com",
        projectId: "qr-attendance-system-fd0d1",
        storageBucket: "qr-attendance-system-fd0d1.firebasestorage.app",
        messagingSenderId: "158675868405",
        appId: "1:158675868405:web:4e47d1886e0685df6083bc"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    const form = document.getElementById("attendanceForm");
    const statusText = document.getElementById("status");

    const sessionId = new URLSearchParams(window.location.search).get("session");

    if (!sessionId) {
        alert("Invalid or missing session.");
        form.style.display = "none";
        return;
    }

    // Validate session BEFORE allowing submit
    db.collection("sessions").doc(sessionId).get().then(doc => {
        if (!doc.exists || !doc.data().active) {
            alert("Session expired or inactive.");
            form.style.display = "none";
        }
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const roll = document.getElementById("roll").value;

        const attendance = {
            name: name,
            roll: roll,
            sessionId: sessionId,
            time: new Date().toLocaleString()
        };

        db.collection("attendance").add(attendance).then(() => {
            statusText.textContent = "Attendance marked successfully.";
            form.reset();
        }).catch(console.error);
    });
});
