# Sugoku Challenge

- Refrensi: <https://sugoku.herokuapp.com/>
- 3rd party API: <https://github.com/bertoort/sugoku>
- Screenshots: /screenshots

## W2D1

- [v] Install expo-cli & expo init & setup project
- [v] Layout board 9x9
- [v] Fetch data board
- [v] Mencoba redux dalam react-native
- [v] Validate board

### Notes D1
- bisa semua huehue
- aku cek nya dari browser kak, gatau kalo di cek di HP bener atau engga, tp kayaknya aman2 aja
- udah nyoba hit"/solve", tp kok balikannya ga sinkron sama board yg udah di generate hm

## W2D2

- [v] Setup React-native Navigation
- [v] Membuat 3 Screen
- [v] Memanfaatkan useParams
- [v] Pindah-pindah antar screen

### Notes D2

- update setup-sudoku, hit "/solve" done, 
- udah bisa cek dari hp (gapake emulator), dan tampilan aman, hanya salah di fontWeight, harusnya berisi string
- ternyata masih ada bug kak, saat di validate setelah melakukan solve+update tidak works (selalu benar)

## Requirement Sugoku

### Home Page

- [v] Halaman HOME sudah ada input untuk memasukkan name
- [v] Halaman HOME sudah dapat memilih difficulty permainan
- [v] Tidak dapat masuk kehalaman game ketika nama/difficulty belum dipilih

### Game Page

- [v] Masuk ke halaman game dengan membawa data name dan difficulty lewat params. name dan difficulty tidak perlu disimpan dalam redux
- [v] Menggunakan redux dan react-redux untuk menyimpan data 3rd party API. Semua konsep redux yang sudah pernah dipelajari (sampai redux-thunk) bisa diimplementasi
- [v] Data board yang dimainkan oleh user harus sinkron dengan state
- [v] Di halaman game menampilkan board 9x9 dan menampilkan data dari API dengan benar sesuai dengan difficulty yang dipilih sebelumnya
- [ ] Sudoku dapat dimainkan seperti bermain sudoku pada umumnya:
  - [v] Kotak yang sudah terisi pada initial permainan tidak bisa diedit
  - [v] Angka 0 di tampilkan sebagai kotak kosong
  - [v] Kotak kosong HANYA dapat diisi dengan ANGKA, dan hanya dapat diisi 1 DIGIT
  - [ ]  User dapat mengecek apakah board yang dia isi sudah benar atau tidak dengan mengecek ke API `/validate`, jika hasil respon API nya statusnya solved maka user di arahkan ke halaman Finish dengan membawa data user lewat params

### Finish Page

- [v] Pada halaman finish ada nama pemain yang sedang bermain
- [v] Pada halaman finish ada tombol yang mengembalikan kita ke halaman Home

### Tambahan

- [v] Tombol auto solve pada halaman game yang request ke API `/solve` dan mengisi board dengan dengan data dari API, namun kotak yang sebelum nya diedit HARUS tetap bisa diedit agar:
  - untuk memudahkan aku memerika tombol validate nya dan redirect ke halaman finish JIKA boardnya sudah benar
  - bisa aku salahin 1 kotak untuk mengecek bagaimana respon tombol validate jika board yang kuisi ada yang salah
