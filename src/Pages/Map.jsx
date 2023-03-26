import React, { useState } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import { useLocation } from 'react-router-dom'
import marker from '../Assets/marker.png'

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default

const MapPage = () => {
  const location = useLocation()
  const query = location.search
  const urlSearchParams = new URLSearchParams(query);
  const {latitude, longitude} = Object.fromEntries(urlSearchParams.entries())
  
  const [viewport, setViewport] = useState({
    latitude: Number(latitude),
    longitude: Number(longitude),
    width: '100vw',
    height: '100vh',
    zoom: 14
  })

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={'pk.eyJ1IjoiY2hhMTk1IiwiYSI6ImNrd251M2JvcDFncWwzMW10cXF4ZTZpM2cifQ.SHUkPgpMxije_y4lWyteWQ'}
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle='mapbox://styles/mapbox/streets-v11'
      >
        <Marker
          latitude={Number(latitude)}
          longitude={Number(longitude)}
        >
          <img src={marker} alt='marker' className='w-10 h-10' />
        </Marker>
      </ReactMapGL>
    </div>
  )
}

export default MapPage
