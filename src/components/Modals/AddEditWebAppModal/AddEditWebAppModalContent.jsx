import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// elements
import Input from "../../../elements/Input";
import Button from "../../../elements/Button";


const validationSchema = yup.object().shape({
  domain: yup.string().url("Invalid domain").required("Domain is required"),
  name: yup.string().required(),
  info: yup.string().required(),
});

function AddEditWebAppModalContent() {
  const { watch, setValue, handleSubmit, formState: { errors } } = useForm({
    initialValues: { domain: "", name: "", info: "" },
    resolver: yupResolver(validationSchema),
  });

  const { domain, info, name } = watch();

  const onSubmit = (data) => {
    console.log(data);
  };


  return (
    <form className="anwg-add-edit-web-app-modal__form" onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="domain"
        name="domain"
        value={domain}
        onChange={(e) => setValue("domain", e.target.value)}
        error={errors.domain?.message}
      />
      <Input
        placeholder="name"
        name="name"
        value={name}
        onChange={(e) => setValue("name", e.target.value)}
        error={errors.name?.message}
      />
      <Input.TextArea
        placeholder="info"
        name="info"
        value={info}
        onChange={(e) => setValue("info", e.target.value)}
        error={errors.info?.message}
      />
      <Button htmlType="submit">Save</Button>
    </form>
  );
}

AddEditWebAppModalContent.propTypes = {};

export default AddEditWebAppModalContent;

