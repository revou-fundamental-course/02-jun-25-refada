// JavaScript source code
document.addEventListener('DOMContentLoaded', () => {
    // Function to update current time (for index.html and form 4/5 based structures)
    const updateCurrentTime = () => {
        const currentTimeElement = document.getElementById('current-time');
        if (currentTimeElement) {
            const now = new Date();
            // Format the date as seen in form 4.PNG (e.g., Fri Jun 17 2022 11:27:28 GMT+0730)
            // Note: JavaScript Date object's toString() often gives this format directly.
            currentTimeElement.textContent = now.toString();
        }
    };

    updateCurrentTime(); // Call once on load
    setInterval(updateCurrentTime, 1000); // Update every second

    // Example for form submission (for the Message Us form in index.html)
    const messageForm = document.querySelector('.message-form');
    if (messageForm) {
        messageForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            const name = document.getElementById('name').value;
            const dob = document.getElementById('dob').value;
            const gender = document.querySelector('input[name="gender"]:checked').value;
            const message = document.getElementById('message').value;

            // In a real application, you would send this data to a server
            console.log('Form Submitted:');
            console.log('Name:', name);
            console.log('Tanggal Lahir:', dob);
            console.log('Jenis Kelamin:', gender);
            console.log('Pesan:', message);

            alert('Pesan Anda telah terkirim!');
            // Optionally, clear the form or update the display area with the new message
        });
    }

    // --- CRUD Form (form 1.PNG) functionality ---
    const crudForm = document.querySelector('.crud-form');
    const dataTableBody = document.querySelector('.data-table tbody');

    // Simple data storage (in real app, this would be a database)
    let dataEntries = [
        { name: 'Ada Lovelace', dob: 'December 10, 1815', gender: 'Perempuan', message: 'Belajar Buat Website' },
        { name: 'Grace Hopper', dob: 'December 9, 1906', gender: 'Perempuan', message: 'Hello World' },
        { name: 'Margaret Hamilton', dob: 'August 17, 1936', gender: 'Perempuan', message: 'Test Dulu' },
        { name: 'Joan Clarke', dob: 'June 24, 1917', gender: 'Laki-Laki', message: 'Selalu Semangat' }
    ];

    const renderTable = () => {
        if (!dataTableBody) return; // Exit if not on the CRUD page

        dataTableBody.innerHTML = ''; // Clear existing rows
        dataEntries.forEach((entry, index) => {
            const row = dataTableBody.insertRow();
            row.insertCell().textContent = entry.name;
            row.insertCell().textContent = entry.dob;
            row.insertCell().textContent = entry.gender;
            row.insertCell().textContent = entry.message;

            const profileCell = row.insertCell();
            const profileLink = document.createElement('a');
            profileLink.href = '#'; // Or a dedicated profile page
            profileLink.textContent = 'Klik Disini';
            profileLink.addEventListener('click', (e) => {
                e.preventDefault();
                alert(`Profile for ${entry.name}:\nDOB: ${entry.dob}\nGender: ${entry.gender}\nMessage: ${entry.message}`);
            });
            profileCell.appendChild(profileLink);

            const deleteCell = row.insertCell();
            const deleteIcon = document.createElement('span');
            deleteIcon.className = 'delete-icon';
            deleteIcon.innerHTML = '&#128465;'; // Trash can emoji
            deleteIcon.title = `Delete ${entry.name}`;
            deleteIcon.addEventListener('click', () => {
                if (confirm(`Are you sure you want to delete ${entry.name}?`)) {
                    dataEntries.splice(index, 1); // Remove from array
                    renderTable(); // Re-render table
                }
            });
            deleteCell.appendChild(deleteIcon);
        });
    };

    if (crudForm) {
        crudForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = crudForm.querySelector('#crud-name').value;
            const dob = crudForm.querySelector('#crud-dob').value;
            const gender = crudForm.querySelector('input[name="crud-gender"]:checked').value;
            const message = crudForm.querySelector('#crud-message').value;

            const newEntry = { name, dob, gender, message };
            dataEntries.push(newEntry);
            renderTable();

            crudForm.reset(); // Clear the form
            alert('Data berhasil ditambahkan!');
        });
    }

    renderTable(); // Initial render for CRUD page
});