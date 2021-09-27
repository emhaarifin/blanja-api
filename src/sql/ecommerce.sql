-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 11, 2021 at 07:16 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `categoryName` varchar(128) NOT NULL,
  `image` varchar(1028) NOT NULL,
  `color` varchar(128) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `categoryName`, `image`, `color`, `createdAt`, `modifiedAt`) VALUES
(1, 'T-Shirt', 'http://localhost:4000/file/t-shirt.svg', '#CC0B04', '2021-07-09 13:39:58', '2021-07-09 13:39:58'),
(2, 'Short', 'http://localhost:4000/file/shorts.svg', '#1C3391', '2021-07-11 04:08:45', '2021-07-11 04:08:45'),
(3, 'Jacket', 'http://localhost:4000/file/jacket.svg', '#F67B02', '2021-07-11 04:08:45', '2021-07-12 06:56:42'),
(4, 'Pants', 'http://localhost:4000/file/pants.svg', '#E31F51', '2021-07-11 04:08:45', '2021-07-11 04:08:45'),
(5, 'Shoes', 'http://localhost:4000/file/shoes.svg', '#57CD9E', '2021-07-11 04:08:45', '2021-07-11 04:08:45');

-- --------------------------------------------------------

--
-- Table structure for table `order_seller`
--

CREATE TABLE `order_seller` (
  `id` int(11) NOT NULL,
  `status_order` varchar(32) NOT NULL,
  `buyerName` varchar(108) NOT NULL,
  `productId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `orderAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_seller`
--

INSERT INTO `order_seller` (`id`, `status_order`, `buyerName`, `productId`, `categoryId`, `orderAt`) VALUES
(1, 'Get Paid', 'Dimas Ari', 2, 1, '2021-07-11 09:14:57'),
(2, '', 'Setyowati', 3, 1, '2021-07-11 09:16:20'),
(3, 'Processed', 'Wahyu ', 8, 3, '2021-07-11 09:23:47'),
(4, 'Sent', 'Agus', 12, 4, '2021-07-11 09:24:43'),
(5, 'Completed', 'Daffa', 15, 5, '2021-07-11 09:25:53'),
(7, 'Cekk', 'Gilang ', 6, 2, '2021-07-12 04:02:01'),
(8, 'Cekk', 'Gilang ', 3, 2, '2021-07-12 04:59:57'),
(9, 'Completed', 'Gilang ', 3, 2, '2021-07-12 06:59:30');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(100) NOT NULL,
  `name` varchar(128) NOT NULL,
  `brand` varchar(128) NOT NULL,
  `image` varchar(1024) NOT NULL,
  `stock` int(255) NOT NULL,
  `categoryId` int(100) NOT NULL,
  `description` text NOT NULL,
  `price` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `brand`, `image`, `stock`, `categoryId`, `description`, `price`, `createdAt`, `modifiedAt`) VALUES
(1, 'Baju Sweatshirt', 'Toreto', 'https://cf.shopee.co.id/file/b39aad2666d78be2a9670035299fbda0', 0, 1, 'KAOS KEREN TUSSY\r\nBAHAN SPANDEX LYCRA PREMIUM\r\nTEKSTUR BAHAN LEMBUT DAN DINGIN NYAMAN DIPAKAI\r\nDESIGN MOTIF DAN POLA BODY FIT ENAK DI LIHAT\r\n\r\nNB:\r\nBUKAN SPANDEX PE YG HARGA JUAL 18 RIBUAN\r\nTEKSTUR BAHAN PANAS DAN CEPAT BERBULU\r\n\r\nTERSEDIA 3 UKURAN M-L-XL\r\nM=LD 96CM - PJG 66CM\r\nL=LD 98CM - PJG 68CM\r\nXL=LD 100CM - PJG 70CM\r\n\r\nMOTIF DI SABLON KUALITAS PREMIUM\r\nJAHITAN PAKAI RANTAI STANDAR DISTRO\r\nBERAT PRODUK 180gr\r\n1KG MUAT 7 PCS\r\nREAL PICT & GOOD QUALITY\r\n\r\nTerima kasih!', 120000, '2021-07-09 04:46:26', '2021-07-09 04:46:26'),
(3, 'Kaos Distro', 'Toreto', 'https://id-test-11.slatic.net/p/f11d3343fe8a373d22fea03b81d97b99.jpg', 0, 1, 'KAOS KEREN TUSSY\r\nBAHAN SPANDEX LYCRA PREMIUM\r\nTEKSTUR BAHAN LEMBUT DAN DINGIN NYAMAN DIPAKAI\r\nDESIGN MOTIF DAN POLA BODY FIT ENAK DI LIHAT\r\n\r\nNB:\r\nBUKAN SPANDEX PE YG HARGA JUAL 18 RIBUAN\r\nTEKSTUR BAHAN PANAS DAN CEPAT BERBULU\r\n\r\nTERSEDIA 3 UKURAN M-L-XL\r\nM=LD 96CM - PJG 66CM\r\nL=LD 98CM - PJG 68CM\r\nXL=LD 100CM - PJG 70CM\r\n\r\nMOTIF DI SABLON KUALITAS PREMIUM\r\nJAHITAN PAKAI RANTAI STANDAR DISTRO\r\nBERAT PRODUK 180gr\r\n1KG MUAT 7 PCS\r\nREAL PICT & GOOD QUALITY\r\n\r\nTerima kasih!', 50000, '2021-07-09 04:46:26', '2021-07-20 17:08:35'),
(6, 'Celana Boxer', 'sapto.kalis', 'https://cf.shopee.co.id/file/c50d050e6b897f833c4f006ec0f984c3', 0, 2, 'Boxer Unisex Pria dan Wanita', 25000, '2021-07-11 04:24:19', '2021-07-11 04:24:19'),
(8, 'Jackhammer Patrol Flight Jacket Medallion', 'jackhammerofficial', 'https://cf.shopee.co.id/file/40af79a07ca4d09cefe0707114371c7e', 0, 3, 'Jaket ini terinspirasi dari jaket pilot dilengkapi dengan quilting pada lapisan dalam serta terdapat detail bordir the destined pioneer pada bagian luarnya. Cocok untuk menyempurnakan outfit Anda', 500000, '2021-07-11 04:34:03', '2021-07-11 04:34:03'),
(9, 'Jackhammer Patrol Flight Jacket Onyx Jaket Bomber Pri', 'jackhammerofficial', 'https://cf.shopee.co.id/file/cb5c170be2c44205037adefd8a23be82', 0, 3, 'Jackhammer Co. Jaket Rib yang terbuat dari twill ini merupakan jaket yang dipakai pilot - pilot kapal pada military er', 499000, '2021-07-11 04:34:03', '2021-07-11 04:34:03'),
(12, 'New Balance Essentials Stacked Logo Men Pants - Black', 'sportsstationofficialshop', 'https://cf.shopee.co.id/file/195dbd0b00818d28bdf47825a6677000', 0, 4, 'A flying NB logo on the left hip adds just the right amount of heritage-inspired style, and a drawstring waist helps ensure a stay-put fit during urban adventures.', 700000, '2021-07-11 04:40:27', '2021-07-12 06:54:23'),
(15, 'Troy 1SG', 'jacksonshoes.id', 'https://cdn.shopify.com/s/files/1/0534/4729/5151/products/TROYBLACK-1_400x.jpg?v=1614826198', 0, 5, 'Sneakers Troy 1SG bertali depan dengan desain yang bold dan timeless memberikan vibe elegan untuk pilihan outfit yang casual dan berkelas. Varian warna Black dan Navy dapat dengan mudah untuk dipadukan dengan trend outfit terkini sehingga gayamu selalu relevan dan terdepan di pergaulan. You sure got a taste with this one!', 229000, '2021-07-11 04:45:41', '2021-07-11 04:45:41'),
(16, 'Nasa 1SG', 'jacksonshoes.id', 'https://cdn.shopify.com/s/files/1/0534/4729/5151/products/NASABLACK-1_400x.jpg?v=1618551641', 0, 5, 'Nasa 1ST dengan desainnya yang sleek dan simple, model lipatan-lipatan terinspirasi dari baju astronot, sehingga kakimu bisa lebih fleksibel dan dinamis bergerak! Varian warna Black, Light Grey, serta Navy yang cool dan subtle, dijamin bikin setiap langkahmu semakin ringan dan percaya diri. Slip-on sneakers tanpa tali ini memang khusus diciptakan untuk karakter anak muda sepertimu yang aktif dan gak mau ketinggalan update street fashion terkini.', 417000, '2021-07-11 04:45:41', '2021-07-20 16:19:08'),
(48, 'KAOS T- SHIRT / KAOS DEATH WISH / KAOS MAWAR / BAJU DISTRO /BAJU KEKINIAN/KAOS PRIA TERBARU / KAOS SIGAI STORE', 'toreto', 'http://id-test-11.slatic.net/p/1eea1dc35ae046aaf0ad2f11683d458a.jpg', 10, 1, 'Baju kaos pria lengan pendek limited edition- Tersedia warna/motif lainya silahkan KUNJUNGI TOKO/hub/Chat admin- Material : KATUN 30S- Dapatkan harga terendah Untuk produk berkualitas- Bahan Nyaman di pakai- Jahitan rapi- Warna Tidak Luntur- Warna sesuai dengan foto- Limited Edition- Real picture', 100, '2021-07-20 17:11:21', '2021-07-20 17:13:43'),
(49, 'SIGAI _ KAOS T-SHIRT ATASAN PRIA/KAOS SKYZO RONIN KANJI GOLD/', 'toreto', 'http://id-test-11.slatic.net/p/6a5c9d385e4cc31c8da47f6460fd0330.jpg', 100, 1, '- UNTUK PEMESANAN MOHON ISIKAN ALAMAT DENGAN JELAS DAN BENAR AGAR TIDAK TERJADI KAGAGALAN PENGIRIMAN - Baju kaos pria SAKA LATHI - Tersedia warna/motif lainya silahkan KUNJUNGI TOKO/hub/Chat admin - Material : Cotton Combed 30S - Dapatkan harga terendah Untuk produk berkualitas', 1000000, '2021-07-20 17:16:35', '2021-07-20 17:16:35'),
(50, 'T-SHIRT KAOS RONIN KANJI RED', 'Toreto', 'https://id-test-11.slatic.net/p/8812ee5885e10ce5f6b0ce7c1e4eb67a.jpg', 100, 1, 'T-SHIRT KAOS SAMURAI GEISHA TOPENG//KAOS TERBARU//BAJU KAOS TERBARU 2020//KAOS TERBARU PRIA WANITA//KAOS BERGAMBAR KEREN//KAOS PRIA TERBARU//KAOS FULL CATTON BERGAMBAR/ SIGAI STORE', 50000, '2021-07-20 17:30:06', '2021-07-20 17:30:06'),
(51, 'celana panjang wanita baggy pants/celana kantor/celana panjang chino', 'Toreto', 'https://id-test-11.slatic.net/p/d0e28ed6f76599be454680b775f88277.jpg', 100, 4, 'CELANA KANCING 4 PANTS // CELANA BAHAN DRILL MATT AMERICAN DRILL ALLSIZE FIT TO L BELAKANG KARET BISA MELAR KANCING 4 MATI/ACCECORIES DETAIL PRODUK - Lingkar pinggang -+76 melar Sampai 94 - Lingkar paha -+52 cm - Panjang -+90 cm', 35000, '2021-07-20 17:32:27', '2021-07-20 17:32:27'),
(52, 'Celana Pendek Pinggang RIB Celana Pendek CHINOS Celana Pendek RIP pendek kolor kualitas distro Alkhalis', 'Toreto', 'https://id-test-11.slatic.net/p/eeadb3ef08c5e5a0b04bfc99a66853fd.jpg', 100, 2, 'Bisa COD/bayar di tempat CELANA PENDEK CHINO SURF PINGGANG KARET ENAK BUAT SANTAI. celana pendek panjang nya sama dari 27-32=53cm(27,28)= lebar pinggang sebelum melar 70cm,setelah melar 90 cm UNTUK BB 45-52KG (29,30)= lebar pinggang sebelum melar 72cm,setelah melar 92cm UNTUK BB 53-62KG', 28500, '2021-07-20 17:34:11', '2021-07-20 17:34:11'),
(53, 'Celana santai', 'Toreto', 'https://id-test-11.slatic.net/p/6ec62236603823f4ebd8c286e2aff958.jpg', 100, 2, 'Bahan Katun Twill = Adem,lembut,dan jahitan super rapih Pinggang elastis, Lp 55 CM Bisa melar sampai 90 cm ada tali nya Terdapat Saku di kanan dan kiri serta di bagian kanan belakang celana Ukuran all size fit Bb 68 Kg | Warna di variasi semua ready Cocok buat nongkrong dan dipakai keseharian. Ready stok dan siap kirim seluruh indonesia Tersedia item paketan (90 rb dapat 4 Pcs) Bisa bayar ditempat Perhatian!!! Jika barang sampai ditangan anda,buat video unboxing awal buka paket,untuk menghindari kesalahpahaman.', 7500, '2021-07-20 17:35:46', '2021-08-03 18:55:09'),
(54, 'celana pendek murah jova twill bayar ditempat', 'Toreto', 'https://id-test-11.slatic.net/p/9f4a4144934d469300c77a6edf46cc33.jpg', 120, 2, 'BAYAR DI TEMPAT CELANA PENDEK KOLOR RIP -BAHAN - JOVA TWILL -BAHAN TEBAL DAN MELAR -LAPISAN DALAM SUTRA LEMBUT -TIDAK MUDAH ROBEK -JAHITAN RAPI -NYAMAN DI PAKAI -TIDAK PANAS -REAL PICT ASLI FOTO KAMERA SENDIRI READY SIZE XS-SIZE ANAK 0- 1TAHUN S- SIZE ANAK 1-2 TAHUN M-SIZE ANAK 5-12 TAHUN UNTUK BB 15-30KG L-SIZE DEWASA 15- 20 TAHUN COCOK UNTUK BB 35-45KG XL- SIZE DEWASA COCOK UNTUK BB 45-65KG XXL- SIZE DEWASA COCOK UNTUK BB 50-85KG XXXL- SIZE DEWASA JUMBO COCOK UNTUK BB 60-95KG ADA 2 SAKU DI BAGIAN DEPAN ADA 1 SAKU DI BAGIAN BEKALANG WARNA DAN MOTIF RANDOM YA KAK MOTIF DAN WARNA BISA BERUBAH KAPAN PUN KARENA STOCK SELALU BARU KAK UNTUK MINTA WARNA DAN MOTIF BISA HUBUNGIN SELLER LEWAT CHAT YA KAK BARANG SELALU READY BURUAN DI ORDER SEBELUM KEHABISAN', 11200, '2021-07-20 17:40:08', '2021-07-20 17:40:08'),
(55, 'Jaket Hitam polos bomber parasut', 'Toreto', 'https://id-test-11.slatic.net/p/6cc70d15eda3e578d34f59873596fa21.jpg', 122, 3, 'Good Quality. Cocok untuk digunakan sehari-hari Dijahit dengan Kualitas Garment/dengan Jahitan Tepi Ganda Tidak Luntur', 120000, '2021-07-20 17:45:52', '2021-07-20 17:45:52'),
(56, 'Selly Jaket - Outerwear Wanita', 'Toreto', 'https://id-test-11.slatic.net/p/d25b5de1adabe2d33e396d42fff7910e.jpg', 120, 3, 'Rincian Produk: Bahan Kanvas Ukuran all size fit to L Ld 100 - 102cm Toleransi ukuran 1-2cm', 44900, '2021-07-20 18:27:51', '2021-07-20 18:27:51'),
(57, 'Selly Jaket - Outerwear Wanita', 'Toreto', 'https://id-test-11.slatic.net/p/d25b5de1adabe2d33e396d42fff7910e.jpg', 120, 3, 'Rincian Produk: Bahan Kanvas Ukuran all size fit to L Ld 100 - 102cm Toleransi ukuran 1-2cm', 44900, '2021-07-20 18:40:01', '2021-07-20 18:40:01'),
(116, 'Baju hitam polos', 'Toreto', 'http://localhost:4000/file/1627997034829-8a33ed7b4004a3497e41d1bc06650595.jpeg', 10, 1, 'Beli ini jadi ganteng', 200000, '2021-08-03 13:23:54', '2021-08-03 13:23:54'),
(117, 'as', 'Tolonto', 'http://localhost:4000/file/1628000295032-Screen Shot 2021-06-29 at 00.21.06.png', 10, 2, 'as', 10, '2021-08-03 14:18:15', '2021-08-03 14:18:15'),
(118, 'as', 'Cok', 'http://localhost:4000/file/1628000840516-Screen Shot 2021-07-04 at 19.16.15.png', 12, 2, 'as', 10, '2021-08-03 14:27:20', '2021-08-03 14:27:20'),
(119, 'Hp', 'Tolonto', 'http://localhost:4000/file/1628003598930-Screen Shot 2021-07-06 at 20.39.50.png', 1, 2, 'tc', 10, '2021-08-03 15:13:18', '2021-08-03 15:13:18'),
(120, '', 'Tolonto', 'http://localhost:4000/file/1628005852823-Screen Shot 2021-06-29 at 00.21.06.png', 0, 2, 'as', 0, '2021-08-03 15:50:52', '2021-08-03 15:50:52'),
(121, '', 'Tolonto', 'http://localhost:4000/file/1628005920168-Screen Shot 2021-06-29 at 00.21.06.png', 0, 2, 'as', 0, '2021-08-03 15:52:00', '2021-08-03 15:52:00'),
(122, '', 'Tolonto', 'http://localhost:4000/file/1628005943980-Screen Shot 2021-06-29 at 00.21.06.png', 0, 2, 'as', 0, '2021-08-03 15:52:23', '2021-08-03 15:52:23'),
(123, '', 'Tolonto', 'http://localhost:4000/file/1628005991436-Screen Shot 2021-06-29 at 00.20.15.png', 0, 2, '', 0, '2021-08-03 15:53:11', '2021-08-03 15:53:11'),
(124, '', 'Tolonto', 'http://localhost:4000/file/1628006054140-Screen Shot 2021-06-29 at 00.20.15.png', 0, 2, '', 0, '2021-08-03 15:54:14', '2021-08-03 15:54:14'),
(125, '', 'Tolonto', 'http://localhost:4000/file/1628006083483-Screen Shot 2021-06-29 at 00.20.15.png', 0, 2, '', 0, '2021-08-03 15:54:43', '2021-08-03 15:54:43'),
(126, '', 'Tolonto', 'http://localhost:4000/file/1628006158984-Screen Shot 2021-06-29 at 00.20.15.png', 0, 2, '', 0, '2021-08-03 15:55:58', '2021-08-03 15:55:58'),
(127, 'Test update', 'Tolonto', 'http://localhost:4000/file/1628016436471-24399405a6e4c74e8ac4ac4c1f91b5bd.jpeg', 10, 2, 'anas', 100, '2021-08-03 15:57:17', '2021-08-03 19:03:49'),
(128, '', 'Tolonto', 'http://localhost:4000/file/1628006276276-Screen Shot 2021-06-29 at 00.20.15.png', 0, 2, '', 0, '2021-08-03 15:57:56', '2021-08-03 15:57:56'),
(129, '', 'Tolonto', 'http://localhost:4000/file/1628006289992-Screen Shot 2021-06-29 at 00.20.15.png', 0, 2, '', 0, '2021-08-03 15:58:09', '2021-08-03 15:58:09'),
(130, '', 'Tolonto', 'http://localhost:4000/file/1628006353694-Screen Shot 2021-06-29 at 00.20.15.png', 0, 2, '', 0, '2021-08-03 15:59:13', '2021-08-03 15:59:13'),
(131, 'Baju Hitam', 'undefined', 'http://localhost:4000/file/1628174468875-8a33ed7b4004a3497e41d1bc06650595.jpeg', 20, 2, 'Baju Hitam polosasd', 100, '2021-08-05 03:45:05', '2021-08-05 14:43:17'),
(133, 'Tes', 'Canc', 'http://localhost:4000/file/1628174571156-8a33ed7b4004a3497e41d1bc06650595.jpeg', 10, 2, 'as', 10, '2021-08-05 14:42:51', '2021-08-05 14:42:51'),
(134, 'tes name', 'tes brand', 'http://localhost:4000/file/1629299003578-Screen Shot 2021-06-29 at 00.21.22.png', 100, 2, 'tes description', 200000, '2021-08-17 06:28:57', '2021-08-18 15:03:23');

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `id` varchar(128) NOT NULL,
  `store_name` varchar(255) NOT NULL,
  `user_id` varchar(128) NOT NULL,
  `store_description` text DEFAULT NULL,
  `status` enum('available','deleted') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`id`, `store_name`, `user_id`, `store_description`, `status`) VALUES
('4e69c8aa-012c-4e32-8540-ad798627fbdd', '1212', 'bede6bf5-b738-4a90-8b1e-ccd01b62d538', NULL, NULL),
('727e587f-ad71-4f08-8f1a-57ae94115eaf', 'Coro Olshop', '47722de1-9c35-4fe2-9a81-c7227c4c6714', NULL, NULL),
('73cf660f-e336-404e-b259-c619cab28600', '12', '97b7e630-bb0a-4b06-86cd-050e736d499a', NULL, NULL),
('7bb68bf7-2aec-4411-b855-114dd0750c8b', 'Tolonto', '0ccea015-07af-4f3a-8458-c3c3bf0aa74c', NULL, NULL),
('a2c9d935-5f05-4ce6-8c35-0cea4a192cd6', 'Cok', '006abd56-1a56-45ff-9a4e-6e272e77ac58', NULL, NULL),
('d95555e8-016a-4efb-b3ff-8683a9bb6413', 'Canc', '8838dfcd-c4bc-401e-959b-7872a7c68faa', NULL, NULL),
('e0b11989-2c20-4ac6-a261-f735fdb8050a', 'yaelahlan', '94d9ad97-f449-4d76-b50e-3aa88f153918', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(128) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `roles` enum('custommer','seller') DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `gender` enum('female','male') DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `status` enum('inactive','active','deleted') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `roles`, `password`, `avatar`, `phone_number`, `gender`, `date_of_birth`, `status`) VALUES
('006abd56-1a56-45ff-9a4e-6e272e77ac58', 'tobi', 'eyokajoo@gmail.com', 'seller', '$2a$10$itGpkdnhDeZsksbpMGfS8uNY1MhQHaBKvFGRmKKFerNo7b/OjcwiS', NULL, '0895324453509', NULL, NULL, 'inactive'),
('0ccea015-07af-4f3a-8458-c3c3bf0aa74c', 'Tes ss', 'emhaarifin02@gmail.com', 'seller', '$2a$10$/XBezjkMPenfNuRMhgg7DO0bKPw.a7ZIrB2C9/8Ft2Zp7RbB3oLbe', NULL, '1230123', 'male', '2021-08-04', 'inactive'),
('35068394-a333-431f-bb36-1c4ab1fb9fbd', '', '', 'custommer', '$2a$10$aLRcNSeJTJoi/58AogU9u.QhxgSplxiXrxxeM3l1NgQcLsfS/rOMy', NULL, NULL, NULL, NULL, 'inactive'),
('417e9342-325b-4269-a1fe-a1de1f758491', 'Muhammad', '101muhammadarifin@gmail.com', 'seller', '$2a$10$ppSY3N/d0Zwz7lynbOeOq.3DaNXy.utHz5KPhLd1fL4oLjz5z4e32', NULL, '0895324453509', NULL, NULL, 'active'),
('47722de1-9c35-4fe2-9a81-c7227c4c6714', 'Arifin', 'kawulaarifin@gmail.com', 'seller', '$2a$10$v/atACex5YWVAgW1/FHH3.n12yLpYk0vr6hZtviep0kczKFMe8n.C', NULL, '0895324453509', NULL, NULL, 'inactive'),
('7fec52da-a082-4358-af65-ee7074870d70', 'kin', '123', 'seller', '$2a$10$e0c.C9dusR1eP2OJThSkUOIDuZKIPonsnp6J2Eu9Z8np0nL7alalu', NULL, '12', NULL, NULL, 'inactive'),
('8838dfcd-c4bc-401e-959b-7872a7c68faa', 'Arifin', 'badkrmaa@gmail.com', 'seller', '$2a$10$W7fuGuBREj5IhgfCpKmITu2REc0wDLDY4mxthj5KiuM030/LvjvOW', NULL, '0892123123123', NULL, NULL, 'active'),
('8ab734af-8521-45a1-a001-cdb05067e31c', 'kmasd', 'qeqwkd', 'custommer', '$2a$10$NvHKGjiig1iY698rEDEJKe659WdPCD0p9IwO8FVzFE6Q3.zR3IqOy', NULL, NULL, NULL, NULL, 'inactive'),
('8e853fec-97fa-4197-ad43-f9b44694668c', 'Cek', 'armisja.404@gmail.com', 'seller', '$2a$10$UN.zZKY2d5SPf5EDHcb3Xu3o3tmS6u3OMFvnAFt0ZmoS2FndkrIjm', NULL, '08912344455', NULL, NULL, 'inactive'),
('8eda228b-bf8d-45c1-8f92-a9bb30d59d72', '123', '124314', 'custommer', '$2a$10$SfPfPUcOvO.sKLUaYrvX8O/1AUk8x3DtzgzP266lJ/W6gcH/7Z1Qu', NULL, NULL, NULL, NULL, 'inactive'),
('94d9ad97-f449-4d76-b50e-3aa88f153918', 'Alan Nugraha', 'yaelahlan@gmail.com', 'seller', '$2a$10$v1ygrZp.snV899liFCi9.u6McSWpP6OIabKIF9AjBDhHuX7lb3Bqi', NULL, '085816663571', NULL, NULL, 'inactive'),
('97b7e630-bb0a-4b06-86cd-050e736d499a', '12e', 'qwe', 'seller', '$2a$10$2sxE4PvAT3zSLcVftcDXI.g19dUNYfp1oCL6HcbSjtfh6Hj.cMxmO', NULL, '12', NULL, NULL, 'inactive'),
('9ad47234-e7a1-4fe9-bf2d-b60fc0ce809d', 'asd', 'asda@gmail.com', 'custommer', '$2a$10$YNzPBB2zkRi9eR/3vkl4EOf8ya9jSF7xlVu72qH40JRFebOW/dG06', NULL, NULL, NULL, NULL, 'inactive'),
('a5f635ef-ded1-4686-a5b5-b94b44145b7b', '12', '7gs7s7', 'custommer', '$2a$10$dBJOE6cE4wHcCRD5B1E8SOZiAX8lkC2a4ROHUxdVo6Fj8u9gbIXAW', NULL, NULL, NULL, NULL, 'inactive'),
('bede6bf5-b738-4a90-8b1e-ccd01b62d538', 'we', 'qee', 'seller', '$2a$10$FboHDOAIeqcPteVq9KhXBeGJGoYdsG5yOcQJEfyHAjuuqV9Ko87Za', NULL, '', NULL, NULL, 'inactive'),
('edcf7c5a-dcfd-48e5-84aa-31d037d76ce6', '132123', '123123123', 'custommer', '$2a$10$fVI3iRgdMKeomlyHz6WiXuw3db1OnrpiiZMBxWmb0o761LFul1ycy', NULL, NULL, NULL, NULL, 'inactive');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_seller`
--
ALTER TABLE `order_seller`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `FK_myKey` (`brand`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `store_name` (`store_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `order_seller`
--
ALTER TABLE `order_seller`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_seller`
--
ALTER TABLE `order_seller`
  ADD CONSTRAINT `order_seller_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `order_seller_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `stores`
--
ALTER TABLE `stores`
  ADD CONSTRAINT `stores_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
