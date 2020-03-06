import React from 'react';
import './SearchResultItem.css';

const SearchResultItem = (props) => {

    let matchedText = props.text.mainText.substring(0, props.typedText.length);
    let remainingText = props.text.mainText.substring(props.typedText.length);

    return (
        <div className="search-result-item-content">
            <div className="place"></div>
            <div className="search-result-item-text">
                <div className="text-header ">
                    <span className="main-text" >{matchedText}</span>
                    <span className="non-bold-main-text">{remainingText}</span>
                </div>
                <div className="secondary-text">{props.text.secondaryText}</div>
            </div>
        </div>
    );
}

export default SearchResultItem;