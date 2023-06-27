import React, { useState } from "react";
import { Table } from "antd";

// elements
import Button from "../../elements/Button";

// components
import AddEditWebAppModal from "../../components/Modals/AddEditWebAppModal";

// assets
import "../../assets/styles/pages/settings-page.scss";


const PRODUCT_MODAL_INIT_CONFIG = {
  title: "New Product",
  open: false,
};

function SettingsPage() {
  const [productModalConfig, setProductModalConfig] = useState(PRODUCT_MODAL_INIT_CONFIG);

  return (
    <div className="anwg-settings-page">
      <Button onClick={() => setProductModalConfig({ title: "New Product", open: true, })}>
        New Product
      </Button>
      <Table>
        <Table.Column title="Name"/>
        <Table.Column title="Domain"/>
        <Table.Column title="Info"/>
        <Table.Column title=" "/>
      </Table>

      <AddEditWebAppModal
        { ...productModalConfig }
        onCancel={ () => setProductModalConfig(PRODUCT_MODAL_INIT_CONFIG) }
      />
    </div>
  );
}

export default SettingsPage;
