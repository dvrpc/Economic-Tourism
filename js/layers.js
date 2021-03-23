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
    data: 'https://arcgis.dvrpc.org/portal/rest/services/Transportation/PassengerRail/FeatureServer/0/query?where=1=1&outFields=type,line_name&returnGeometry=true&outSR=4326&f=geojson'
}
const railLayer = {
    id: 'rail-layer',
    type: 'line',
    // using the same geojson and passenger origins cause the tile layer has way too much going on / might be buses?
    source: railSource,
    paint: {
        'line-color': [
            'match',
            ['get', 'type'],
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
        'text-field': '{line_name}',
        'text-font': ["Montserrat SemiBold", "Open Sans Semibold"],
        'text-size': ['interpolate', ['linear'], ['zoom'], 3, 12, 12, 10],
        'symbol-placement': 'line'
    },
    paint: {
        'text-color': '#fff',
        'text-halo-color': [
          'match',
          ['get', 'type'],
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
const circuitAnalysisSource = {
    type: 'geojson',
    data: circuitAnalysis
}
const circuitAnalysisLayer = {
    id: 'circuit-analysis',
    type: 'line',
    // using the same geojson and passenger origins cause the tile layer has way too much going on / might be buses?
    source: circuitAnalysisSource,
    paint: {
        'line-color': [
            'match',
            ['get', 'CIRCUIT'],
            'Existing',
            '#8ec73d',
            'In Progress',
            '#fdae61',
            'Pipeline',
            '#b144a5',
            'Planned',
            '#2e9ba8',
            '#323232',
            
        ],
        'line-width': ['interpolate', ['linear'], ['zoom'], 8, 3, 12, 8]
    }
}
const circuitAnalysisLabels = {
    id: 'rail-labels',
    type: 'symbol',
    source: circuitAnalysisSource,
    layout: {
        'text-field': '{NAME}',
        'text-font': ["Montserrat SemiBold", "Open Sans Semibold"],
        'text-size': ['interpolate', ['linear'], ['zoom'], 3, 12, 12, 10],
        'symbol-placement': 'line'
    },
    paint: {
        'text-color': '#fff',
        'text-halo-color': [
            'match',
            ['get', 'CIRCUIT'],
            'Existing',
            '#8ec73d',
            'In Progress',
            '#fdae61',
            'Pipeline',
            '#b144a5',
            'Planned',
            '#2e9ba8',
            '#323232',
        ],
        'text-halo-width': 2,
        'text-halo-blur': 3
    }
}
export { countyOutline, countyFill, municipalityOutline, railLayer, railLabelsLayer, circuitAnalysisLayer, circuitAnalysisLabels }