import {Bar} from 'react-chartjs-2';
import {FeedbackStatistics} from "../../../lib/graphql/statisticsQuery";

interface Props {
    data?: Array<FeedbackStatistics>
    charTitle?: string
    datasetLabel?: string
    backgroundColor?: string
}

const FeedBackChart = ({data = [], charTitle = "", datasetLabel = "", backgroundColor = 'rgba(255, 99, 132, 0.5)'} : Props) => {
    const chartData = {
        labels: data.map(d => d.description),
        datasets: [
            {
                label: datasetLabel,
                data: data?.map(d => d.count),
                backgroundColor
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {position: 'top' as const,},
            title: {
                display: true,
                text: charTitle,
            },
        },
        height: null,
        width: null,
    };

    return (
        <div className="w-full h-fit flex flex-col">
            <Bar data={chartData} options={options}/>
        </div>
    );
};

export default FeedBackChart;
