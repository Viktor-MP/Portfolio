import {
    DarkLine,
    Spectrum,
    WaveWhisper,
    LuminaLines,
    ChromaClouds,
    MidnightTide,
    MidnightPlumage,
} from "src/media";

const colors = [
    { id: 0, name: "red", value: "#dc3545" },
    { id: 1, name: "blue", value: "#007bff" },
    { id: 2, name: "pink", value: "#e83e8c" },
    { id: 3, name: "teal", value: "#20c997" },
    { id: 4, name: "cyan", value: "#38bdf8" },
    { id: 5, name: "gray", value: "#6c757d" },
    { id: 6, name: "dark", value: "#343a40" },
    { id: 7, name: "green", value: "#28a745" },
    { id: 8, name: "indigo", value: "#6610f2" },
    { id: 9, name: "yellow", value: "#ffc107" },
    { id: 10, name: "light", value: "#f8f9fa" },
    { id: 11, name: "black", value: "#020202" },
    { id: 12, name: "orange", value: "#fd7e14" },
];

const bgImages = [
    {
        id: 0,
        name: "ChromaClouds",
        url: ChromaClouds,
    },
    {
        id: 1,
        name: "LuminaLines",
        url: LuminaLines,
    },
    {
        id: 2,
        name: "DarkLine",
        url: DarkLine,
    },
    {
        id: 3,
        name: "Wave Whisper",
        url: WaveWhisper,
    },
    {
        id: 4,
        name: "Midnight Tide",
        url: MidnightTide,
    },
    {
        id: 5,
        name: "Spectrum",
        url: Spectrum,
    },
    {
        id: 6,
        name: "Midnight Plumage",
        url: MidnightPlumage,
    },
];

const todoWorkspace = {
    todoName: "Workspace",

    tables: [
        {
            id: 1,
            tableName: "Task manager",
            bg: bgImages[4],
            color: colors[10].value,
        },
        {
            id: 2,
            tableName: "My project",
            bg: bgImages[6],
            color: colors[10].value,
        },
        {
            id: 3,
            tableName: "My project",
            bg: bgImages[3],
            color: colors[10].value,
        },
     
    ],
};

export { todoWorkspace, bgImages, colors };
