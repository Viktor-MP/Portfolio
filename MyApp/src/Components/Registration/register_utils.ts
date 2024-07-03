
const initial_formContent = {
    userName: "",
    userPass: "",
};

const signIn = [
    {
        type: "text",
        id: "userName",
        name: "userName",
        placeholder: "Nickname",
        required: true,
        class: "w-full px-3 py-2",
    },
    {
        type: "password",
        id: "userPass",
        name: "userPass",
        placeholder: "Password",
        required: true,
        class: "w-full px-3 py-2",
    },
    {
        option: "signUp",
        type: "password",
        id: "checkPass",
        name: "checkPass",
        placeholder: "Repeat the password",
        required: true,
        class: "w-full px-3 py-2",
    },
];

export { initial_formContent, signIn };
