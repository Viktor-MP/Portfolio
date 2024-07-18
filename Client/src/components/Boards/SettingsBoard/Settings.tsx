import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "src/reduxState/lightModeSlice";
import { RootState } from "src/reduxState/_store";

const Settings = () => {

    const mode = useSelector((state: RootState) => state.lightMode.lightMode);
    const dispatch = useDispatch();

    const modeChanger = () => {
        console.log(!mode);
        dispatch(setMode(!mode));
        localStorage.setItem("isLightMode", (!mode).toString());
    };

    return (
        <section>
            <button onClick={modeChanger}>change mode</button>
        </section>
    );
};

export default Settings;
