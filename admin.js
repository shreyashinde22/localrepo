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

    const adminList = document.getElementById("adminList");

    db.collection("attendance")
        .orderBy("time", "asc")
        .get()
        .then(snapshot => {
            adminList.innerHTML = "";
            snapshot.forEach(doc => {
                const data = doc.data();
                const li = document.createElement("li");
                li.textContent = `${data.name} (${data.roll}) - ${data.time}`;
                adminList.appendChild(li);
            });
        })
        .catch(console.error);
});
