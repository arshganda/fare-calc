import React from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import SearchResultItem from './SearchResultItem';

class LocationSearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { address: '' };
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        this.setState({ address });
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };

    render() {
        const searchOptions = {
            bounds: new window.google.maps.LatLngBounds(
                new window.google.maps.LatLng(48, -129),
                new window.google.maps.LatLng(52, -118)
            ),
            componentRestrictions: {
                country: 'ca'
            },
            types: ['address']
        }
        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                searchOptions={searchOptions}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div style={{ width: '100%' }}>
                        <input value={this.state.address}
                            {...getInputProps({
                                placeholder: this.props.placeholderText,

                                className: 'location-search-input',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>
                                            <SearchResultItem text={suggestion.formattedSuggestion} />
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}

export default LocationSearchInput;