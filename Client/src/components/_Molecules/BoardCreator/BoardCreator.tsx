import React, { FC, useEffect, useRef, useState } from "react";
import { BsPlusSquare } from "react-icons/bs";
import { bgImages, colors } from "src/utils/todo_utils";

import GClass from "../../Global.module.scss";
import Classes from "../../Boards/TodoBoard/Todo.module.scss";
import classNames from "classnames";

const BoardCreator: FC = () => {
    const [isNewTable, setIsNewTable] = useState<boolean>(false);

    const creatorRef = useRef<HTMLDivElement | null>(null);
    const [style, setStyle] = useState({
        left: "0px",
        top: "0px",
    });

    const randomBgImage = {
        background: `url(${
            bgImages[Math.floor(Math.random() * (bgImages.length - 1))].url
        })  no-repeat center center / cover`,
        color: colors[Math.floor(Math.random() * (colors.length - 1))].value,
    };

    useEffect(() => {
        if (!isNewTable) {
            setStyle({
                left: creatorRef.current?.offsetLeft + "px" || "0px",
                top: creatorRef.current?.offsetTop + "px" || "0px",
            });
        } else {
            setStyle({
                left: "0px",
                top: "0px",
            });
        }
    }, [isNewTable]);

    const changeCreatorPosition = () => {
        setTimeout(() => {
            setStyle({
                left: "50%",
                top: "50%",
            });
        }, 0);
        // creatorRef.current?.parentElement?.scrollTo({
        //     top: 0,
        //     behavior: "smooth",
        // });

        setIsNewTable(!isNewTable);
    };

    return (
        <div
            ref={creatorRef}
            style={style}
            className={`${Classes["tableCreator"]} ${GClass["flex_cen"]}
                ${classNames({
                    [Classes["tableCreatorCenter"]]: isNewTable,
                })}
           `}
        >
            {!isNewTable ? (
                <div
                    role="button"
                    aria-hidden="true"
                    onClick={changeCreatorPosition}
                    style={randomBgImage}
                >
                    <p>Create new board</p>

                    <BsPlusSquare />
                </div>
            ) : (
                <form>
                    <input
                        type="text"
                        name="BoardName"
                        placeholder="Board name"
                    />
                    <input
                        type="text"
                        name="BoardName"
                        placeholder="Board name"
                    />
                    <div>
                        <button
                            onClick={() => {
                                setIsNewTable(!isNewTable);
                            }}
                        >
                            cancel
                        </button>
                        <button>create</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default BoardCreator;
