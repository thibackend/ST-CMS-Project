import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { useTranslation } from 'react-i18next';

export const EmChartComponent = () => {
  const { t } = useTranslation();

  const option = {
    title: {
      text: t('dashboard.all_employees'),
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
  const { t } = useTranslation();

  const option = {
    title: {
      text: t('projects.project'),
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
          { value: 335, name: t('projects.running') },
          { value: 310, name: t('projects.pending') },
          { value: 234, name: t('projects.done') },
          { value: 135, name: t('projects.failed') },
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
