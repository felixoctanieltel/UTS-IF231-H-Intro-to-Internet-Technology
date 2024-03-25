$(document).ready(function(){
    // Cek apakah pengguna sudah login
    var username = localStorage.getItem('username');
    if(username) {
        // Jika sudah login, tampilkan halaman utama
        showMainPage();
    }

    // Submit form login
    $('#loginForm').submit(function(event){
        event.preventDefault();
        var username = $('#username').val().trim();
        if(username === '') {
            alert('Nama tidak boleh kosong!');
            return;
        }
        // Simpan nama pengguna ke localStorage
        localStorage.setItem('username', username);
        // Redirect ke halaman utama
        window.location.href = 'index.html';
    });

    // Logout
    $(document).on('click', '#logoutBtn', function(){
        // Hapus data pengguna dari localStorage
        localStorage.removeItem('username');
        // Redirect kembali ke halaman login
        window.location.href = 'login.html';
    });

    // Fungsi untuk menampilkan halaman utama
    function showMainPage() {
        // Ambil nama pengguna dari localStorage
        var username = localStorage.getItem('username');
        // Tampilkan nama pengguna di navbar
        $('#username').text(username);
        $('#welcomeUsername').text(username);

        // Ambil data transaksi dari local storage
        var transactions = JSON.parse(localStorage.getItem('transactions')) || [];

        // Hitung saldo berdasarkan transaksi
        var saldo = calculateBalance(transactions);

        // Tampilkan saldo pada halaman index.html
        $("#saldoAmount").text(formatCurrency(saldo));

        // Buat daftar transaksi HTML
        var transactionList = "";
        transactions.forEach(function(transaction) {
            // Tentukan kelas berdasarkan jenis transaksi
            var transactionTypeClass = transaction.type === 'income' ? 'income' : 'outcome';
            // Tambahkan kelas ke elemen daftar transaksi
            transactionList += "<li class='" + transactionTypeClass + "'>" + transaction.name + " - " + formatCurrency(transaction.nominal) + " (" + transaction.type + ")</li>";
        });
        // Tampilkan daftar transaksi pada halaman index.html
        $("#daftarTransaksi").html(transactionList);
    }

    // Fungsi untuk memperbarui saldo berdasarkan transaksi
    function calculateBalance(transactions) {
        var saldo = 0;
        transactions.forEach(function(transaction) {
            if(transaction.type === 'income') {
                saldo += transaction.nominal;
            } else if(transaction.type === 'outcome') {
                saldo -= transaction.nominal;
            }
        });
        return saldo;
    }

    // Fungsi untuk memformat nominal uang dengan separator ribuan
    function formatCurrency(amount) {
        return "IDR " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
});