mapboxgl.accessToken = 'pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA'

// Basemap layers (countyOutline, countyFill, municipalityOutline)
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

// tourism geojsons
const layerData = {
    VisitorAttractions_All,
    VisitorAttractions_Bus,
    VisitorAttractions_Rail,
    VisitorAttractions_Circuit
}

// Create tourism map layers
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

const map = new mapboxgl.Map({
    container: 'map',
    style: {
        'version': 8,
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
    // load All by default
    const defaultLayer = addTourismLayer('VisitorAttractions_All')
    map.addLayer(defaultLayer)

    const layerOptions = document.querySelector('#map-toggle-select')

    // listen to onchange events for the dropdown
    layerOptions.onchange = e => {
        let hasLayer = false

        // get the selected layer
        const layer = e.target.value
        
        // set current layer visibility to hidden (ignore first 3 b/c those are the basemap)
        const layers = map.getStyle().layers.slice(3)
        const length = layers.length

        // loop thru the existing layers to a) hide them and b) check if the selected layer already exists
        for(var i=0; i<length; i++) {
            const loopedLayer = layers[i].id
            map.setLayoutProperty(loopedLayer, 'visibility', 'none')

            // then check if the layer already exists on the map
            if(loopedLayer === layer) hasLayer = true
        }

        
        // if the layer already exists on the map, toggle it's visibility
        if(hasLayer){
            //if it does, toggle it's visibility to visible
            map.setLayoutProperty(layer, 'visibility', 'visible')
        
        // otherwise add it to the map
        }else{
            const tourismLayer = addTourismLayer(layer)
            map.addLayer(tourismLayer)
        }
    }
})