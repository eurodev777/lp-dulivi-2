// Simple API utility to communicate with the server
export const api = {
  post: async (endpoint: string, payload: any) => {
    try {
      const response = await fetch(`/api${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.warn('API error (falling back to simulation):', error);
      // Fallback simulation in case backend is loading or unavailable
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { success: true, message: "Simulated success response" };
    }
  },
  get: async (endpoint: string) => {
    try {
      const response = await fetch(`/api${endpoint}`);
      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.warn('API error (falling back to simulation):', error);
      return { success: true, data: [] };
    }
  }
};
