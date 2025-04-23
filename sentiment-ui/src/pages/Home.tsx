import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/analyze?keyword=${query}`);
      const data = await res.json();

      sessionStorage.setItem("sentiment", JSON.stringify(data));
      sessionStorage.setItem("keyword", query);

      setLoading(false);
      navigate("/results");
    } catch (error) {
      console.error("Error fetching sentiment:", error);
      setLoading(false);
    }
  };

  return (
    <div className="relative dark min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className={`max-w-xl text-center transition-all ${loading ? 'blur-sm pointer-events-none' : ''}`}>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 font-[Poppins]">
          How are they feeling?
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <input
            type="text"
            placeholder="e.g. AI, Bitcoin, Elections..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-96 px-4 py-3 text-black rounded-lg outline-none focus:ring-2 focus:ring-cyan-300"
          />
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="font-[Poppins] bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-cyan-300 hover:to-blue-400 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200"
          >
            See
          </button>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-cyan-400 border-solid"></div>
        </div>
      )}
    </div>
  );
}

export default Home;
