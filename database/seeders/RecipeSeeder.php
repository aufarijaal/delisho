<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $recipes = [
            [
                'id' => 1,
                'user_id' => 11,
                'category_id' => fake()->numberBetween(1, 18),
                'final_image' => 'sambal-goreng-kentang.webp',
                'title' => 'Sambal Goreng Kentang',
                'slug' => 'sambal-goreng-kentang-' . \Illuminate\Support\Str::random(10),
                'description' => 'Balado yang ga pedes cuma pake cabe keriting aja , tapi tetep enak.',
                'portion' => '4',
                'cooking_time' => '1 Jam',
                'created_at' => now(),
                'updated_at' => now(),
                'ingredients' => json_encode([
                    [
                        'id' => 1,
                        'value' => '4 buah kentang sedang',
                    ],
                    [
                        'id' => 2,
                        'value' => '1 buah tomat',
                    ],
                    [
                        'id' => 3,
                        'value' => '4 siung bawang merah',
                    ],
                    [
                        'id' => 4,
                        'value' => '3 siung bawang putih',
                    ],
                    [
                        'id' => 5,
                        'value' => '5 buah cabe keriting',
                    ],
                    [
                        'id' => 6,
                        'value' => '1 butir kemiri',
                    ],
                    [
                        'id' => 7,
                        'value' => '1 sdt garam',
                    ],
                    [
                        'id' => 8,
                        'value' => 'Gula jawa secukupnya',
                    ],
                    [
                        'id' => 9,
                        'value' => 'Lada bubuk sejumput',
                    ],
                    [
                        'id' => 10,
                        'value' => '2 sdm kecap manis',
                    ],
                    [
                        'id' => 11,
                        'value' => '1 sdt kaldu sapi',
                    ],
                ]),
                'steps' => json_encode([
                    [
                        'id' => 1,
                        'value' => 'Potong kentang kotak kotak kecil',
                        'image' => null
                    ],
                    [
                        'id' => 2,
                        'value' => 'Goreng kentang sampai kekuningan',
                        'image' => null
                    ],
                    [
                        'id' => 3,
                        'value' => 'Haluskan bumbu bumbu kasarnya',
                        'image' => null
                    ],
                    [
                        'id' => 4,
                        'value' => 'Tumis bumbunya, tambahkan garam,lada kaldu sapi dan sedikit air.',
                        'image' => null
                    ],
                    [
                        'id' => 5,
                        'value' => 'Tambahkan kecap manis sedikit, atau menyesaikan',
                        'image' => null
                    ],
                    [
                        'id' => 6,
                        'value' => 'Sajikan jika sudah matang seperti ini.',
                        'image' => null
                    ],
                ]),
            ],
            [
                'id' => 2,
                'user_id' => 11,
                'category_id' => fake()->numberBetween(1, 18),
                'final_image' => 'semur-jengkol.webp',
                'title' => 'Semur Jengkol',
                'slug' => 'semur-jengkol-' . \Illuminate\Support\Str::random(10),
                'description' => 'Tiap hamil ngidam jengkol..sampe sekarang hamil yg ketiga juga teteup ngidam jengkol..cuss langsung belanja ke tukang sayur..',
                'portion' => '4',
                'cooking_time' => '+-1 Jam',
                'created_at' => now(),
                'updated_at' => now(),
                'ingredients' => json_encode([
                    [
                        'id' => 1,
                        'value' => '1/2 kg jengkol',
                    ],
                    [
                        'id' => 2,
                        'value' => '8 siung bawang putih',
                    ],
                    [
                        'id' => 3,
                        'value' => '6 siung bawang merah',
                    ],
                    [
                        'id' => 4,
                        'value' => '2 butir kemiri(utuh) kalau yang bagi 2 berarti 4 butir',
                    ],
                    [
                        'id' => 5,
                        'value' => 'Cabe merah (sesuai selera) kalau saya ganti pakai finna sambel serbaguna sachet pakai setengah',
                    ],
                    [
                        'id' => 6,
                        'value' => 'Garam',
                    ],
                    [
                        'id' => 7,
                        'value' => 'Gula pasir',
                    ],
                    [
                        'id' => 8,
                        'value' => 'Merica(ladaku)',
                    ],
                    [
                        'id' => 9,
                        'value' => 'Kecap manis',
                    ],
                    [
                        'id' => 10,
                        'value' => 'Penyedap',
                    ],
                    [
                        'id' => 11,
                        'value' => '2 lembar Daun salam',
                    ],
                    [
                        'id' => 12,
                        'value' => '1 ruas jari lengkuas (geprek)',
                    ],
                    [
                        'id' => 13,
                        'value' => '1 batang sereh (geprek)',
                    ],
                    [
                        'id' => 14,
                        'value' => '1 bungkus santan kara',
                    ],
                    [
                        'id' => 15,
                        'value' => 'Minyak goreng',
                    ],
                ]),
                'steps' => json_encode([
                    ['id' => 1, 'value' => 'Cuci jengkol sekali saja (tidak perlu dikupas)', 'image' => null],
                    ['id' => 2, 'value' => 'Didihkan air dan 3 lembar daun salam', 'image' => null],
                    ['id' => 3, 'value' => 'Masukan jengkol yang sudah dicuci kedalam air rebusan yang sudah mendidih ± 30 menit', 'image' => null],
                    ['id' => 4, 'value' => 'Setelah ± 30 menit tiriskan dan geprek jengkol untuk membuat lebih empuk', 'image' => null],
                    ['id' => 5, 'value' => 'Setelah itu blender bumbu tambahkan minyak goreng untuk mempermudah proses blender (kecuali salam,sereh dan lengkuas)', 'image' => null],
                    ['id' => 6, 'value' => 'Tumis bumbu hingga harum masukkan jengkol tumis sebentar lalu tambahkan air ± 400 ml', 'image' => null],
                    ['id' => 7, 'value' => 'Masak hingga mendidih, lalu bumbui dengan garam,gula,penyedap,merica,kecap', 'image' => null],
                    ['id' => 8, 'value' => 'Setelah beberapa menit masukkan santan dan koreksi rasa,bisa ditambahkan bumbu', 'image' => null],
                    ['id' => 9, 'value' => 'Tunggu sekitar 10 menit dan jengkol pun sudah bisa diangkat dan disajikan', 'image' => null],
                ]),
            ],
            [
                'id' => 3,
                'user_id' => 11,
                'category_id' => fake()->numberBetween(1, 18),
                'final_image' => 'potato-cheese-stik.webp',
                'title' => 'Potato cheese stik',
                'slug' => 'potato-cheese-stik-' . \Illuminate\Support\Str::random(10),
                'description' => 'Qui placeat molestias non impedit maxime quo reiciendis. Quia nisi delectus eius dignissimos voluptatibus sit quia. Ex ex quas sit aut dolorum voluptatem aut.',
                'portion' => '+-4 potong',
                'cooking_time' => '+-1 Jam',
                'created_at' => now(),
                'updated_at' => now(),
                'ingredients' => json_encode([
                    ['id' => 1, 'value' => '250 gr kentang (kupas lalu cuci bersih)'],
                    ['id' => 2, 'value' => '4 sendok makan maizena (saya pake merk maizenaku)'],
                    ['id' => 3, 'value' => 'Keju parut sesuai selera (kalo saya 1/2ons merk winchiz)'],
                    ['id' => 4, 'value' => '2 sdm mentega'],
                    ['id' => 5, 'value' => 'Bumbu tabur selera anda (kalo saya pake merk antaka rasa pizza)'],
                    ['id' => 6, 'value' => 'Minyak untuk menggoreng (secukupnya)'],
                ]),
                'steps' => json_encode([
                    ['id' => 1, 'image' => null, 'value' => 'Kukus kentang yang sudah dikupas dan dicuci bersih kira kira 1/2jam'],
                    ['id' => 2, 'image' => null, 'value' => 'Haluskan kentang yang sudah dikukus'],
                    ['id' => 3, 'image' => null, 'value' => 'Campur semua bahan (kentang,maizena,keju,mentega)'],
                    ['id' => 4, 'image' => null, 'value' => 'Uleni hingga merata dan dirasa cukup bisa dibentuk'],
                    ['id' => 5, 'image' => null, 'value' => 'Lalu bentuk adonan memanjang (seperti nugget stik)'],
                    ['id' => 6, 'image' => null, 'value' => 'Goreng dengan api sedang hingga warna kuning keemasan'],
                    ['id' => 7, 'image' => null, 'value' => 'Angkat dan tiriskan..lalu taburi dengan bumbu selera anda..selesai.'],
                ]),
            ],
            [
                'id' => 4,
                'user_id' => 11,
                'category_id' => fake()->numberBetween(1, 18),
                'final_image' => 'sayur-labu-siam-santan.webp',
                'title' => 'Sayur labu siam santan',
                'slug' => 'sayur-labu-siam-santan-' . \Illuminate\Support\Str::random(10),
                'description' => 'Accusantium labore id labore qui nostrum voluptatem quia et. Consectetur rerum cumque molestiae voluptas eligendi iure itaque reprehenderit odio. Molestiae magni nisi. Rerum laboriosam quia dolore.',
                'portion' => '+-4 potong',
                'cooking_time' => '+-1 Jam',
                'created_at' => now(),
                'updated_at' => now(),
                'ingredients' => json_encode([
                    ['id' => 1, 'value' => '250 gr kentang (kupas lalu cuci bersih)'],
                    ['id' => 2, 'value' => '4 sendok makan maizena (saya pake merk maizenaku)'],
                    ['id' => 3, 'value' => 'Keju parut sesuai selera (kalo saya 1/2ons merk winchiz)'],
                    ['id' => 4, 'value' => '2 sdm mentega'],
                    ['id' => 5, 'value' => 'Bumbu tabur selera anda (kalo saya pake merk antaka rasa pizza)'],
                    ['id' => 6, 'value' => 'Minyak untuk menggoreng (secukupnya)'],
                ]),
                'steps' => json_encode([
                    ['id' => 1, 'image' => null, 'value' => 'Kukus kentang yang sudah dikupas dan dicuci bersih kira kira 1/2jam'],
                    ['id' => 2, 'image' => null, 'value' => 'Haluskan kentang yang sudah dikukus'],
                    ['id' => 3, 'image' => null, 'value' => 'Campur semua bahan (kentang,maizena,keju,mentega)'],
                    ['id' => 4, 'image' => null, 'value' => 'Uleni hingga merata dan dirasa cukup bisa dibentuk'],
                    ['id' => 5, 'image' => null, 'value' => 'Lalu bentuk adonan memanjang (seperti nugget stik)'],
                    ['id' => 6, 'image' => null, 'value' => 'Goreng dengan api sedang hingga warna kuning keemasan'],
                    ['id' => 7, 'image' => null, 'value' => 'Angkat dan tiriskan..lalu taburi dengan bumbu selera anda..selesai.'],
                ]),
            ],
            [
                'id' => 5,
                'user_id' => 11,
                'category_id' => fake()->numberBetween(1, 18),
                'final_image' => 'sop-bakso-tahu.webp',
                'title' => 'Sop bakso tahu',
                'slug' => 'sop-bakso-tahu-' . \Illuminate\Support\Str::random(10),
                'description' => 'Accusantium labore id labore qui nostrum voluptatem quia et. Consectetur rerum cumque molestiae voluptas eligendi iure itaque reprehenderit odio. Molestiae magni nisi. Rerum laboriosam quia dolore.',
                'portion' => '2 mangkuk',
                'cooking_time' => '30 menit',
                'created_at' => now(),
                'updated_at' => now(),
                'ingredients' => json_encode([
                    ['id' => 1, 'value' => '15 buah bakso sapi'],
                    ['id' => 2, 'value' => '8 kotak kecil tahu putih'],
                    ['id' => 3, 'value' => '1 buah wortel, iris tipis'],
                    ['id' => 4, 'value' => '2 batang daun bawang, iris'],
                    ['id' => 5, 'value' => '1 batang seledri, iris'],
                    ['id' => 6, 'value' => '3 siung bawang putih, 2 siung bawang merah, haluskan'],
                    ['id' => 7, 'value' => 'Secukupnya garam, kaldu bubuk, gula pasir, lada bubuk'],
                    ['id' => 8, 'value' => 'Secukupnya air'],
                ]),
                'steps' => json_encode([
                    ['id' => 1, 'image' => null, 'value' => 'Tumis bawang merah dan bawang putih yang sudah dihaluskan. Tumis hingga harum.'],
                    ['id' => 2, 'image' => null, 'value' => 'Tuangkan air secukupnya. Masukkan irisan wortel. Masukkan tahu.'],
                    ['id' => 3, 'image' => null, 'value' => 'Bumbui dengan garam, kaldu bubuk, gula pasir dan lada bubuk secukupnya, menyesuaikan selera.'],
                    ['id' => 4, 'image' => null, 'value' => 'Masukkan bakso, masak sampai bumbu meresap. Terakhir masukkan irisan daun bawang dan seledri. Lalu angkat.'],
                    ['id' => 5, 'image' => null, 'value' => 'Sajikan selagi hangat.'],
                ]),
            ],
        ];

        \App\Models\Recipe::insert($recipes);
    }
}
