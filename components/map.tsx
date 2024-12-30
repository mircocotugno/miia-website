import { Map as MapGl, Marker } from 'react-map-gl'
import type { MapProps, LocationProps } from '@props/types'

interface MapComponent {
  blok: MapProps
  parent?: string
}

export function Map({ blok }: MapComponent) {
  const locations: Array<LocationProps> = blok.locations.map((item) =>
    JSON.parse(item)
  )

  const intialView = {
    longitude: 11.953459368033833,
    latitude: 45.71456573746414,
    zoom: 7.5,
    bearing: 0,
    pitch: 0,
  }

  return (
    <div className='w-full h-full min-h-96 '>
      <MapGl
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        style={{ width: 'inherit', height: 'inherit', minHeight: 'inherit' }}
        mapStyle='mapbox://styles/mapbox/dark-v9'
        initialViewState={intialView}
      >
        {locations.map(({ lat, lng }, index) => (
          <Marker longitude={lng} latitude={lat} anchor='bottom' key={index} />
        ))}
      </MapGl>
    </div>
  )
}
