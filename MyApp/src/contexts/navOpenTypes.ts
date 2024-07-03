

export type navOpenType = {
    state: boolean
}


export type navOpenContext = {
    navOpen: navOpenType;
    setNavOpen: React.Dispatch<React.SetStateAction<navOpenType>>;
};