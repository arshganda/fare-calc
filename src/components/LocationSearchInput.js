import React from 'react';
import './LocationSearchInput.css';
import PlacesAutocomplete from 'react-places-autocomplete';
import SearchResultItem from './SearchResultItem';
import Compass from './Compass';

const LocationSearchInput = (props) => {

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
            value={props.value}
            onChange={props.handleChange}
            onSelect={props.handleSelect}
            searchOptions={searchOptions}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div className={props.className}>
                    <input value={props.value}
                        {...getInputProps({
                            placeholder: props.placeholderText,
                            ref: props.reference,
                            onFocus: props.onFocus,
                            className: 'location-search-input',
                        })}
                    />
                    {props.showCompass &&
                        <Compass onClick={props.handleCompassClick} />}
                    {suggestions.map(suggestion => {
                        return (
                            <div
                                {...getSuggestionItemProps(suggestion, {
                                })}
                            >
                                <SearchResultItem typedText={props.value} text={suggestion.formattedSuggestion} />
                            </div>
                        );
                    })}


                </div>
            )}
        </PlacesAutocomplete>
    );
}

export default LocationSearchInput;

