const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const API_URL = import.meta.env.VITE_API_URL || 'https://restaurant-api-nssp.onrender.com';
    const response = await fetch(`${API_URL}/api/admin/login`, {  // Fixed endpoint
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Origin': window.location.origin  // Helps CORS
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('adminToken', data.token);
    localStorage.setItem('adminUser', JSON.stringify(data.user));
    navigate('/admin/dashboard');
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
