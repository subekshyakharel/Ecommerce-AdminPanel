import { LineChart } from '@mui/x-charts/LineChart';
import { useSelector } from 'react-redux';

const OrderGraph = () => {
  const { allOrder } = useSelector((state) => state.orderInfo);

  // 🧮 Group orders by date
  const dateMap = {};

  allOrder?.forEach((order) => {
    const date = new Date(order.createdAt);
    const dateStr = date.toLocaleDateString(); // e.g., "1/5/2026"

    dateMap[dateStr] = (dateMap[dateStr] || 0) + 1;
  });

  // Prepare chart data
  const dates = Object.keys(dateMap).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  const orderCounts = dates.map((date) => dateMap[date]);

  return (
    <LineChart
      xAxis={[{ scaleType: 'point', data: dates }]}
      series={[
        {
          label: 'Orders',
          data: orderCounts,
        },
      ]}
      height={300}
    />
  );
};

export default OrderGraph;
