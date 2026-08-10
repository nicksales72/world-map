// Major divisions follow conventional IHO limits in Leaflet [latitude, longitude] order.
// They are visual naming guides, not legal or sharply physical boundaries.
export const oceanBoundaryLines = [
  {
    name: 'Southern Ocean northern limit',
    coordinates: [
      [-60, -180],
      [-60, -120],
      [-60, -67.2667],
      [-60, 0],
      [-60, 20],
      [-60, 90],
      [-60, 146.9167],
      [-60, 180],
    ],
  },
  {
    name: 'Atlantic and Indian Oceans',
    coordinates: [
      [-34.8332, 20],
      [-60, 20],
    ],
  },
  {
    name: 'Indian and Pacific Oceans',
    coordinates: [
      [-43.6436, 146.9167],
      [-60, 146.9167],
    ],
  },
  {
    name: 'Atlantic and Pacific Oceans',
    coordinates: [
      [-55.98, -67.2667],
      [-60, -67.2667],
    ],
  },
  {
    name: 'Arctic and Pacific Oceans',
    coordinates: [
      [66.5629, -171.0806],
      [66.5629, -164.5371],
    ],
  },
  {
    name: 'Arctic and Atlantic Oceans at Davis Strait',
    coordinates: [
      [66, -61],
      [66, -53.2],
    ],
  },
  {
    name: 'Arctic and Atlantic Oceans at Denmark Strait',
    coordinates: [
      [68.2286, -29.4294],
      [66.4336, -23.1343],
    ],
  },
  {
    name: 'Arctic and Atlantic Oceans north of Iceland',
    coordinates: [
      [65.0834, -13.5007],
      [70.8254, -9.0319],
    ],
  },
  {
    name: 'Arctic and Atlantic Oceans at Fram Strait',
    coordinates: [
      [71.1586, -8.0065],
      [76.5164, 16.4888],
    ],
  },
  {
    name: 'Arctic and Atlantic Oceans at the Barents gateway',
    coordinates: [
      [76.5645, 16.7211],
      [74.5195, 19.0922],
    ],
  },
  {
    name: 'Arctic and Atlantic Oceans north of Norway',
    coordinates: [
      [74.3417, 19.0688],
      [71.1725, 25.7768],
    ],
  },
];

export const waterLabels = [
  { name: 'North Pacific Ocean', position: [27, -150], kind: 'ocean' },
  { name: 'North Pacific Ocean', position: [25, 164], kind: 'ocean' },
  { name: 'South Pacific Ocean', position: [-25, -130], kind: 'ocean' },
  { name: 'South Pacific Ocean', position: [-24, 169], kind: 'ocean' },
  { name: 'North Atlantic Ocean', position: [29, -39], kind: 'ocean' },
  { name: 'South Atlantic Ocean', position: [-27, -17], kind: 'ocean' },
  { name: 'Indian Ocean', position: [-24, 80], kind: 'ocean' },
  { name: 'Arctic Ocean', position: [79, 4], kind: 'ocean' },
  { name: 'Southern Ocean', position: [-64, -112], kind: 'ocean' },
  { name: 'Southern Ocean', position: [-64, 22], kind: 'ocean' },
  { name: 'Southern Ocean', position: [-64, 132], kind: 'ocean' },

  { name: 'Caribbean Sea', position: [15.2, -74.7], kind: 'sea', minZoom: 3.75 },
  { name: 'Gulf of Mexico', position: [24.5, -90], kind: 'sea', minZoom: 3.75 },
  { name: 'Sargasso Sea', position: [29, -55], kind: 'sea', minZoom: 4 },
  { name: 'Labrador Sea', position: [57, -52], kind: 'sea', minZoom: 4 },
  { name: 'Hudson Bay', position: [59.5, -85], kind: 'sea', minZoom: 4 },
  { name: 'Greenland Sea', position: [74, -8], kind: 'sea', minZoom: 4 },
  { name: 'Norwegian Sea', position: [68, 2], kind: 'sea', minZoom: 4 },
  { name: 'North Sea', position: [56, 3], kind: 'sea', minZoom: 4.75 },
  { name: 'Baltic Sea', position: [57.8, 20], kind: 'sea', minZoom: 4.75 },
  { name: 'Mediterranean Sea', position: [35.5, 18], kind: 'sea', minZoom: 3.75 },
  { name: 'Black Sea', position: [43.2, 34], kind: 'sea', minZoom: 4.5 },
  { name: 'Scotia Sea', position: [-57, -41], kind: 'sea', minZoom: 4 },

  { name: 'Arabian Sea', position: [14, 64], kind: 'sea', minZoom: 3.75 },
  { name: 'Bay of Bengal', position: [14, 88], kind: 'sea', minZoom: 3.75 },
  { name: 'Red Sea', position: [20, 38.5], kind: 'sea', minZoom: 4.5 },
  { name: 'Persian Gulf', position: [26.5, 52.5], kind: 'sea', minZoom: 5 },
  { name: 'Gulf of Aden', position: [12, 48], kind: 'sea', minZoom: 4.75 },
  { name: 'Andaman Sea', position: [10, 96], kind: 'sea', minZoom: 4.5 },
  { name: 'Mozambique Channel', position: [-18, 42], kind: 'sea', minZoom: 4 },
  { name: 'Great Australian Bight', position: [-34, 130], kind: 'sea', minZoom: 4 },

  { name: 'Bering Sea', position: [58, -170], kind: 'sea', minZoom: 3.75 },
  { name: 'Sea of Okhotsk', position: [53, 149], kind: 'sea', minZoom: 4 },
  { name: 'Sea of Japan', position: [40, 135], kind: 'sea', minZoom: 4.5 },
  { name: 'Yellow Sea', position: [35, 123], kind: 'sea', minZoom: 5 },
  { name: 'East China Sea', position: [28, 125], kind: 'sea', minZoom: 4.75 },
  { name: 'South China Sea', position: [13, 114], kind: 'sea', minZoom: 4 },
  { name: 'Philippine Sea', position: [20, 132], kind: 'sea', minZoom: 4 },
  { name: 'Java Sea', position: [-5, 112], kind: 'sea', minZoom: 5 },
  { name: 'Banda Sea', position: [-5, 128], kind: 'sea', minZoom: 5 },
  { name: 'Arafura Sea', position: [-10, 136], kind: 'sea', minZoom: 4.75 },
  { name: 'Timor Sea', position: [-12, 127], kind: 'sea', minZoom: 4.75 },
  { name: 'Coral Sea', position: [-18, 154], kind: 'sea', minZoom: 3.75 },
  { name: 'Tasman Sea', position: [-39, 160], kind: 'sea', minZoom: 3.75 },

  { name: 'Barents Sea', position: [75, 42], kind: 'sea', minZoom: 4 },
  { name: 'Kara Sea', position: [75, 70], kind: 'sea', minZoom: 4 },
  { name: 'Laptev Sea', position: [75, 125], kind: 'sea', minZoom: 4 },
  { name: 'East Siberian Sea', position: [72, 160], kind: 'sea', minZoom: 4 },
  { name: 'Chukchi Sea', position: [69, -171], kind: 'sea', minZoom: 4 },
  { name: 'Beaufort Sea', position: [72, -142], kind: 'sea', minZoom: 4 },

  { name: 'Weddell Sea', position: [-72, -40], kind: 'sea', minZoom: 4 },
  { name: 'Ross Sea', position: [-74, 175], kind: 'sea', minZoom: 4 },
  { name: 'Amundsen Sea', position: [-72, -110], kind: 'sea', minZoom: 4 },
];
