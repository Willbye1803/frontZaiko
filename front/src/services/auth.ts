interface UserData {
    email: string;
    username: string;
    password: string;
  }
  
  export const registerUser = async (userData: UserData): Promise<boolean> => {
    try {
      
      const response = await fetch('https://tu-api.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      return response.ok;
    } catch (error) {
      console.error('Error al registrar:', error);
      return false;
    }
  };