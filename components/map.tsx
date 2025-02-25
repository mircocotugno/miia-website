import type { LocationProps, MapProps } from '@props/types'
import { Map as MapGl, Marker } from 'react-map-gl'

interface MapComponent {
  blok: MapProps
  contain?: boolean
}

export default function Map({ blok, contain }: MapComponent) {
  const locations: Array<LocationProps & { pos: Array<number> }> = []
  blok.locations.forEach(({ content }) => {
    const pos = content?.gps && content.gps.split('/').map((s) => Number(s))
    return pos ? locations.push({ ...content, pos }) : null
  })

  const latitude =
    locations.reduce((sum, locations) => sum + locations.pos[0], 0) /
    locations.length

  const longitude =
    locations.reduce((sum, locations) => sum + locations.pos[1], 0) /
    locations.length

  const intialView = {
    longitude: longitude,
    latitude: latitude,
    zoom: 7.5,
    bearing: 0,
    pitch: 0,
  }

  const Tag = contain ? 'section' : 'div'
  const classes: string = contain ? 'min-h-md' : 'flex-1 w-full h-full min-h-96'

  return (
    <Tag className={classes}>
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
    </Tag>
  )
}
