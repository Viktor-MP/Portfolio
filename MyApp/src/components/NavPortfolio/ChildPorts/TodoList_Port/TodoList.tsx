// import React, { useEffect, useState } from "react";

import { useEffect } from "react";

const TodoList = () => {
    // const [data, setData] = useState<{ data: any }>();

    useEffect(() => {
        console.log("fetch 1");

        // fetch("/portfolio/todoList")
        //     .then((res) => res.json())
        //     .then((data) => console.log(data));
        console.log("fetch 2");

        fetch("/portfolio/todo_list/1")
            .then((res) => res.json())
            .then((data) => console.log(data));
    }, []);

    return (
        <section className="text-3xl font-bold underline">
            todo list
            <div className="bg-silver text-tahiti">hello</div>
            <div>hello</div>
        </section>
    );
};

export default TodoList;
