$(document).ready(function(){
    // Submit form income
    $('#incomeForm').submit(function(event){
        event.preventDefault();
        
        var transactionName = $('#transactionName').val().trim();
        var transactionNominal = $('#transactionNominal').val().trim().replace(/\./g, ''); // Hilangkan titik jika ada
        var transactionType = 'income'; // Tentukan jenis transaksi sebagai 'outcome'


        if(transactionName === '' || transactionNominal === '') {
            alert('Transaction name and nominal cannot be empty!');
            return;
        }

        // Simpan transaksi ke local storage
        var transaction = {
            name: transactionName,
            nominal: parseFloat(transactionNominal),
            type: 'income' // Tentukan jenis transaksi sebagai 'income'
        };

        // Ambil data transaksi dari local storage (jika ada)
        var transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        // Tambahkan transaksi baru ke daftar transaksi
        transactions.push(transaction);
        // Simpan daftar transaksi yang telah diperbarui kembali ke local storage
        localStorage.setItem('transactions', JSON.stringify(transactions));

        // Reset form
        $('#transactionName').val('');
        $('#transactionNominal').val('');
        $('#transactionType').val('');

        // Tampilkan pesan sukses
        alert("Income transaction saved successfully");
    });
});