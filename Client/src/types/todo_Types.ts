
export type bgImages = {
    id: number;
    name: string;
    url: string
}

export type tablesTypes = {
    tableName: string;
    id: number;
    bg: bgImages;
    color?: string
};


export type todoWorkspaceType = {
    todoName: string;
    tables: tablesTypes[]
};

export type todo_types = {
    className?: string;
};
