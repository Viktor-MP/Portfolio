import React, { FC } from "react";
import { Editable } from "src/components/_Atoms";
import { taskPropsType } from "src/types";

const Tasks: FC<taskPropsType> = ({ className, change ,name, table}) => {
    console.log(name)
    return (
        <div
            className={className}
            style={{
                backgroundImage: `url(${table.bg_url})`,
            }}
        >   
            <Editable  name={name} change={change} editablePath={table.tableName} id={table.id} />
        </div>
    );
};

export default Tasks;
