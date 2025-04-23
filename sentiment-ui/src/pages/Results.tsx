import SentimentNeonChart from '../components/SentimentNeonChart';

const Results = () => {
  const storedSentiment = sessionStorage.getItem("sentiment");
  const storedKeyword = sessionStorage.getItem("keyword");

  const sentiment = storedSentiment ? JSON.parse(storedSentiment) : null;
  const keyword = storedKeyword || "";

  if (!sentiment || sentiment.total === 0) {
    return (
      <div className="dark min-h-screen bg-black text-white flex items-center justify-center px-4">
        <p className="text-center text-xl font-semibold">No tweets found for <span className="text-cyan-400">{keyword}</span>. Try something else.</p>
      </div>
    );
  }

  return (
    <div className="dark min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-10 font-[Poppins]">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Sentiment for "<span className="text-cyan-400">{keyword}</span>"
      </h1>
      <SentimentNeonChart
        data={{
          positive: sentiment.positive / 100,
          negative: sentiment.negative / 100,
        }}
      />

    </div>
  );
};

export default Results;
