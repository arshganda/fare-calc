import React from 'react';
import './SearchResultItem.css';

const SearchResultItem = (props) => {

    let matchedText = props.text.mainText.substring(0, props.typedText.length);
    let remainingText = props.text.mainText.substring(props.typedText.length);

    return (
        <div className="search-result-item-content">
            <div className="place"></div>
            <div className="search-result-item-text text-clip">
                <div className="text-header text-clip">
                    <span className="main-text" >{matchedText}</span>
                    <span className="non-bold-main-text text-clip">{remainingText}</span> <br />
                </div>
                <span className="secondary-text text-clip">{props.text.secondaryText}</span>
            </div>
        </div>
    );
}

export default SearchResultItem;