import {
    sky,
    web,
    kirpich,
    blackLives,
    Ocean_Waves,
    paintedWaves,
    Colorful_polygon,
} from "src/media";

const bgCImages = [
    sky,
    web,
    kirpich,
    blackLives,
    Ocean_Waves,
    paintedWaves,
    Colorful_polygon,
];

const todoWorkspace = {
    todoName: "Workspace",
    tables: [
        {
            id: 0,
            tableName: "Task manager",
            bg_url: bgCImages[4],
        },
        {
            id: 1,
            tableName: "My project",
            bg_url: bgCImages[6],
        },
        
    ],
};

export { todoWorkspace, bgCImages };
