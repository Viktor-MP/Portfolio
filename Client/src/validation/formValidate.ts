import { fetchUser } from "src/services/UserService";
import { formContentType, formContentValidate } from "../types";
import axios from "axios";
interface User {
    data: {
        error?: string;
    };
    status: number;
}

const isUserExists = async (userName: string): Promise<User> => {
    try {
        const user = await fetchUser({
            key: "userName",
            value: userName,
        });
        console.log(user);
        // setErrors({ userName: user.data.error });
        return user;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const formValidate = async (form: formContentType) => {
    console.log("validate");
    const newErrors: Partial<formContentValidate> = {};
    Object.keys(newErrors).length === 0;
    const passwordRegex = /^(?=.*\d)(?=.*[-._])[A-Za-z\d-._]{6,16}$/;
    const userNameRegex = /^(?=.*[A-Z])[-._a-zA-Z0-9]{4,25}$/;
    const standard =
        "at least \n 1 lowercase, 1 uppercase, 1 number, and 1 special character in (._-)";
    try {
        const isUser = await isUserExists(form.userName);
        

        newErrors.userName = isUser.data.error
    } catch (err) {
        console.log("Error:", err);
    }
    // if (isUserExists(form.userName)) {
    // }

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
    console.log(newErrors);
    return newErrors;
};

export { formValidate };
