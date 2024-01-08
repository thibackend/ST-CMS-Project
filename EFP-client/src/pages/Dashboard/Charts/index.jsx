import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import { useTranslation } from 'react-i18next';
import api from '../../../services/API_REQ';


export const EmChartComponent = ({ activeEmployees, inActiveEmployees }) => {
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
      data: [activeEmployees ? activeEmployees : 0, inActiveEmployees ? inActiveEmployees : 0],
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

export const ProChartComponent = ({ handleSetProjectRunning, handleSetProjectDone }) => {
  const { t } = useTranslation();

  const [project, setProject] = useState(null);
  const [CountDoneProject, setCountDoneProject] = useState(0);
  const [CountPendingProject, setCountPendingProject] = useState(0);
  const [CountOnprogressProject, setCountOnprogressProject] = useState(0);
  const [CountClosedProject, setCountClosedProject] = useState(0);
  const fetchProject = async () => {
    await api.get('project').then(
      res => {
        if (res && res.data.length > 0) {
          setProject(res.data);
        }
      }
    )
  };

  useEffect(() => {
    fetchProject();
  }, [])

  useEffect(() => {
    var project_done = 0, project_pending = 0, on_progress = 0, project_closed = 0;
    project && project.length > 0 && project.map((e) => {
      switch (e.status) {
        case 'done':
          project_done += 1;
          setCountDoneProject(project_done);
          break;
        case 'pending':
          project_pending += 1;
          setCountPendingProject(project_pending);
          break;
        case 'on_progress':
          on_progress += 1;
          setCountOnprogressProject(on_progress);
          break;
        case 'closed':
          project_closed += 1;
          setCountClosedProject(project_closed);
          break;
        default:
          break;
      }
    })
    handleSetProjectRunning(on_progress);
    handleSetProjectDone(project_done)
  }, [project]);


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
          { value: CountOnprogressProject, name: t('projects.running') },
          { value: CountPendingProject, name: t('projects.pending') },
          { value: CountDoneProject, name: t('projects.done') },
          { value: CountClosedProject, name: t('projects.failed') },
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
