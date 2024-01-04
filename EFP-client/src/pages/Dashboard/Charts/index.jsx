import React from 'react';
import ReactEcharts from 'echarts-for-react';

export const EmChartComponent = () => {
  const option = {
    title: {
      text: 'Employees chart',
    },
    xAxis: {
      type: 'category',
      data: ['Active', 'Inactive'],
    },
    yAxis: {
      type: 'value',
    },
    series: [{
      data: [40, 50],
      type: 'bar',
      label: {
        show: true,
        position: 'top',
      },
    }],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
  };

  return (
    <ReactEcharts option={option} style={{ height: '300px', width: '100%' }} />
  );
};

export const ProChartComponent = () => {
  const option = {
    title: {
      text: 'Projects',
      subtext: '%',
      left: 'left',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    series: [
      {
        name: 'Ratio',
        type: 'pie',
        radius: '50%',
        center: ['50%', '50%'],
        data: [
          { value: 335, name: 'Running' },
          { value: 310, name: 'Pending' },
          { value: 234, name: 'Done' },
          { value: 135, name: 'Failed' },
            ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <ReactEcharts option={option} style={{ height: '300px', width: '100%' }} />
  );
};
