'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import { apiService } from '../services/api';

export default function GuestBook() {
  const [formData, setFormData] = useState({
    nama: '',
    asalInstansi: '',
    pesan: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nama.trim() || !formData.asalInstansi.trim()) {
      toast.error('Mohon lengkapi semua field terlebih dahulu 📝');
      return;
    }

    setIsSubmitting(true);

    try {
      // Kirim data ke Backend API
      const response = await apiService.createUmum({
        nama: formData.nama.trim(),
        nama_instansi: formData.asalInstansi.trim(),
        pesan: formData.pesan.trim() || undefined
      });

      toast.success('Selamat datang! Data Anda telah tersimpan dengan baik');

      // Reset form
      setFormData({
        nama: '',
        asalInstansi: '',
        pesan: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      
      if (error instanceof Error) {
        toast.error(`Gagal menyimpan data: ${error.message}`);
      } else {
        toast.error('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Green Overlay untuk efek seperti TaniPintar */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/80 via-emerald-500/70 to-green-600/80"></div>
      </div>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4500,
          style: {
            background: '#ffffff',
            color: '#000000',
            border: '2px solid #e5e7eb',
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
            fontSize: '15px',
            fontWeight: '600',
          },
          success: {
            style: {
              background: '#f0fdf4',
              color: '#166534',
              border: '2px solid #10b981',
            },
          },
          error: {
            style: {
              background: '#fef2f2',
              color: '#000000',
              border: '2px solid #ef4444',
            },
          },
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-md mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "backOut" }}
              className="mb-6 sm:mb-8"
            >
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-20 h-20"
                >
                  <Image
                    src="/logo.png"
                    alt="Logo Buku Tamu Digital"
                    width={80}
                    height={80}
                    className="rounded-2xl shadow-lg bg-white/90 p-2"
                    priority
                  />
                </motion.div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-white drop-shadow-lg text-center">
                Buku Tamu
              </h1>
              <p className="text-base sm:text-lg mx-auto leading-relaxed text-white/90 font-medium drop-shadow-md text-center max-w-sm">
                Silakan isi informasi Anda untuk bergabung dengan kami hari ini
              </p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Background Card */}
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 transition-all duration-500 group-hover:shadow-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 rounded-3xl"></div>

            {/* Subtle floating elements */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary/10 rounded-full animate-pulse-soft"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-sage/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>

            {/* Form Content */}
            <div className="relative p-6 sm:p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
                {/* Nama Field */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="relative"
                >
                  <label htmlFor="nama" className="block text-sm font-bold mb-3 ml-1 text-black">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="nama"
                      name="nama"
                      value={formData.nama}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('nama')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-5 py-4 text-base border-2 rounded-2xl transition-all duration-300 bg-white text-gray-700 placeholder-gray-600 font-medium ${focusedField === 'nama'
                          ? 'border-green-500'
                          : 'border-green-300 hover:border-green-400'
                        }`}
                      placeholder="Tulis nama lengkap Anda"
                      required
                    />
                    {focusedField === 'nama' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-2 -top-2 w-4 h-4 bg-green-500 rounded-full"
                      />
                    )}
                  </div>
                </motion.div>

                {/* Asal Instansi Field */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="relative"
                >
                  <label htmlFor="asalInstansi" className="block text-sm font-bold mb-3 ml-1 text-black">
                    Asal Instansi
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="asalInstansi"
                      name="asalInstansi"
                      value={formData.asalInstansi}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('asalInstansi')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-5 py-4 text-base border-2 rounded-2xl transition-all duration-300 bg-white text-gray-700 placeholder-gray-600 font-medium ${focusedField === 'asalInstansi'
                          ? 'border-green-500'
                          : 'border-green-300 hover:border-green-400'
                        }`}
                      placeholder="Nama perusahaan atau institusi"
                      required
                    />
                    {focusedField === 'asalInstansi' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-2 -top-2 w-4 h-4 bg-green-500 rounded-full"
                      />
                    )}
                  </div>
                </motion.div>

                {/* Pesan Field */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="relative"
                >
                  <label htmlFor="pesan" className="block text-sm font-bold mb-3 ml-1 text-black">
                    Pesan (Opsional)
                  </label>
                  <div className="relative">
                    <textarea
                      id="pesan"
                      name="pesan"
                      value={formData.pesan}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('pesan')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-5 py-4 text-base border-2 rounded-2xl transition-all duration-300 bg-white text-gray-700 placeholder-gray-600 font-medium resize-none ${focusedField === 'pesan'
                          ? 'border-green-500'
                          : 'border-green-300 hover:border-green-400'
                        }`}
                      placeholder="Tulis pesan Anda (opsional)"
                      rows={3}
                    />
                    {focusedField === 'pesan' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-2 -top-2 w-4 h-4 bg-green-500 rounded-full"
                      />
                    )}
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="pt-6"
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`w-full py-4 px-8 rounded-2xl font-semibold text-base transition-all duration-300 ${isSubmitting
                        ? 'bg-green-400 cursor-not-allowed'
                        : 'bg-green-500 hover:bg-green-600 active:bg-green-700'
                      } text-white relative overflow-hidden`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                        Sedang mengirim...
                      </div>
                    ) : (
                      <span className="flex items-center justify-center">
                        Daftarkan Saya
                        <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-8"
          >
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
