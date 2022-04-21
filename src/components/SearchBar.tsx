import React, {useState} from 'react';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState<string>('')

    return (
        <div>
            <input type="text" placeholder="Enter some text.." onChange={event => setSearchQuery(event.target.value)}/>
        </div>
    );
};

export default SearchBar;