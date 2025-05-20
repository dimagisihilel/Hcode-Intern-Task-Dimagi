interface SearchBarProps {
    searchTerm:  (term: string) => void;
    searchTermOnChange: (term: string) => void;
    search: () => void;
}
export default function SearchBar(props: SearchBarProps) {
    return (
        <div className="search-bar-container">
            <input type="text" placeholder="Search vehicles by model..." onChange={(e) => props.searchTermOnChange(e.target.value)} className="custom-search-bar" />
            <button className="search-button" onClick={props.search}>Search</button>
        </div>
    )
}