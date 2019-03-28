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
// Tourism geojsons
////
const layerData = {
    VisitorAttractions_All,
    VisitorAttractions_Bus,
    VisitorAttractions_Rail,
    VisitorAttractions_Circuit
}


////
// Functions to Create tourism layers, hover layers and rail layers
////
const addTourismLayer = layer => {

    // use e (value of the selected option) to pick the correct dataSource
    const data = layerData[layer]

    return {
        id: layer,
        type: 'circle',
        source: {
            type: 'geojson',
            data
        },
        'paint': {
            'circle-radius': 5,
            'circle-color': '#F7941D',
            'circle-opacity': 1,
            'circle-stroke-width': 1.25,
            'circle-stroke-color': '#643b83',
            'circle-stroke-opacity': 0.9
        }
    }
}
const addTourismHover = layer => {

    const data = layerData[layer]

    return {
        'id': layer+'-hover',
        type: 'circle',
        'source': {
            type: 'geojson',
            data
        },
        'layout': {},
        'paint': {
            'circle-radius': 6,
            'circle-color': '#643b83',
            'circle-opacity': 1,
            'circle-stroke-width': 1.25,
            'circle-stroke-color': '#643b83',
            'circle-stroke-opacity': 1
        },
        'filter': [
            '==',
            'OBJECTID_1',
            ''
        ]
    }
}
const hoverLayer = (e, layer) => {
    const id = e.features[0].properties['OBJECTID_1']

    map.getCanvas().style.cursor = 'pointer'
    map.setFilter(layer, ['==', 'OBJECTID_1', id])
}
const unHoverLayer = layer => {
    map.getCanvas().style.cursor = ''
    map.setFilter(layer, ['==', 'OBJECTID_1', ''])
}
const addRailLayers = () => {
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

    map.addLayer(railLayer)
    map.addLayer(railLabelsLayer)
}


////
// Mapboxgl popup functions
////
const handleExtraPopupContent = (type, properties) => {
    switch(type){
        case 'VisitorAttractions_Bus':
            const stop = properties['STOPNAME']

            return `<p><strong>Nearby Bus Walkshed</strong>: ${stop}</p>`
        case 'VisitorAttractions_Rail':
            const station4 = properties['STATIONS_4']
            const station5 = properties['STATIONS_5']
            const station6 = properties['STATIONS_6']

            return `
                <p><strong>Nearby Rail Walkshed:</strong></p>
                <ol class="rail-walkshed-list">
                    <li><strong>Station</strong>: ${station4}</li>
                    <li><strong>Line</strong>: ${station5}</li>
                    <li><strong>Operator</strong>: ${station6}</li>
                </ol>
            `
        case 'VisitorAttractions_Circuit':
            const name = properties['NAME']
            return `<p><strong>Circuit Name</strong>: ${name}</p>`
        default:
            return ''
    }
}
const addPopup = (e, type) => {
    const properties = e.features[0].properties
    const name = properties['TRADENAME'].length > 1 ? properties['TRADENAME'] : properties['COMPANY']
    const address = properties['ADDRESS']
    const lngLat = e.lngLat
    let html = `
        <h3 class="popup-title">${name}</h3>
        <hr />
        <span class="address-wrapper"><strong>Address</strong>: <address class="popup-address"> ${address}</address></span>
    `

    html += handleExtraPopupContent(type, properties)

    new mapboxgl.Popup({
        closebutton: true,
        closeOnClick: true
    }).setLngLat(lngLat)
    .setHTML(html)
    .addTo(map)
}


////
// Maboxgl Config
////
mapboxgl.accessToken = 'pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA'
const map = new mapboxgl.Map({
    container: 'map',
    style: {
        'version': 8,
        "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
        'sources': {
            'Boundaries': {
                type: 'vector',
                url: 'https://tiles.dvrpc.org/data/dvrpc-municipal.json'
            }
        },
        'layers': [
            countyFill,
            countyOutline,
            municipalityOutline
        ]
    },
    attributionsControl: false,
    center: [-75.2273, 40.071],
    zoom: 3
});
map.fitBounds([[-76.09405517578125, 39.49211914385648],[-74.32525634765625,40.614734298694216]]);
map.on('load', () => {
    
    // load VisitorAttractions_All by default
    const defaultLayer = addTourismLayer('VisitorAttractions_All')
    const defaultHoverLayer = addTourismHover('VisitorAttractions_All')
    
    map.addLayer(defaultLayer)
    map.addLayer(defaultHoverLayer)

    // listen for mouse events on default layer
    map.on('mousemove', 'VisitorAttractions_All', e => hoverLayer(e, 'VisitorAttractions_All-hover'))
    map.on('mouseleave', 'VisitorAttractions_All', () => unHoverLayer('VisitorAttractions_All-hover'))
    map.on('click', 'VisitorAttractions_All', e => addPopup(e, null))

    const layerOptions = document.querySelector('#map-toggle-select')

    // listen to onchange events for the dropdown
    layerOptions.onchange = e => {
        let hasLayer = false
        let isRailLayer = false

        // get the selected layer
        const layer = e.target.value

        // check if the selected layer is the rail layer
        if(layer === 'VisitorAttractions_Rail') isRailLayer = true
        
        // get layers (ignore first 3 b/c those are the basemap)
        const layers = map.getStyle().layers.slice(3)

        // loop thru the existing layers to a) hide them and b) check if the selected layer already exists
        layers.forEach(loopedLayer => {
            loopedLayer = loopedLayer.id

            map.setLayoutProperty(loopedLayer, 'visibility', 'none')

            if(loopedLayer === layer) hasLayer = true
        })

        // if the layer already exists on the map, toggle it's visibility
        if(hasLayer){
            const hoverLayer = layer+'-hover'      

            map.setLayoutProperty(layer, 'visibility', 'visible')
            map.setLayoutProperty(hoverLayer, 'visibility', 'visible')

            if(isRailLayer){
                map.setLayoutProperty('rail-layer', 'visibility', 'visible')
                map.setLayoutProperty('rail-labels', 'visibility', 'visible')
            }
        
        // otherwise add it to the map
        }else{
            const tourismLayer = addTourismLayer(layer)
            const tourismHoverLayer = addTourismHover(layer)

            if(isRailLayer){
                addRailLayers()
            }

            map.addLayer(tourismLayer)
            map.addLayer(tourismHoverLayer)

            // add mouse events
            map.on('mousemove', layer, e => hoverLayer(e, layer+'-hover'))
            map.on('mouseleave', layer, () => unHoverLayer(layer+'-hover'))
            map.on('click', layer, e => addPopup(e, layer))
        }
    }
})