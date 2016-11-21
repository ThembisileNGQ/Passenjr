import React, { Component, PropTypes } from 'react';

import { Marker, Popup } from 'react-leaflet';

import { connect } from 'react-redux';

import { setDepartureLocation } from '../actions/location';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  departureLocation: PropTypes.array,
  errorLocation: PropTypes.string,
};

class DepartureMarkerContainer extends Component {
   

    handleMarkerDragged(e) {

    const { dispatch } = this.props;  

    const newLocation = [e.target._latlng.lng,e.target._latlng.lat]
    
    dispatch(setDepartureLocation(newLocation))
  }

    isDepartureLocation() {
      return this.props.departureLocation.length == 2;
    }

    renderMarker() {
            return <Marker position={[this.props.departureLocation[1],this.props.departureLocation[0]]} draggable={true} onDragend={this.handleMarkerDragged.bind(this)}>
                    <Popup>
                      <span>Departure: {this.props.departureLocation[1].toFixed(5)} , {this.props.departureLocation[0].toFixed(5)} </span>
                    </Popup>
                  </Marker>       
    }

    render() {
        let renderMarker = null;
        if(this.isDepartureLocation())
        {
          renderMarker = this.renderMarker();
        }
        
        return (renderMarker)  
        
    }
    
}

DepartureMarkerContainer.PropTypes = propTypes;

function mapStateToProps(state) {
  const {departureLocation, errorLocation } = state.location;

  return {
    departureLocation,
    errorLocation,
  };
}

export default connect(mapStateToProps)(DepartureMarkerContainer);