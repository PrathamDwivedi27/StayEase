"use client"
import React from 'react'

import L from 'leaflet'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

//@ts-expect-error: Leaflet's _getIconUrl is not defined in the type definitions
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
})

interface MapProps {
    center?:number[]
}
//We have to add some styles to global.css otherwise it will not show

const Map:React.FC<MapProps> = ({center}) => {
  return (
    <MapContainer
        center={center as L.LatLngExpression || [51.5, -0.09]}
        zoom={center?4:2}
        scrollWheelZoom={false}
        className='h-[35vh] rounded-lg'
    >
      <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {center && (<Marker position={center as L.LatLngExpression} />)}
    </MapContainer>
  )
}

export default Map
