export type tablesTypes = {
    tableName: string;
    id: number;
    bg_url: string;
    color?: string
};


export type todoWorkspaceType = {
    todoName: string;
    tables: tablesTypes[]
};

export type todo_types = {
    className?: string;
};
