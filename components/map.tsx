import type { LocationProps, MapProps } from '@props/types'
import { Map as MapGl, Marker, NavigationControl } from 'react-map-gl'

interface MapComponent {
  blok: MapProps
  contain?: boolean
  theme?: 'dark' | 'light'
}

export default function Map({ blok, contain, theme }: MapComponent) {
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
    zoom: locations.length === 1 ? 14 : 7,
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
        mapStyle={theme === "dark" ? "mapbox://styles/mapbox/dark-v9": "mapbox://styles/mapbox/light-v11"}
        initialViewState={intialView}
        maxZoom={17.5}
        minZoom={5.75}
        scrollZoom={false}
      >
        {locations.map((location, index) => (
          <Marker
            latitude={location.pos[0]}
            longitude={location.pos[1]}
            anchor="bottom"
            key={index}
          />
        ))}
        <NavigationControl />
      </MapGl>
    </Tag>
  )
}
