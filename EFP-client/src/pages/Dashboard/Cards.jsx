import { UserOutlined } from "@ant-design/icons";
import { Card, Space, Statistic, Typography } from "antd";

function CardsComponent() {
    return (
        <div>
            <Typography.Title level={4}>Dashboard</Typography.Title>
            <Space direction="horizontal"></Space>
            <CardItem
                icon={<UserOutlined style={{ color: 'purple', backgroundColor: "rgba(0,255,225,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />}
                title={"Employee"}
                value={1234}
            />
            <CardItem
                icon={<UserOutlined style={{ color: 'purple', backgroundColor: "rgba(0,255,225,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />}
                title={"Project"}
                value={1234}
            />
        </div>
    );
}

function CardItem({ title, value, icon }) {
    return (
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
}

export default CardsComponent;
