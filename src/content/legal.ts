export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalDoc {
  id: 'privacy' | 'terms' | 'cookies';
  label: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const CONTACT_EMAIL = 'rakaaa.p96@gmail.com';
const CONTACT_PHONE = '+62 878-2326-8333';

export const LEGAL_CONTACT = { email: CONTACT_EMAIL, phone: CONTACT_PHONE };

export const LEGAL_DOCS: LegalDoc[] = [
  {
    id: 'privacy',
    label: 'Privacy Policy',
    title: 'Kebijakan Privasi',
    updated: '2 Oktober 2026',
    intro: 'Kebijakan ini menjelaskan data pribadi yang dikumpulkan oleh situs ini, dan bagaimana Anda mengendalikannya. Situs ini adalah portofolio statis tanpa akun dan tanpa pelacakan iklan.',
    sections: [
      {
        heading: 'Data yang Kami Kumpulkan',
        body: [
          'Kami hanya mengumpulkan data yang Anda kirim sendiri melalui formulir kontak.',
          'Data itu meliputi nama Anda, alamat email, subjek pesan, dan isi pesan. Kami tidak meminta nomor identitas, data kesehatan, atau data keuangan.',
        ],
      },
      {
        heading: 'Untuk Apa Data Dipakai',
        body: [
          'Data formulir kontak hanya dipakai untuk membalas pertanyaan dan permintaan penawaran Anda.',
          'Kami tidak menjual dan tidak menyewakan data Anda kepada pihak ketiga untuk keperluan pemasaran.',
        ],
      },
      {
        heading: 'Pemrosesan oleh Pihak Ketiga',
        body: [
          'Formulir kontak diteruskan melalui layanan Web3Forms di web3forms.com. Penyedia layanan ini memproses formulir di server yang berada di Amerika Serikat, sehingga data Anda keluar dari wilayah Indonesia.',
          'Situs ini di-host di Vercel. Setiap permintaan ke situs ini juga tercatat sebagai log teknis di server Vercel, misalnya alamat IP dan jenis peramban.',
        ],
      },
      {
        heading: 'Font dari Google',
        body: [
          'Font pada situs ini dimuat dari Google Fonts. Saat peramban meminta berkas font, alamat IP Anda terlihat oleh Google.',
          'Ini adalah permintaan jaringan ke pihak ketiga, bukan cookie. Ini tidak dapat dihindari tanpa menyimpan font di server sendiri.',
        ],
      },
      {
        heading: 'Hak Anda',
        body: [
          'Berdasarkan UU Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi, Anda berhak meminta akses atas data Anda, meminta perbaikan data yang tidak akurat, meminta penghapusan, dan menarik persetujuan yang pernah diberikan.',
          'Permintaan dapat diajukan ke ' + CONTACT_EMAIL + '. Kami merespons dalam batas waktu yang wajar, paling lama 14 hari kerja.',
          'Anda juga berhak mengajukan keluhan kepada Kementerian Komunikasi dan Digital, atau kepada otoritas pelindungan data yang berwenang di tempat Anda tinggal.',
        ],
      },
      {
        heading: 'Keamanan',
        body: [
          'Seluruh lalu lintas dienkripsi dengan HTTPS.',
          'Karena sifat portofolio statis ini, data yang Anda kirim hanya disimpan di kotak email Raka Pranata dan tidak masuk ke dalam basis data aplikasi.',
        ],
      },
      {
        heading: 'Perubahan Kebijakan',
        body: [
          'Kebijakan ini dapat diperbarui. Tanggal pembaruan tertera di bagian atas dokumen ini.',
        ],
      },
    ],
  },
  {
    id: 'terms',
    label: 'Terms of Service',
    title: 'Ketentuan Layanan',
    updated: '2 Oktober 2026',
    intro: 'Ketentuan ini mengatur penggunaan situs ini dan hubungan Anda dengan Raka Pranata sebagai penyedia jasa pembuatan website.',
    sections: [
      {
        heading: 'Tentang Situs Ini',
        body: [
          'Situs ini adalah portofolio sekaligus halaman promosi jasa pembuatan website, company profile, landing page, dan desain antarmuka.',
          'Situs ini dikelola oleh Raka Pranata, beralamat di Bogor, Jawa Barat, Indonesia.',
        ],
      },
      {
        heading: 'Harga dan Ruang Lingkup',
        body: [
          'Harga yang tercantum pada situs ini bersifat indikatif dan dapat berubah sewaktu-waktu.',
          'Rentang harga, cakupan pekerjaan, dan jadwal proyek disepakati secara tertulis melalui proposal atau perjanjian terpisah, sebelum pekerjaan dimulai.',
          'Informasi di luar proposal resmi tidak mengikat sebagai jaminan harga maupun jaminan lingkup pekerjaan.',
        ],
      },
      {
        heading: 'Hak Kekayaan Intelektual',
        body: [
          'Seluruh desain, kode, dan teks di dalam situs ini merupakan milik Raka Pranata. Pengecualiannya adalah konten milik pihak ketiga, seperti nama font dan pustaka ikon.',
          'Setelah proyek selesai, hak atas kode yang dibuat khusus untuk klien berpindah kepada klien sesuai ketentuan perjanjian, setelah seluruh pembayaran lunas.',
        ],
      },
      {
        heading: 'Ketentuan Penggunaan',
        body: [
          'Anda diperbolehkan membuka dan membagikan halaman ini untuk keperluan pribadi.',
          'Dilarang menyalin, memplagiat, atau menyamar menjadi identitas layanan Raka Pranata tanpa izin tertulis.',
        ],
      },
      {
        heading: 'Batasan Tanggung Jawab',
        body: [
          'Situs ini disediakan apa adanya.',
          'Sejauh diizinkan oleh hukum yang berlaku, Raka Pranata tidak bertanggung jawab atas kerugian tidak langsung, kehilangan data, atau dampak bisnis yang timbul karena penggunaan situs ini.',
          'Tidak ada bagian dari ketentuan ini yang membatasi hak konsumen yang tidak boleh dibatasi oleh hukum Indonesia.',
        ],
      },
      {
        heading: 'Hukum yang Berlaku',
        body: [
          'Ketentuan ini tunduk pada hukum Republik Indonesia.',
          'Setiap sengketa diselesaikan melalui musyawarah terlebih dahulu. Apabila tidak tercapai kesepakatan, sengketa diselesaikan melalui pengadilan negeri yang berwenang di wilayah tempat tinggal Raka Pranata.',
        ],
      },
    ],
  },
  {
    id: 'cookies',
    label: 'Cookies',
    title: 'Kebijakan Cookie',
    updated: '2 Oktober 2026',
    intro: 'Ringkasnya begini: situs ini tidak memakai cookie apa pun.',
    sections: [
      {
        heading: 'Fakta tentang Cookie',
        body: [
          'Situs ini tidak menyimpan cookie, tidak menulis ke localStorage atau sessionStorage, dan tidak memakai cookie pihak ketiga.',
          'Karena tidak ada yang dikumpulkan, Anda tidak perlu memberikan persetujuan cookie apa pun.',
          'Analytics Google pernah terpasang, namun sudah dihapus pada Oktober 2026 karena membebani waktu muat halaman. Cookie iklan tidak pernah ada di situs ini.',
        ],
      },
      {
        heading: 'Apa Itu Cookie',
        body: [
          'Cookie adalah berkas kecil yang disimpan peramban Anda ketika membuka sebuah situs, supaya situs dapat mengingat preferensi atau melacak perilaku pengunjung.',
          'Kebijakan ini menjelaskan kondisi yang berlaku pada situs ini, bukan penjelasan umum mengenai teknologi cookie.',
        ],
      },
      {
        heading: 'Penyimpanan di Sisi Peramban',
        body: [
          'Selain cookie, sebagian situs menyimpan data di localStorage atau sessionStorage. Situs ini tidak memakai keduanya.',
          'Membuka halaman dalam mode privat tidak membuat perbedaan, karena memang tidak ada yang perlu disimpan.',
        ],
      },
      {
        heading: 'Font Eksternal',
        body: [
          'Font dimuat dari Google Fonts, sehingga alamat IP Anda terlihat oleh Google ketika font tersebut diminta.',
          'Ini adalah permintaan jaringan ke pihak ketiga, bukan cookie. Font sudah dimuat dengan cara non-blocking agar tidak memperlambat halaman.',
        ],
      },
      {
        heading: 'Perubahan',
        body: [
          'Apabila cookie atau sistem pelacak ditambahkan di masa depan, kebijakan ini akan diperbarui dan persetujuan yang sesuai akan diminta.',
        ],
      },
    ],
  },
];