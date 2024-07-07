import { formContentType, formContentValidate } from "../validation/_index";

declare module "*.module.scss" {
    const content: Record<string, string>;
    export default content;
}

export { formContentType, formContentValidate };
