

type navOpenType = {
    state: boolean
}


type navOpenContext = {
    navOpen: navOpenType;
    setNavOpen: React.Dispatch<React.SetStateAction<navOpenType>>;
};

export type {navOpenContext, navOpenType}