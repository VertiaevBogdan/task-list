import SearchIcon from "./icons/SearchIcon.tsx";

type Props = {
    className: string;
}

export default function FilterBar({className}: Props){
    return(
        <section>
            <div className={className}>
                <label className="input">
                    <SearchIcon/>
                    <input type="search" className="grow" placeholder="Search" />
                </label>

                <div className="dropdown dropdown-start min-w-[7em] ">
                    <div tabIndex={0} role="button" className="btn m-1 bg-base-100">Filter by</div>
                    <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}