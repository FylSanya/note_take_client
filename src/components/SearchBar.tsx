import React, {Dispatch, FC, SetStateAction} from 'react';

interface SearchBarProps {
    setSearchQuery: Dispatch<SetStateAction<string>>
}

const SearchBar: FC<SearchBarProps> = ({setSearchQuery}) => {

    return (
        <div>
            <input type="text" placeholder="Enter some text.." onChange={event => setSearchQuery(event.target.value)}/>
        </div>
    );
};

export default SearchBar;