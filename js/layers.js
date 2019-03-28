////
// Basemap layers
////
const countyOutline = {
    id: 'county-outline',
    type: 'line',
    source: 'Boundaries',
    'source-layer': 'county',
    paint: {
        'line-width': 2.5,
        'line-color': '#fff'
    },
    filter: [
        '==',
        'dvrpc',
        'Yes'
    ]
}
const countyFill = {
    id: 'county-fill',
    type: 'fill',
    source: 'Boundaries',
    'source-layer': 'county',
    layout: {},
    paint: {
        'fill-color': 'rgb(136, 137, 140)',
        'fill-opacity': 1 
    },
    filter: [
        '==',
        'dvrpc',
        'Yes'
      ],
}
const municipalityOutline = {
    id: 'municipality-outline',
    type: 'line',
    source: 'Boundaries',
    'source-layer': 'municipalities',
    paint: {
        'line-width': 0.5,
        'line-color': '#f7f7f7'
    }
}


////
// Rail layers
////
const railSource = {
    type: 'geojson',
    data: 'https://opendata.arcgis.com/datasets/5af7a3e9c0f34a7f93ac8935cb6cae3b_0.geojson'
}
const railLayer = {
    id: 'rail-layer',
    type: 'line',
    // using the same geojson and passenger origins cause the tile layer has way too much going on / might be buses?
    source: railSource,
    paint: {
        'line-color': [
            'match',
            ['get', 'TYPE'],
            'AMTRAK',
            '#004d6e',
            'NJ Transit',
            '#f18541',
            'NJ Transit Light Rail',
            '#ffc424',
            'PATCO',
            '#ed164b',
            'Rapid Transit',
            '#9e3e97',
            'Regional Rail',
            '#487997',
            'Subway',
            '#f58221',
            'Subway - Elevated',
            '#067dc1',
            'Surface Trolley',
            '#529442',
            '#323232'
        ],
        'line-width': ['interpolate', ['linear'], ['zoom'], 8, 3, 12, 8],
        'line-opacity': 0.85,
    }
}
const railLabelsLayer = {
    id: 'rail-labels',
    type: 'symbol',
    source: railSource,
    layout: {
        'text-field': '{LINE_NAME}',
        'text-font': ["Montserrat SemiBold", "Open Sans Semibold"],
        'text-size': ['interpolate', ['linear'], ['zoom'], 3, 12, 12, 10],
        'symbol-placement': 'line'
    },
    paint: {
        'text-color': '#fff',
        'text-halo-color': [
          'match',
          ['get', 'TYPE'],
          'AMTRAK',
          '#004d6e',
          'NJ Transit',
          '#f18541',
          'NJ Transit Light Rail',
          '#ffc424',
          'PATCO',
          '#ed164b',
          'Rapid Transit',
          '#9e3e97',
          'Regional Rail',
          '#487997',
          'Subway',
          '#f58221',
          'Subway - Elevated',
          '#067dc1',
          'Surface Trolley',
          '#529442',
          '#323232'
        ],
        'text-halo-width': 2,
        'text-halo-blur': 3
    }
}

export { countyOutline, countyFill, municipalityOutline, railLayer, railLabelsLayer }