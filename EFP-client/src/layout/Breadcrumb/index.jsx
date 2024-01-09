import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Row , Col} from 'antd';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import { Translation } from 'react-i18next';
const BreadcrumbCom = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('');
  const [breadcrumbData, setBreadcrumbData] = useState([
    { path: '/dashboard', title: '' },
    { path: '/employees', title: <Translation>{(t)=>t('title.all_employees')}</Translation> },
    { path: '/projects', title: <Translation>{(t) => t('title.all_project')}</Translation> },
  ]);
  useEffect(() => {
    const matchedBreadcrumb = breadcrumbData.find(item => location.pathname.startsWith(item.path));

    if (matchedBreadcrumb) {
      setPageTitle(matchedBreadcrumb.title);
    } else {
      setPageTitle('');
    }
  }, [location.pathname, breadcrumbData]);

  return (
    <Row style={{padding:'20px 0 0 20px', fontWeight: 500, color: '#444'}}>
        <Col span={4}  >
            <Breadcrumb
            items={[
                {
                href: '/dashboard',
                title: (
                    <>
                    <HomeOutlined style={{fontSize: '20px'}}/>
                    </>
                ),
                },
                {
                href: '',
                title: <span>{pageTitle}</span>,
                },
            ]}
            style={{fontSize: '20px'}}
            />
        </Col>
       
    </Row>
  );
};

export default BreadcrumbCom;
