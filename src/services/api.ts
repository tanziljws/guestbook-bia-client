// API Service untuk integrasi dengan Backend
// Menggunakan environment variable untuk URL endpoint

interface CreateUmumRequest {
  nama: string;
  nama_instansi: string;
  pesan?: string;
}

interface CreateUmumResponse {
  id: number;
  nama: string;
  nama_instansi: string;
  pesan: string | null;
  created_at: string;
}

interface ApiError {
  error: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
  }

  async createUmum(data: CreateUmumRequest): Promise<CreateUmumResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/umum`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result: CreateUmumResponse = await response.json();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Terjadi kesalahan yang tidak diketahui');
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();
export type { CreateUmumRequest, CreateUmumResponse };
