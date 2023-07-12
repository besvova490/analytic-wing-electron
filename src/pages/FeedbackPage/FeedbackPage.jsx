import React from "react";
import { Table } from "antd";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

// helpers
import { useFeedbacks } from "../../swr/feedback";

// assets
import "../../assets/styles/pages/feedback-page.scss";


function FeedbackPage() {
  const { id } = useParams();

  const { data, isLoading } = useFeedbacks(id, null, { refreshInterval: (1000 * 60) });

  console.log(data);


  return (
    <div className="anwg-feedback-page">
      <Table
        dataSource={data || []}
        loading={isLoading}
        pagination={false}
        className="anwg-settings-page__table"
      >
        <Table.Column
          title="User id"
          dataIndex="userId"
          render={row => <span className="anwg-feedback-page__table-access-token">{row}</span>}
        />
        <Table.Column
          title="Email"
          dataIndex="email"
        />
        <Table.Column
          title="Message"
          dataIndex="feedback"
        />
        <Table.Column
          title="Date"
          dataIndex="createdAt"
          render={row => format(new Date(row), "dd/MMM/yyyy")}
        />
      </Table>
    </div>
  );
}

export default FeedbackPage;
