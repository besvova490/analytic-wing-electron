import { compile } from "path-to-regexp";

const pathToUrl = (path, params) => compile(path)(params);

export default pathToUrl;
