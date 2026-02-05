document.addEventListener("DOMContentLoaded", function () {

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

    const qrImage = document.getElementById("qrImage");
    const sessionText = document.getElementById("sessionId");
    const newSessionBtn = document.getElementById("newSessionBtn");

    function generateSession() {
        const sessionId = Math.random().toString(36).substring(2, 10);

        db.collection("sessions").doc(sessionId).set({
            active: true,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        const url = `http://localhost:5500/student.html?session=${sessionId}`;

        qrImage.src =
            "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" +
            encodeURIComponent(url);

        sessionText.textContent = "Session ID: " + sessionId;

        console.log("QR generated:", url);
    }

    newSessionBtn.addEventListener("click", generateSession);
    generateSession(); // auto-generate on load
});
