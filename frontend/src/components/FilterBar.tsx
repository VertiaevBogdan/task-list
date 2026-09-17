import SearchIcon from "./icons/SearchIcon.tsx";
import type {SortDirection, SortField} from "../types/Types.ts";

type Props = {
    className?: string;

    sortBy: SortField;
    sortDirection: SortDirection;

    onSortByChange: (
        value: SortField
    ) => void;

    onDirectionChange: (
        value: SortDirection
    )=> void;
};

export default function FilterBar(
    {
        className="",
        sortBy,
        sortDirection,
        onDirectionChange,
        onSortByChange
}: Props){

    const sortOptions = [
        {
            value: "id",
            label: "ID"
        },
        {
            value: "title",
            label: "Title"
        },
        {
            value: "status",
            label: "Status"
        },
        {
            value: "createdAt",
            label: "Created date"
        }
    ];

    return(
        <section>
            <div className={className}>
                <label className="input">
                    <SearchIcon/>
                    <input type="search" className="grow" placeholder="Search" />
                </label>

                <div className="dropdown dropdown-end min-w-[7em] ">
                    <div tabIndex={0} role="button" className="btn m-1 bg-base-100">Sort by</div>
                    <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        {sortOptions.map((option) => (
                            <li key={option.value}>
                                <button
                                    onClick={() =>
                                        onSortByChange(option.value)
                                    }
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div >
            </div>
        </section>
    );
}