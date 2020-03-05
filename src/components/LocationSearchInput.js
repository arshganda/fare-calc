import React from 'react';
import './LocationSearchInput.css';
import PlacesAutocomplete from 'react-places-autocomplete';
import SearchResultItem from './SearchResultItem';

class LocationSearchInput extends React.Component {

    onBlur = () => {
        console.log("YEET");
    }

    render() {
        const searchOptions = {
            bounds: new window.google.maps.LatLngBounds(
                new window.google.maps.LatLng(48, -129),
                new window.google.maps.LatLng(52, -118)
            ),
            componentRestrictions: {
                country: 'ca'
            },
        }
        return (
            <PlacesAutocomplete
                value={this.props.value}
                onChange={this.props.handleChange}
                onSelect={this.props.handleSelect}
                searchOptions={searchOptions}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className={this.props.className}>
                        <input value={this.props.value}
                            {...getInputProps({
                                placeholder: this.props.placeholderText,
                                ref: this.props.reference,
                                onFocus: this.props.onFocus,
                                onBlur: this.onBlur,
                                className: 'location-search-input',
                            })}
                        />
                        {suggestions.map(suggestion => {
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                    })}
                                >
                                    <SearchResultItem typedText={this.props.value} text={suggestion.formattedSuggestion} />
                                </div>
                            );
                        })}
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}

export default LocationSearchInput;

