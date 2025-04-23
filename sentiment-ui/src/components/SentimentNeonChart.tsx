import ReactApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

type Props = {
  data: { positive: number; negative: number };
};

const SentimentNeonChart = ({ data }: Props) => {
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      background: 'transparent',
      toolbar: { show: false }
    },
    theme: { mode: 'dark' },
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: false,
        distributed: true,
        dataLabels: {
          position: 'center'
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val}%`,
      style: {
        colors: ['#fff'],
        fontSize: '16px',
        fontFamily: 'Poppins'
      }
    },
    xaxis: {
      categories: ['Positive', 'Negative'],
      labels: {
        style: {
          colors: ['#39ff14', '#ff3131'],
          fontSize: '16px',
          fontFamily: 'Poppins'
        }
      }
    },
    yaxis: {
      max: 100,
      min: 0,
      labels: {
        style: {
          colors: '#fff',
          fontFamily: 'Poppins'
        },
        formatter: (val: number) => `${val}%`
      }
    },
    colors: ['#39ff14', '#ff3131'],
    fill: {
      type: 'solid'
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) => `${val}%`
      }
    }
  };

  const series = [
    {
      name: 'Sentiment',
      data: [data.positive * 100, data.negative * 100]
    }
  ];

  return (
    <div className="dark min-h-screen bg-black text-white font-[Poppins] flex items-center justify-center px-4">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl neon-border w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">Sentiment Overview</h2>
        <ReactApexChart options={options} series={series} type="bar" height={450} />
      </div>
    </div>
  );
};

export default SentimentNeonChart;
