// ---------- Firebase setup ----------
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

// ---------- DOM elements (may or may not exist) ----------
const form = document.getElementById("attendanceForm");
const statusText = document.getElementById("status");
const attendanceList = document.getElementById("attendanceList");

const adminBtn = document.getElementById("adminBtn");
const adminPanel = document.getElementById("adminPanel");
const adminList = document.getElementById("adminList");

// ---------- Data ----------
let records = [];

// ---------- Load records ----------
function loadRecords() {
    db.collection("attendance")
        .orderBy("time", "asc")
        .get()
        .then(function (snapshot) {
            records = [];
            snapshot.forEach(function (doc) {
                records.push(doc.data());
            });

            if (attendanceList) {
                renderRecent();
            }

            if (adminList && adminPanel.style.display === "block") {
                renderAdmin();
            }
        })
        .catch(function (error) {
            console.error("Error loading records:", error);
        });
}

// ---------- Student view: recent 5 ----------
function renderRecent() {
    attendanceList.innerHTML = "";

    const recent = records.slice(-5);

    recent.forEach(function (item) {
        const li = document.createElement("li");
        li.textContent = `${item.name} (${item.roll}) - ${item.time}`;
        attendanceList.appendChild(li);
    });
}

// ---------- Admin view: all ----------
function renderAdmin() {
    adminList.innerHTML = "";

    records.forEach(function (item) {
        const li = document.createElement("li");
        li.textContent = `${item.name} (${item.roll}) - ${item.time}`;
        adminList.appendChild(li);
    });
}

// ---------- Student form ----------
if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const roll = document.getElementById("roll").value.trim();

        if (!name || !roll) {
            statusText.textContent = "Fill in all fields properly.";
            return;
        }

        const attendance = {
            name: name,
            roll: roll,
            time: new Date().toLocaleString()
        };

        db.collection("attendance")
            .add(attendance)
            .then(function () {
                statusText.textContent =
                    `Attendance marked for ${name} (${roll})`;
                form.reset();
                loadRecords();
            })
            .catch(function (error) {
                console.error("Error saving attendance:", error);
            });
    });
}

// ---------- Admin button ----------
if (adminBtn) {
    adminBtn.addEventListener("click", function () {
        const password = prompt("Enter admin password:");

        if (password !== "admin123") {
            alert("Wrong password");
            return;
        }

        adminPanel.style.display = "block";
        loadRecords();
    });
}

// ---------- Initial load ----------
loadRecords();
