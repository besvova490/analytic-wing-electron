import React, { useState, useEffect } from "react";
import { mutate } from "swr";
import { Table, Image, Modal, notification } from "antd";
import { AiOutlineDownload } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

// elements
import Button from "../../elements/Button";

// components
import AddEditWebAppModal from "../../components/Modals/AddEditWebAppModal";

// helpers
import { useGetWebApps, useDeleteWebApp } from "../../swr/webApp";
import { webApp } from "../../api/routes.constants";
import getDomain from "../../helpers/getDomain";
import events from "../../api/events";
import downloadProgress from "../../helpers/downloadProgress";

// assets
import "../../assets/styles/pages/settings-page.scss";


const PRODUCT_MODAL_INIT_CONFIG = {
  title: "New Product",
  open: false,
};

function SettingsPage() {
  const [isEventsLoading, setIsEventsLoading] = useState(null);
  const [productModalConfig, setProductModalConfig] = useState(PRODUCT_MODAL_INIT_CONFIG);

  const { data, isLoading } = useGetWebApps();
  const { trigger } = useDeleteWebApp();

  const handleSubmit = () => {
    mutate(webApp.shortWebApp);
    setProductModalConfig(PRODUCT_MODAL_INIT_CONFIG);
  };

  const handleDownload = async (id, appTitle) => {
    setIsEventsLoading(id);
    const allEventsPreApp = await events.get(id);

    downloadProgress(
      window.electronAPI.updateProgressBar,
      () => {
        setIsEventsLoading(null);
        window.electronAPI.updateProgressBar(-1);
        window.electronAPI.saveFile({ data: allEventsPreApp, title: appTitle });
      },
    );
  };

  const handleCopyAccessToken = async (accessToken) => {
    await navigator.clipboard.writeText(accessToken);

    notification.success({
      message: "Copied!",
      description: "Access token copied to clipboard.",
      placement: "bottomLeft",
    });
  };

  const handleOpenInBrowser = (url) => {
    window.electronAPI.openInBrowser(url);
  };

  // effects
  useEffect(() => {
    window.electronAPI.saveFileCallback((_, payload) => {
      Modal.success({
        title: "File saved successfully!",
        content: `File saved at ${payload}`,
        okText: "Show in folder",
        onOk: () => window.electronAPI.openFile(payload),
      });
    });
  }, []);

  return (
    <div className="anwg-settings-page">
      <Button onClick={() => setProductModalConfig({ title: "New Product", open: true, })}>
        New Product
      </Button>
      <Table
        dataSource={data || []}
        loading={isLoading}
        pagination={false}
        className="anwg-settings-page__table"
      >
        <Table.Column
          title="Preview"
          dataIndex="preview"
          render={row => <Image width="100px" src={row}/>}
        />
        <Table.Column title="Title" dataIndex="title"/>
        <Table.Column
          title="Domain"
          dataIndex="url"
          render={row => (
            <span
              className="anwg-settings-page__table-domain"
              onClick={() => handleOpenInBrowser(row)}
            >{ getDomain(row) }</span>
          )}
        />
        <Table.Column
          title="Access Token"
          dataIndex="accessToken"
          render={row => <span onClick={() => handleCopyAccessToken(row)} className="anwg-settings-page__table-access-token">{row}</span>}
        />
        <Table.Column
          title=""
          render={row => (
            <div className="anwg-settings-page__table-actions">
              <Button
                icon={<AiOutlineDownload/>}
                onClick={() => handleDownload(row.id, row.title)}
                loading={isEventsLoading === row.id}
                block
              />
              <Button
                block
                danger
                type="primary"
                icon={<MdDeleteOutline/>}
                onClick={() => Modal.confirm({
                  title: "Are you sure you want to delete this product?",
                  content: "This action cannot be undone.",
                  okText: "Yes",
                  cancelText: "No",
                  onOk: () => trigger(row.id).then(() => mutate(webApp.shortWebApp)),
                })}
              />
            </div>
          )}
        />
      </Table>

      <AddEditWebAppModal
        { ...productModalConfig }
        onSubmit={handleSubmit}
        onCancel={() => setProductModalConfig(PRODUCT_MODAL_INIT_CONFIG)}
      />
    </div>
  );
}

export default SettingsPage;
