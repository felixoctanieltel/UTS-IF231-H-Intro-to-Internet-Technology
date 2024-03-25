const dataForm = document.getElementById('data-form');
const dataTableBody = document.getElementById('data-table-body');
const modal = document.getElementById('myModal');
const editModal = document.getElementById('editModal');
let data = []; // Array untuk menyimpan data
const itemsPerPage = 10;
let currentPage = 1;

function openModal() {
    modal.style.display = 'block';
}

function openEditModal() {
    editModal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

function closeEditModal() {
    editModal.style.display = 'none';
}

function saveData() {
    const namaInput = document.getElementById('nama');
    const nimInput = document.getElementById('nim'); // Tambah input NIM
    const alamatInput = document.getElementById('alamat'); // Tambah input alamat
    const nama = namaInput.value;
    const nim = nimInput.value; // Dapatkan nilai input NIM
    const alamat = alamatInput.value; // Dapatkan nilai input alamat

    // Validasi input
    if (!nama || !nim || !alamat) { // Periksa keberadaan nama, nim, dan alamat
        showAlert('Data tidak dapat ditambahkan karena tidak lengkap.', 'pink');
        return;
    }

    // Simpan data baru ke dalam array dan tabel
    const newData = {
        id: data.length + 1,
        nama: nama,
        nim: nim, // Simpan nilai NIM
        alamat: alamat // Simpan nilai alamat
    };
    data.push(newData);
    renderData();
    
    // Clear input, tutup modal, dan tampilkan notifikasi
    namaInput.value = '';
    nimInput.value = ''; // Kosongkan input NIM
    alamatInput.value = ''; // Kosongkan input alamat
    closeModal();
    showAlert('Berhasil menambahkan data baru.', 'green');
}

function editRow(button) {
    openEditModal();
    const row = button.parentNode.parentNode;
    const id = parseInt(row.dataset.id);
    const nama = row.cells[2].textContent; // Index 2 untuk kolom nama
    const nim = row.cells[1].textContent; // Index 1 untuk kolom NIM
    const alamat = row.cells[3].textContent; // Index 3 untuk kolom alamat
    
    // Set nilai awal pada modal edit
    document.getElementById('editNama').value = nama;
    document.getElementById('editNIM').value = nim;
    document.getElementById('editAlamat').value = alamat;
    document.getElementById('editNama').dataset.id = id;

    // Tampilkan notifikasi edit
    showAlert('Silakan edit data dan tekan Simpan.', 'blue');
}

function saveEditedData() {
    const editedNamaInput = document.getElementById('editNama');
    const editedNimInput = document.getElementById('editNIM');
    const editedAlamatInput = document.getElementById('editAlamat');
    const editedNama = editedNamaInput.value;
    const editedNim = editedNimInput.value;
    const editedAlamat = editedAlamatInput.value;
    const id = parseInt(editedNamaInput.dataset.id);

    // Validasi input
    if (!editedNama || !editedNim || !editedAlamat) {
        showAlert('Data tidak dapat diedit karena tidak lengkap.', 'red');
        return;
    }

    // Update data yang telah diubah pada array dan tabel
    const editedDataIndex = data.findIndex(item => item.id === id);
    if (editedDataIndex !== -1) {
        data[editedDataIndex].nama = editedNama;
        data[editedDataIndex].nim = editedNim;
        data[editedDataIndex].alamat = editedAlamat;
        renderData();
        showAlert('Berhasil melakukan update data.', 'blue');
        closeEditModal();
    } else {
        showAlert('Data tidak ditemukan.', 'red');
    }
}

function deleteRow(button) {
    const row = button.parentNode.parentNode;
    const id = parseInt(row.dataset.id);

    // Hapus data dari array dan render ulang tabel
    data = data.filter(item => item.id !== id);
    renderData();

    // Tampilkan notifikasi
    showAlert('Berhasil menghapus data.', 'red');
}

function renderData() {
    // Kosongkan tabel
    dataTableBody.innerHTML = '';

    // Hitung indeks data yang akan ditampilkan
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const renderData = data.slice(startIndex, endIndex);

    // Render ulang data ke dalam tabel
    renderData.forEach(item => {
        const newRow = document.createElement('tr');
        newRow.dataset.id = item.id;
        newRow.innerHTML = `
        <td>${item.id}</td>
        <td>${item.nim}</td>
        <td>${item.nama}</td>
        <td>${item.alamat}</td>
        <td>
            <button class="btn btn-warning btn-sm" onclick="editRow(this)">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteRow(this)">Hapus</button>
        </td>
        `;
        dataTableBody.appendChild(newRow);
    });
}

function showAlert(message, color) {
    const alertDiv = document.createElement('div');
    alertDiv.textContent = message;
    alertDiv.className = 'alert';
    alertDiv.style.backgroundColor = color;
    document.body.appendChild(alertDiv);
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Menambahkan fungsi custom untuk mencari elemen berdasarkan teks
jQuery.expr[':'].contains = function(a, i, m) {
    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};

// Render ulang tabel saat halaman dimuat
window.onload = function() {
    renderData();
};
