import React from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";

// components
const AddEditWebAppModalContent = React.lazy(() => import("./AddEditWebAppModalContent"));

// assets
import "../../../assets/styles/components/modals/add-edit-web-app-modal.scss";


function AddEditWebAppModal({ open, ...props }) {

  return (
    <Modal
      open={open}
      footer={null}
      destroyOnClose
      { ...props }
    >
      <React.Suspense fallback="...">
        { open && <AddEditWebAppModalContent { ...props }/>}
      </React.Suspense>
    </Modal>
  );
}

AddEditWebAppModal.propTypes = { open: PropTypes.bool, };

export default AddEditWebAppModal;
