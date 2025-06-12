const inputs = [
  {
    id: "VisitorAttractions_All",
    title: "all",
    type: "fill",
    source: "Tourism",
    paint: {
      "fill-color": [
        "step",
        ["get", "est"],
        "transparent",
        3,
        "#cfb7e5",
        6,
        "#8139B8",
        11,
        "#662d91",
        21,
        "#2b1956",
      ],
      "fill-opacity": 0.7,
    },
  },
  {
    id: "VisitorAttractions_Bus",
    title: "bus",
    type: "fill",
    source: "Tourism",
    filter: [">", ["to-number", ["get", "est"]], 0],
    layout: {
      visibility: "none",
    },
    paint: {
      "fill-color": [
        "match",
        ["get", "bus"],
        "Yes",
        "#f7941d",
        "No",
        "#88898c",
        "#cccccc",
      ],
      "fill-opacity": 0.7,
    },
  },
  {
    id: "VisitorAttractions_Rail",
    title: "rail",
    type: "fill",
    source: "Tourism",
    layout: {
      visibility: "none",
    },
    filter: [">", ["to-number", ["get", "est"]], 0],
    paint: {
      "fill-color": [
        "match",
        ["get", "rail"],
        "Yes",
        "#f7941d",
        "No",
        "#88898c",
        "#cccccc",
      ],
      "fill-opacity": 0.7,
    },
  },
  {
    id: "VisitorAttractions_Circuit",
    title: "circuit trails",
    type: "fill",
    source: "Tourism",
    filter: [">", ["to-number", ["get", "est"]], 0],
    layout: {
      visibility: "none",
    },
    paint: {
      "fill-color": [
        "match",
        ["get", "circuit"],
        "Yes",
        "#f7941d",
        "No",
        "#88898c",
        "#cccccc",
      ],
      "fill-opacity": 0.7,
    },
  },
];

export { inputs };
