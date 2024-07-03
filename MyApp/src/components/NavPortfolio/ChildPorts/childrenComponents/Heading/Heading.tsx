import React, { useState, useRef } from "react";
import EditableComponent from "../Editable/Editable";

const Heading = () => {
    const [content, setcontent] = useState("Todo board");
    const editableRef = useRef(null);
    console.log(editableRef.current);

   

    return (
        <header>
            <EditableComponent  />
        </header>
    );
};

export default Heading;
