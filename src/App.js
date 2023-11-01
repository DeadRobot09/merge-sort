import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';

function MergeSortApexChart() {
  const [data, setData] = useState([5, 2, 9, 3, 6, 8, 1, 7, 4]);
  const [chartData, setChartData] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [swapDetails, setSwapDetails] = useState([]);

  const merge = (arr, left, mid, right) => {
    let leftArr = arr.slice(left, mid + 1);
    let rightArr = arr.slice(mid + 1, right + 1);

    let result = [];
    while (leftArr.length && rightArr.length) {
      if (leftArr[0] < rightArr[0]) {
        result.push(leftArr.shift());
      } else {
        result.push(rightArr.shift());
      }
    }
    result = result.concat(leftArr, rightArr);

    for (let i = 0; i < result.length; i++) {
      arr[left + i] = result[i];
    }
  };

  const mergeSort = (arr, left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      mergeSort(arr, left, mid);
      mergeSort(arr, mid + 1, right);
      merge(arr, left, mid, right);
    }
    return arr;
  };

  const visualizeMergeSort = async () => {
    let copyData = [...data];
    let swapLog = [];
    for (let i = 0; i < copyData.length; i++) {
      for (let j = 0; j < copyData.length - i - 1; j++) {
        let swapStep = { comparison: [j, j + 1], swapped: false };

        setChartData([{ data: [...copyData], color: ['#008FFB'] }]);

        if (copyData[j] > copyData[j + 1]) {
          let temp = copyData[j];
          copyData[j] = copyData[j + 1];
          copyData[j + 1] = temp;
          swapStep.swapped = true;
          setChartData([{ data: [...copyData], color: ['#00E396'] }]);
        }
        swapLog.push(swapStep);
        setSwapDetails(swapLog);

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  };

  useEffect(() => {
    if (isSorting) {
      visualizeMergeSort();
    }
  }, [isSorting]);

  const startSorting = () => {
    setIsSorting(true);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button onClick={startSorting} disabled={isSorting}>
        Start Merge Sort
      </button>
      <div style={{ marginTop: '20px' }}>
        <ApexCharts
          options={{
            chart: {
              type: 'bar',
            },
            colors: chartData.length ? chartData[0].color : ['#008FFB'],
          }}
          series={chartData.length ? [{ data: chartData[0].data }] : []}
          type="bar"
          height={350}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        {swapDetails.map((step, index) => (
          <p key={index} style={{ display: 'inline', margin: '0 10px', color: step.swapped ? 'red' : 'black' }}>
            {step.swapped ? `Swapped ${data[step.comparison[0]]} with ${data[step.comparison[1]]}` : ''}
          </p>
        ))}
      </div>
    </div>
  );
}

export default MergeSortApexChart;
