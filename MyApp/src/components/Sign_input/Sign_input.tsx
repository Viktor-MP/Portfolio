import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { input_Types } from "../UtilsComp/register/register_Types";

// react icons
// Eye icons
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";

// error or success icons
import { GiCheckMark } from "react-icons/gi";
import { RiErrorWarningLine } from "react-icons/ri";

const Sign_input: FC<input_Types> = ({
    id,
    hold,
    type,
    error,
    change,
    state,
    className,
    required,
}) => {
    const [showPassword, setShowPassword] = useState<boolean>(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const inputItem = useRef(null);

    const [targetVal, setTargetVal] = useState<string>("");
    const [typing, setTyping] = useState<boolean>(false);

    const passShower = () => setShowPassword(!showPassword);

    const isTyping = (e: ChangeEvent<HTMLInputElement>) => {
        if (timeoutRef.current) {
            setTargetVal("");
            clearTimeout(timeoutRef.current);
        }
        setTyping(true);
        timeoutRef.current = setTimeout(() => {
            setTargetVal(e.target.value);
            setTyping(false);
        }, 1000);
    };

    return (
        <div className="flex justify-center items-center relative">
            <div title={error} className="aspect-square w-8 absolute -left-8">
                {!typing && error ? (
                    <RiErrorWarningLine className="fill-error" />
                ) : !typing && !error && targetVal && state === "Sign Up" ? (
                    <GiCheckMark className="fill-success" />
                ) : (
                    <></>
                )}
            </div>
            <input
                ref={inputItem}
                onChange={(e) => {
                    isTyping(e);
                    return change(e);
                }}
                required={required}
                placeholder={hold}
                type={type ? (showPassword ? type : "text") : "text"}
                className={
                    className ? className : "max-w-full px-3 py-2 rounded-xl"
                }
                maxLength={type ? 16 : 25}
                minLength={type ? 6 : 4}
                id={id}
                name={id}
            />
            {type &&
                (showPassword ? (
                    <LiaEyeSlashSolid
                        onClick={passShower}
                        className="absolute right-4"
                    />
                ) : (
                    <LiaEyeSolid
                        onClick={passShower}
                        className="absolute right-4"
                    />
                ))}
        </div>
    );
};

export default Sign_input;
