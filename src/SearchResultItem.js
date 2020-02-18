import React from 'react';


class SearchResultItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <div className="search-result-item">
                <div className="search-result-item-content">
                    <div className="place"></div>
                    <div className="search-result-item-text">
                        <span className="main-text">{this.props.text.mainText}</span> <br />
                        <span className="secondary-text">{this.props.text.secondaryText}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchResultItem;