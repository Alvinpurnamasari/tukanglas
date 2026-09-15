"use client";

import { FormEvent, useState } from "react";
import {
  Calculator,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

const serviceOptions = [
    "Jasa Las Panggilan",
    "Pembuatan Kanopi",
    "Pagar Besi",
    "Teralis Jendela",
    "Railing Tangga dan Balkon",
    "Tangga Besi",
    "Pintu dan Gerbang Besi",
    "Konstruksi Baja",
    "Furniture Besi custom",
    "Las Stainless",
    "Servis dan Perbaiakan",
    "Pekerjaan Las Lainnya",
];

export default function EstimateForm() {
    const [error, setError] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const name = String(formData.get("name") || "").trim();
        const phone = String(formData.get("phone") || "").trim();
        const service = String(formData.get("service") || "").trim();
        const size = String(formData.get("size") || "").trim();
        const location = String(formData.get("location") || "").trim();
        const notes = String(formData.get("notes") || "").trim();

        if (!name || !phone || !service || !location) {
            setError(
                "Nama, nomor whatsApp, jenis layanan, dan lokasi wajib diisi."
            );
            return;
        }

        setError("");

        const message = `Halo TukangLas saya ingin meminta estimasi harga.
        Nama: ${name}
        Nomor WhatsApp: ${phone}
        Jenis layanan: ${service}
        Perkiraan ukuran: ${size || "-"}
        Lokasi: ${location}
        Catatan: ${notes || "-"}`;

        const whatsappUrl = `https://wa.me/6282227427004?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    }

    return (
        <section className="bg-[#0d1728] py-20 lg:py-28">
            <div className="mx-auto grid max-w-[1560px] items-center gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
                {/* Informasi*/}
                <div>
                    <span className="inline-flex rounded-full border border-[#ff671d]/40 bg-[#ff671d]/10 px-5 py-2 font-bold text-[#ff7a35">
                        Estimasi Pengerjaan 
                    </span>
                    <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                        Minta Estimasi Harga Jasa Las
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        Isi informasi kebutuhan anda. Setelah  formulir dikirim, WhatsApp akan terbuka dengan pesan yang sudah tersusun otomatis.
                    </p>

                    <div className="mt-8 space-y-5">
                        <CheckCircle2 className="mt-1 shrink-0text-[#ff671d]" size={24}/>
                        <div>
                            <h3 className="font-bold text-white">Knsultasi lebih mudah</h3>
                            <p className="mt-1 text-gray-400">
                                Sampaikan jenis pekerjaaan dan perkiraan ukuran
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <MapPin className="mt-1 shrink-0 text-[#ff671d]" size={24}/>
                        <div>
                            <h3 className="font-bold text-white">Cantumkan lokasi</h3>
                            <p className="mt-1 text-gray-400">
                                Lokasi diperlukan untuk memastikan jangkauan layanan.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <Phone className="mt-1 shrink-0 text-[#ff671d]" size={24}/>
                        <div>
                            <h3 className="font-bold text-white">
                                WhatsApp 0822-2742-7004
                            </h3>
                            <p className="mt-1 text-gray-400">
                                Admin akan menanggapi permintaan konsultasi anda.
                            </p>
                        </div>
                    </div>
                </div>
            

                {/* Form */}
                <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8 lg:p-10">
                    <div className="mb-7 flex items-center gap-4">
                        <span className="flex h-14 w-14 items-center justify-centerrounded-2xlbg-[#ff671d] text-white">
                            <Calculator size={29}/>
                        </span>
                        <div>
                            <h3 className="text-2xl font-extrabold text-[#0d1728]">
                                Form Permintaan Estimasi
                            </h3>
                            <p className="mt-1 text-gray-600">
                                Lengkapi informasi di bawah ini.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <label className="block">
                            <span className="mb-2 block font-bold text-[#0d1728]">
                                Nama <span className="text-red-500">*</span>
                            </span>
                            <input type="text" name="name"placeholder="Masukkan nama" className="w-full rounded-xl border border-gray-300 px-4 py-3.5 outline-none transition focus:border-[#ff671d] focus:ring-4 focus:ring-[#ff671d]/10"/>
                        </label>
                        
                        <label className="block">
                            <span className="mb-2 block font-bold text-[#0d1718]">
                                Nomor WhatsApp <span className="text-red-500">*</span>
                            </span>
                            <input type="tel" name="phone" placeholder="contoh:081234567890" className="w-full rounded-xl border border-gray-300 px-4 py-3.5 outline-none transition focus:border-[#ff671d] focus:ring-4 focus:ring-[#ff671d]/10"/>
                        </label>

                        <label className="block">
                            <span className="mb-2 block font-bold text-[#0d1728]">
                                Jenis Layanan <span className="text-red-500">*</span>
                            </span>
                            <select name="service" defaultValue="" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 outline-none transition focus:border-[#ff671d] focus:ring-4 focus:ring-[#ff671d]/10">
                                <option value="" disabled>
                                Pilih layanan
                                </option>

                                {serviceOptions.map((service) => (
                                <option key={service} value={service}>
                                    {service}
                                </option>
                                ))}
                            </select>
                        </label>

                        <label className="block">
                            <span className="mb-2 block font-bold text-[#0d1728]">
                                Perkiraan Ukuran
                            </span>
                            <input type="text" name="size" placeholder="Contoh: 3 × 5 meter" className="w-full rounded-xl border border-gray-300 px-4 py-3.5 outline-none transition focus:border-[#ff671d] focus:ring-4 focus:ring-[#ff671d]/10"/>
                        </label>

                        <label className="block sm:col-span-2">
                            <span className="mb-2 block font-bold text-[#0d1728]">
                                Lokasi Pengerjaan <span className="text-red-500">*</span>
                            </span>
                            <input type="text" name="location" placeholder="Memasukkan kecamatan, kota, atau alamat" className="w-full rounded-xl border border-gray-300 px-4 py-3.5 outline-none transition focus:border-[#ff671d] focus:ring-4 focus:ring-[#ff671d]/10"/>
                        </label>

                        <label className="block sm:col-span-2">
                            <span className="mb-2 block font-bold text-[#0d1728]">
                                Catatan Kebutuhan
                            </span>
                            <textarea name="notes"rows={4} placeholder="Jelaskan kebutuhan, desain, bahan, atau kondisi yang ingin diperbaiki" className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3.5 outline-none transition focus:border-[#ff671d] focus:ring-4 focus:ring-[#ff671d]/10" />
                        </label>
                    </div>

                    {error && (
                        <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 font-semibold text-red-600">
                            {error}
                        </p>
                    )}

                    <button type="submit" className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-[#25d366] px-6 py-4 text-lg font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#1fbd59]">
                        <MessageCircle size={24}/> KIrim Permintaan Via WhatsApp
                    </button>
                </form>
            </div>
        </section>
    
    );
}