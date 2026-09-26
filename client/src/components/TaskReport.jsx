import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";

function TaskReport({ refreshTrigger}) {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/tasks/report",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        setReport(data);
      } catch (error) {
        console.error("Report error:", error);
      }
    };

    fetchReport();
  }, [refreshTrigger]);

  if (!report) {
    return <p>Loading report...</p>;
  }

  return (
    <div>
      <h2 className="task-report-title">Task Report</h2>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card className="task-report-card">
            <Statistic
              title="Total Tasks"
              value={report.TotalTasks}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card className="task-report-card">
            <Statistic
              title="Pending"
              value={report.PendingTasks}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card className="task-report-card">
            <Statistic
              title="In Progress"
              value={report.InProgressTasks}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card className="task-report-card">
            <Statistic
              title="Completed"
              value={report.CompletedTasks}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card className="task-report-card">
            <Statistic
              title="Overdue"
              value={report.OverdueTasks}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default TaskReport;