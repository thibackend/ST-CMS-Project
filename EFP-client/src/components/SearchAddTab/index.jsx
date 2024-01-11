import { Button, Col, Input, Row } from "antd";
import { FaList } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import {
  DownloadOutlined,
  PlusCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { useTranslation } from 'react-i18next';

import "./style.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
export default function Search({
  toAddLink,
  handleSearchEmail,
  handleSearchName,
}) {
  const { t } = useTranslation();
  return (
    <>
      <Row style={{ minHeight: 40 }}>
        <div
          style={{
            width: 200,
            backgroundColor: "white",
            borderTopRightRadius: 50,
            borderColor: "red",
            borderTopLeftRadius: 15,
            display: "flex",
            alignItems: "center",
            padding: 10,
          }}
        >
          <div style={{ flex: "0 0 30%" }}>
            <FaList color="#000000" style={{ width: 20, height: 20 }} />
          </div>
          <div>
            <p style={{ flex: "0 0 70%", color: "black", fontSize: 18 }}>
              {t('employees.title')}
            </p>
          </div>
        </div>
      </Row>

      <Row
        gutter={20}
        style={{
          marginLeft: 1,
          marginRight: 1,
          minHeight: 100,
          backgroundColor: "#ffffff",
          padding: 15,
          boxSizing: "border-box",
          borderTopRightRadius: 15,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Col span={8}>
          <Col span={24}>
            <div
              style={{
                boxSizing: "border-box",
                padding: 2,
                display: "flex",
                alignItems: "center",
                height: "100%",
                borderRadius: 50,
                border: "1px solid rgba(0,0,0,0.4)",
              }}
            >
              <Input
                style={{
                  border: 0,
                  background: "transparent",
                  color: "black",
                }}
                size="large"
                placeholder={t("employees.search-by-name")}
                onChange={(e) => handleSearchName(e.target.value)}
              />
              <div
                className="show-project_btn-search"
                style={{
                  width: 80,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#F3F4F9",
                  borderRadius: 50,
                }}
              >
                <CiSearch style={{ height: 20, width: 25 }} color="#211DCB" />
              </div>
            </div>
          </Col>
        </Col>
        <Col span={8}>
          <Col span={24}>
            <div
              style={{
                boxSizing: "border-box",
                padding: 2,
                display: "flex",
                alignItems: "center",
                height: "100%",
                borderRadius: 50,
                border: "1px solid rgba(0,0,0,0.4)",
              }}
            >
              <Input
                style={{
                  border: 0,
                  background: "transparent",
                  color: "black",
                }}
                size="large"
                placeholder={t('employees.search-by-mail')}
                onChange={(e) => handleSearchEmail(e.target.value)}
              />
              <div
                className="show-project_btn-search"
                style={{
                  width: 80,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#F3F4F9",
                  borderRadius: 50,
                }}
              >
                <CiSearch style={{ height: 20, width: 25 }} color="#211DCB" />
              </div>
            </div>
          </Col>
        </Col>
        <Col span={8}>
          <Col span={24}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                height: "100%",
              }}
            >
              <Link to={toAddLink}>
                <Button
                  type="primary"
                  shape="round"
                  icon={<PlusOutlined />}
                  size={"large"}
                >
                {t('employees.plus-employee')}
                </Button>
              </Link>
            </div>
          </Col>
        </Col>
      </Row>
    </>
  );
}
