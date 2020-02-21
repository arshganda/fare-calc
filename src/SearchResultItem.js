import React from 'react';


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
                <div className="search-result-item-text">
                    <span className="main-text">{matchedText}</span>
                    <span className="non-bold-main-text">{remainingText}</span> <br />
                    <span className="secondary-text">{this.props.text.secondaryText}</span>
                </div>
            </div>
        );
    }
}

export default SearchResultItem;