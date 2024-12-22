import { useMemo } from 'react'
import { Map as MapGl, Marker, NavigationControl } from 'react-map-gl'
import type { MapProps, LocationProps } from '@props/types'

interface MapComponent {
  blok: MapProps
  parent?: string
}

const position = { lat: 0, lng: 0 }

export function Map({ blok }: MapComponent) {
  // console.log(blok)

  const locations: Array<LocationProps> = blok.locations.map((item) =>
    JSON.parse(item)
  )
  // console.log(locations)

  const places = useMemo(() => getPlaces(locations), [locations])
  // console.log(places)

  const intialView = {
    latitude: position.lat / blok.locations.length,
    longitude: position.lng / blok.locations.length,
    zoom: 7.5,
    bearing: 0,
    pitch: 0,
  }


  return (
    <div className='w-96 h-96'>
      <MapGl
        initialViewState={intialView}
        scrollZoom={false}
        boxZoom={true}
        style={{ width: 'inherit', height: 'inherit' }}
        mapStyle='mapbox://styles/mapbox/dark-v9'
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        {places}
        <NavigationControl showCompass={false} position='bottom-right' />
      </MapGl>
    </div>
  )
}

const getPlaces = (locations: Array<LocationProps>) =>
  locations.map((location, index) => {
    const { lat, lng } = location.position
    position.lat += lat
    position.lng += lng
    return (
      <Marker longitude={lng} latitude={lat} anchor='bottom' key={index}>
        <i className='iconoir-map-pin' />
      </Marker>
    )
  })
