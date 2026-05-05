# 3rd Party API (Image Uploader)

## What is 3rd Party API?
Simplenya, 3rd Party API adalah API yang dibuat oleh pihak ketiga yang bisa kita gunakan untuk mempermudah development aplikasi kita. Biasanya 3rd Party API dibagi menjadi 2 tipe yaitu:
1. Open API : API yang bisa kita gunakan secara bebas tanpa perlu registrasi atau autentikasi. Contohnya adalah [PokeAPI](https://pokeapi.co/). PokeAPI adalah API yang menyediakan data tentang Pokemon yang bisa kita gunakan untuk belajar atau membuat aplikasi tentang Pokemon.
2. Private API : API yang memerlukan registrasi dan autentikasi untuk bisa menggunakannya. Contohnya adalah [ImageKit](https://imagekit.io/). ImageKit adalah cloud storage yang menyediakan layanan upload, storage, dan delivery image yang bisa kita gunakan untuk menyimpan image yang diupload oleh user.

## How to use?
### /pokemon
1. Pada endpoint `/pokemon` aplikasi kita akan menghasilkan data pokemon, tetapi untuk mengumpulkan data pokemon memakan waktu, sehingga kita perlu bantuan `PokeAPI` untuk mendapatkan data pokemon. Untuk mendapatkan data pokemon dari `PokeAPI`, kita bisa menggunakan library [axios](https://axios-http.com/docs/intro) untuk melakukan request ke `PokeAPI` dan mendapatkan data pokemon.
2. Dengan menggunakan `axios`, kita bisa melakukan http request ke `PokeAPI` dan mendapatkan data pokemon dalam format JSON.

### /upload
1. Pada endpoint `/upload` aplikasi kita akan menerima file image dari user dan menyimpannya ke cloud storage. Untuk menyimpan file image ke cloud storage, kita bisa menggunakan layanan [ImageKit](https://imagekit.io).
2. Agar endpoint `/upload` bisa menerima file image dari input user, kita perlu menggunakan middleware [multer](https://www.npmjs.com/package/multer), fokus ke bagian usage & memoryStorage. Dengan menggunakan multer memoryStorage, kita bisa menyimpan file image yang diupload oleh user menjadi sebuah string buffer. Hal ini mempermudah kita  mengupload file image ke `ImageKit` tanpa perlu menyimpannya di server kita.
3. Setelah mendapatkan file image dari user, kita bisa mengupload file image tersebut ke `ImageKit`. Lakukan setup imagekit dulu dengan menginstall [imagekit-nodejs](https://github.com/imagekit-developer/imagekit-nodejs) lalu mengisi `privateKey` yang didapatkan dari dashboard `ImageKit`.
4. Gunakan method `upload` dengan menggunakan buffer dari `imagekit` untuk mengupload file image ke `ImageKit` (Search buffer di dokumentasi imagekit). Method `upload` menerima 2 parameter yaitu file image dalam bentuk string buffer dan nama file image yang akan disimpan di `ImageKit`.
5. Setelah file image berhasil diupload ke `ImageKit`, kita akan mendapatkan response dari `ImageKit` yang berisi informasi tentang file image yang diupload seperti `url`, `name`, dll. Kita bisa mengirimkan response tersebut ke user sebagai response dari endpoint `/upload`.