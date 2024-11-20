import ReportService from "@services/report.service";
import { Avatar, Card, Col, message, Row } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

const ReportSeller = ({ reportNumber }) => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    handleGetReport(id);
  }, [id]);

  async function handleGetReport(id) {
    setIsLoading(true);
    const [res, err] = await ReportService.getReport(id);
    setIsLoading(false);
    if (err) {
      message.error("Lấy dữ liệu tố cáo lỗi");
    } else {
      message.success("Lấy dữ liệu thành công");
      setReports(res.data);
      reportNumber({ number: res.data?.length });
    }
  }
  return (
    <Loading isLoading={isLoading}>
      <div>
        {reports.length === 0 ? (
          <p>Không có dữ liệu tố cáo</p>
        ) : (
          // Lặp qua từng báo cáo và hiển thị thông tin
          reports.map((report, index) => (
            <Card
              key={index}
              title={`Tố cáo ${index + 1}`}
              style={{ marginBottom: 20 }}
            >
              <Row gutter={16}>
                <Col span={12}>
                    <Col span={12}>
                      {" "}
                      <strong>Lý do tố cáo:</strong> {report.reason}
                    </Col>{" "}
                    <Col span={12}>
                      {" "}
                      <strong>Ngày tố cáo:</strong>{" "}
                      {isNaN(new Date(report.reportedAt))
                        ? "Ngày không hợp lệ"
                        : new Date(report.reportedAt).toLocaleString()}
                    </Col>
                </Col>

                <Col span={12}>
                  <strong>Người tố cáo:</strong>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={report.accused.avatar}
                      size={64}
                      style={{ marginRight: 10 }}
                    />
                    <div>
                      <strong>{report.accused.name}</strong>
                      <div>{report.accused.phone}</div>
                      <div>{report.accused.email}</div>
                      <div>Đánh giá: {report.accused.rating}</div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          ))
        )}
      </div>
    </Loading>
  );
};

export default ReportSeller;
