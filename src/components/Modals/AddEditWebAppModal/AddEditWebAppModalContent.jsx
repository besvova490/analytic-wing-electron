import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PropTypes from "prop-types";
import { notification } from "antd";

// elements
import Input from "../../../elements/Input";
import Button from "../../../elements/Button";

// helpers
import { urlRegex } from "../../../helpers/regex";
import { convertBase64ToFile } from "../../../helpers/convertBase64ToFile";
import { usePostWebApp } from "../../../swr/webApp";
import fileUpload from "../../../api/fileUpload";


const validationSchema = yup.object().shape({
  url: yup.string().required("Url is required.").matches(urlRegex, "Invalid url."),
  title: yup.string().required(),
  info: yup.string().required(),
});

function AddEditWebAppModalContent({ onSubmit: onSubmitProp }) {
  const { watch, setValue, handleSubmit, formState: { errors } } = useForm({
    initialValues: { url: "", title: "", info: "" },
    resolver: yupResolver(validationSchema),
  });

  const { trigger, isMutating } = usePostWebApp();
  const { url, info, title } = watch();

  const onSubmit = (data) => {
    window.electronAPI.getWebAppInfo(data);
  };

  // effects
  useEffect(() => {
    window.electronAPI.receiveWebAppInfo(async (_, payload) => {
      const resp = await fileUpload.post(convertBase64ToFile(payload.screenshot, `${payload.url}-preview`));

      trigger({
        url: payload.url,
        info: payload.info,
        title: payload.title,
        metaTitle: payload.metaTitle,
        preview: resp.Location,
      }).then(onSubmitProp).catch(() => {
        notification.error({
          message: "Oops!",
          description: "Something went wrong.",
          placement: "bottomLeft",
        });
      });
    });
  }, []);


  return (
    <form className="anwg-add-edit-web-app-modal__form" onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="url"
        name="url"
        value={url}
        onChange={(e) => setValue("url", e.target.value)}
        error={errors.url?.message}
      />
      <Input
        placeholder="title"
        name="title"
        value={title}
        onChange={(e) => setValue("title", e.target.value)}
        error={errors.title?.message}
      />
      <Input.TextArea
        placeholder="info"
        name="info"
        value={info}
        onChange={(e) => setValue("info", e.target.value)}
        error={errors.info?.message}
      />
      <Button htmlType="submit" loading={isMutating}>Save</Button>
    </form>
  );
}

AddEditWebAppModalContent.propTypes = { onSubmit: PropTypes.func, };

export default AddEditWebAppModalContent;

