import { formContentType, formContentValidate } from "../UtilsComp/register/register_Types";

const validate = (form: formContentType) => {
    const newErrors: Partial<formContentValidate> = {};
    Object.keys(newErrors).length === 0;
    const passwordRegex = /^(?=.*\d)(?=.*[-._])[A-Za-z\d-._]{6,16}$/;
    const userNameRegex = /^(?=.*[A-Z])[-._a-zA-Z0-9]{4,25}$/;
    const standard =
        "at least \n 1 lowercase, 1 uppercase, 1 number, and 1 special character in (._-)";

    if (form.userName && !userNameRegex.test(form.userName)) {
        newErrors.userName = `Nickname must be between 4 - 25 characters that can contain  ${standard} and it should be unique for each user`;
    }

    if (form.userPass && !passwordRegex.test(form.userPass)) {
        newErrors.userPass = `Password must be between 6 - 16 characters that include ${standard}`;
    }

    if (
        form.checkPass &&
        ((form.checkPass && !passwordRegex.test(form.checkPass)) ||
            form.userPass !== form.checkPass)
    ) {
        newErrors.checkPass = "Passwords should match.";
    }

    return newErrors;
};




export {validate}