import type { MapProps } from '@props/types'
import { Map as MapGl, Marker } from 'react-map-gl'

interface MapComponent {
  blok: MapProps
  parent?: string
}

export function Map({ blok }: MapComponent) {
  const locations = blok.locations.map((location) => {
    const pos = location.gps.split('/').map((s) => Number(s))
    return { ...location, pos }
  })

  const longitude =
    locations.reduce((sum, locations) => sum + locations.pos[0], 0) /
    locations.length

  const latitude =
    locations.reduce((sum, locations) => sum + locations.pos[1], 0) /
    locations.length

  const intialView = {
    longitude: longitude,
    latitude: latitude,
    zoom: 7.5,
    bearing: 0,
    pitch: 0,
  }

  return (
    <div className='flex-1 w-full h-full min-h-96 '>
      <MapGl
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        style={{ width: 'inherit', height: 'inherit', minHeight: 'inherit' }}
        mapStyle='mapbox://styles/mapbox/dark-v9'
        initialViewState={intialView}
      >
        {locations.map((location, index) => (
          <Marker
            latitude={location.pos[0]}
            longitude={location.pos[1]}
            anchor='bottom'
            key={index}
          />
        ))}
      </MapGl>
    </div>
  )
}
