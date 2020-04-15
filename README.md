# Lokakarya: Chatbot HR dan Masa Depan Manajemen Sumber Daya Manusia

## Tujuan

- Membuat 3 skill chatbot HR yaitu pengajuan cuti, pengajuan pengunduran diri dan pemberhentian kerja
- Memahami cara kerja chatbot dibalik layar

## Persiapan

- Daftar layanan Dialogflow menggunakan akun Google [https://dialogflow.cloud.google.com/#/login](https://dialogflow.cloud.google.com/#/login)
- Daftar sebagai Facebook developer [https://developers.facebook.com/](https://developers.facebook.com/)
- Membuat Apps Facebook untuk integrasi dengan Dialogflow [https://cloud.google.com/dialogflow/docs/integrations/facebook](https://cloud.google.com/dialogflow/docs/integrations/facebook)
- Install Ngrok [https://ngrok.com/download](https://ngrok.com/download)
- Install Code Editor VSCode [https://code.visualstudio.com/download](https://code.visualstudio.com/download) atau gunakan Code Editor apapun yang mendukung JavaScript / NodeJs
- Install Curl / Postman
- Clone repo ini

## Penggunaan

- Jalankan `npm install`
- Nyalakan local server `npm start`
- Nyalakan Ngrok `ngrok http 3000` ![Menyalakan Ngrok](.material/screenshot/ngrok_start.png)
- Pada halaman fulfillment di Dialogflow, arahkan Webhook URL ke `{https_url_dari_ngrok}/dialogflow` lalu tekan tombol 'Save' ![Memasang URL webhook](.material/screenshot/fulfillment_webhook_url.png)
- Buka browser lalu akses halaman [http://localhost:4040](http://localhost:4040) untuk melihat http request dan response yang datang melalui URL yang di *generate* oleh Ngrok
- Untuk setiap intent yang di aktifkan fulfillment nya, maka Dialogflow akan mengirimkan POST http request ke endpoint yang sudah diset di halaman Webhook ![Mengaktfikan Fulfillment pada intent](.material/screenshot/fulfillment_enable.png)
- Buka web Facebook messenger [https://messenger.com](https://messenger.com) untuk menguji integrasi chatbot
