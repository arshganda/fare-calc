import React from 'react';
import './SearchResultItem.css';

class SearchResultItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let matchedText = this.props.text.mainText.substring(0, this.props.typedText.length);
        let remainingText = this.props.text.mainText.substring(this.props.typedText.length);

        return (
            <div className="search-result-item-content">
                <div className="place"></div>
                <div className="search-result-item-text text-clip">
                    <div className="text-header text-clip">
                        <span className="main-text" >{matchedText}</span>
                        <span className="non-bold-main-text text-clip">{remainingText}</span> <br />
                    </div>
                    <span className="secondary-text text-clip">{this.props.text.secondaryText}</span>
                </div>
            </div>
        );
    }
}

export default SearchResultItem;