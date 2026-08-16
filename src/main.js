import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import splitGeoJSON from 'geojson-antimeridian-cut';
import { feature as toGeoJSON } from 'topojson-client';
import worldAtlas from 'world-atlas/countries-10m.json';
import { countries, formatCallingCode, getCountryFacts } from './country-data.js';
import { oceanBoundaryLines, waterLabels } from './water-data.js';
import { getMajorWar, majorWars } from './war-data.js';
import './style.css';

const mapElement = document.querySelector('#map');
const detailsElement = document.querySelector('#country-details');
const loadingElement = document.querySelector('#map-loading');
const searchInput = document.querySelector('#country-search');
const searchResults = document.querySelector('#search-results');
const searchWrap = document.querySelector('#search-wrap');
const randomButton = document.querySelector('#random-country');
const countryCount = document.querySelector('#country-count');
const mapStatus = document.querySelector('#map-status');
const zoomStatus = document.querySelector('#zoom-status');
const waterBoundariesButton = document.querySelector('#toggle-water-boundaries');
const warLayerSelect = document.querySelector('#war-layer-select');
const warDossier = document.querySelector('#war-dossier');
const warDossierTitle = document.querySelector('#war-dossier-title');
const warDossierPeriod = document.querySelector('#war-dossier-period');
const warDossierSummary = document.querySelector('#war-dossier-summary');
const warLegend = document.querySelector('#war-legend');
const warFact = document.querySelector('#war-fact');
const warSource = document.querySelector('#war-source');
const toggleWarDossierButton = document.querySelector('#toggle-war-dossier');
const warDossierToggleIcon = document.querySelector('#war-dossier-toggle-icon');
const closeWarLayerButton = document.querySelector('#close-war-layer');
const themeToggleButton = document.querySelector('#theme-toggle');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const rootElement = document.documentElement;

const THEME_STORAGE_KEY = 'field-atlas-theme';
const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
const savedTheme = (() => {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
})();
let followsSystemTheme = savedTheme === null;
let activeTheme =
  savedTheme ??
  (rootElement.dataset.theme === 'light' || rootElement.dataset.theme === 'dark'
    ? rootElement.dataset.theme
    : systemThemeQuery.matches
      ? 'dark'
      : 'light');

const numberFormat = new Intl.NumberFormat('en-US');
const compactNumberFormat = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
});
const preciseNumberFormat = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
});

const normalizeName = (value = '') =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

const countryByNumericCode = new Map(
  countries.filter((country) => country.ccn3).map((country) => [country.ccn3, country]),
);
const countryByName = new Map();

for (const country of countries) {
  const names = [
    country.name.common,
    country.name.official,
    country.cca2,
    country.cca3,
    ...(country.altSpellings ?? []),
  ];

  for (const name of names) {
    countryByName.set(normalizeName(name), country);
  }
}

const nameAliases = new Map([
  ['unitedstatesofamerica', 'USA'],
  ['demrepcongo', 'COD'],
  ['dominicanrep', 'DOM'],
  ['centralafricanrep', 'CAF'],
  ['eqguinea', 'GNQ'],
  ['ssudan', 'SSD'],
  ['bosniaandherz', 'BIH'],
  ['solomonis', 'SLB'],
  ['cotedivoire', 'CIV'],
  ['eswatini', 'SWZ'],
]);

const sovereignCountries = countries.filter((country) => country.independent && country.area > 0);
const areaRanks = new Map(
  [...sovereignCountries]
    .sort((a, b) => b.area - a.area)
    .map((country, index) => [country.cca3, index + 1]),
);

const mapThemes = {
  light: {
    tileStyle: 'light',
    themeColor: '#123438',
    equator: '#587377',
    waterBoundary: '#c9563f',
    defaultCountry: {
      color: '#587377',
      weight: 0.7,
      opacity: 0.82,
      fillColor: '#e0a93d',
      fillOpacity: 0.025,
      dashArray: null,
    },
    mutedCountry: {
      color: '#738785',
      weight: 0.55,
      opacity: 0.34,
      fillColor: '#d6ddd8',
      fillOpacity: 0.035,
      dashArray: null,
    },
    hoverCountry: {
      color: '#c9563f',
      weight: 1.35,
      opacity: 1,
      fillColor: '#ec7659',
      fillOpacity: 0.16,
      dashArray: null,
    },
    mutedHoverCountry: {
      color: '#536d6d',
      weight: 1.1,
      opacity: 0.8,
      fillColor: '#bcc8c3',
      fillOpacity: 0.17,
      dashArray: null,
    },
    selectedCountry: {
      color: '#a83c2c',
      weight: 2.1,
      opacity: 1,
      fillColor: '#e56649',
      fillOpacity: 0.28,
      dashArray: null,
    },
    activeOutline: '#153639',
    mutedSelection: '#aabbb5',
  },
  dark: {
    tileStyle: 'dark',
    themeColor: '#101a1c',
    equator: '#8da6a5',
    waterBoundary: '#f07b60',
    defaultCountry: {
      color: '#91aaa8',
      weight: 0.75,
      opacity: 0.84,
      fillColor: '#e0b259',
      fillOpacity: 0.045,
      dashArray: null,
    },
    mutedCountry: {
      color: '#78908e',
      weight: 0.6,
      opacity: 0.46,
      fillColor: '#81938e',
      fillOpacity: 0.055,
      dashArray: null,
    },
    hoverCountry: {
      color: '#ff8a6f',
      weight: 1.45,
      opacity: 1,
      fillColor: '#ef795e',
      fillOpacity: 0.24,
      dashArray: null,
    },
    mutedHoverCountry: {
      color: '#b6c8c4',
      weight: 1.15,
      opacity: 0.9,
      fillColor: '#849792',
      fillOpacity: 0.2,
      dashArray: null,
    },
    selectedCountry: {
      color: '#ff9b82',
      weight: 2.2,
      opacity: 1,
      fillColor: '#ed7357',
      fillOpacity: 0.38,
      dashArray: null,
    },
    activeOutline: '#f0eee5',
    mutedSelection: '#9eb2ad',
  },
};

const getMapTheme = () => mapThemes[activeTheme];
const getCartoTileUrl = (theme, layer) =>
  `https://{s}.basemaps.cartocdn.com/${mapThemes[theme].tileStyle}_${layer}/{z}/{x}/{y}{r}.png`;

const map = L.map(mapElement, {
  center: [18, 7],
  zoom: 2,
  minZoom: 1,
  maxZoom: 12,
  zoomControl: false,
  zoomSnap: 0.25,
  zoomDelta: 0.5,
  wheelPxPerZoomLevel: 90,
  worldCopyJump: true,
  preferCanvas: true,
  maxBounds: [
    [-85, -220],
    [85, 220],
  ],
  maxBoundsViscosity: 0.75,
});

map.createPane('labels');
map.getPane('labels').style.zIndex = 450;
map.getPane('labels').style.pointerEvents = 'none';

map.createPane('waterBoundaries');
map.getPane('waterBoundaries').style.zIndex = 390;
map.getPane('waterBoundaries').style.pointerEvents = 'none';

map.createPane('waterLabels');
map.getPane('waterLabels').style.zIndex = 460;
map.getPane('waterLabels').style.pointerEvents = 'none';

const createTileLayers = (theme) => ({
  base: L.tileLayer(getCartoTileUrl(theme, 'nolabels'), {
    subdomains: 'abcd',
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }),
  labels: L.tileLayer(getCartoTileUrl(theme, 'only_labels'), {
    subdomains: 'abcd',
    maxZoom: 20,
    pane: 'labels',
  }),
});

const tileLayersByTheme = {
  light: createTileLayers('light'),
  dark: createTileLayers('dark'),
};
let activeTileLayers = tileLayersByTheme[activeTheme];
activeTileLayers.base.addTo(map);
activeTileLayers.labels.addTo(map);

map.attributionControl.setPrefix(false);

const equatorLayer = L.polyline(
  [
    [0, -180],
    [0, 180],
  ],
  {
    color: getMapTheme().equator,
    weight: 1,
    opacity: 0.24,
    dashArray: '3 6',
    interactive: false,
  },
).addTo(map);

const waterBoundaryLayer = L.layerGroup(
  oceanBoundaryLines.map(({ coordinates }) =>
    L.polyline(coordinates, {
      pane: 'waterBoundaries',
      color: getMapTheme().waterBoundary,
      weight: 1,
      opacity: 0.34,
      dashArray: '2 7',
      interactive: false,
    }),
  ),
);

const setWaterBoundariesVisible = (isVisible) => {
  if (isVisible) {
    waterBoundaryLayer.addTo(map);
  } else {
    waterBoundaryLayer.removeFrom(map);
  }

  waterBoundariesButton.setAttribute('aria-pressed', String(isVisible));
  waterBoundariesButton.setAttribute(
    'aria-label',
    `${isVisible ? 'Hide' : 'Show'} ocean boundary guides`,
  );
  waterBoundariesButton.title = `${isVisible ? 'Hide' : 'Show'} ocean boundary guides`;
};

const waterLabelMarkers = waterLabels.map(({ name, position, kind, minZoom = 1 }) => ({
  minZoom,
  marker: L.marker(position, {
    pane: 'waterLabels',
    interactive: false,
    keyboard: false,
    icon: L.divIcon({
      className: `water-label water-label--${kind}`,
      html: `<span>${name}</span>`,
      iconSize: [0, 0],
    }),
  }),
}));

const updateWaterLabels = () => {
  const zoom = map.getZoom();

  for (const { marker, minZoom } of waterLabelMarkers) {
    const shouldShow = zoom >= minZoom;
    const isVisible = map.hasLayer(marker);

    if (shouldShow && !isVisible) marker.addTo(map);
    if (!shouldShow && isVisible) marker.removeFrom(map);
  }
};

setWaterBoundariesVisible(true);
updateWaterLabels();

const worldBounds = L.latLngBounds([
  [-72, -177],
  [82, 177],
]);

let countryLayer;
let selectedLayer = null;
let searchableCountries = [];
let visibleSearchResults = [];
let activeSearchIndex = -1;
let activeWar = null;
let isWarDossierMinimized = false;
const countryFactIndexes = new Map();

const lookupCountry = (geoFeature) => {
  const numericCode = String(geoFeature.id ?? '').padStart(3, '0');
  const atlasName = geoFeature.properties?.name ?? '';
  const aliasCode = nameAliases.get(normalizeName(atlasName));

  return (
    countryByNumericCode.get(numericCode) ??
    countryByName.get(normalizeName(atlasName)) ??
    countries.find((country) => country.cca3 === aliasCode) ??
    null
  );
};

const getWarParticipant = (country) =>
  country && activeWar ? activeWar.participants[country.cca3] ?? null : null;

const baseStyle = (geoFeature) => {
  if (!activeWar) return { ...getMapTheme().defaultCountry };

  const participant = getWarParticipant(lookupCountry(geoFeature));
  if (!participant) return { ...getMapTheme().mutedCountry };

  const side = activeWar.sides[participant.side];
  return {
    color: side.borderColor,
    weight: 1.15,
    opacity: 1,
    fillColor: side.color,
    fillOpacity: 0.5,
    dashArray: side.dashArray,
  };
};

const getHoverCountryStyle = (country) => {
  if (!activeWar) return getMapTheme().hoverCountry;

  const participant = getWarParticipant(country);
  if (!participant) return getMapTheme().mutedHoverCountry;

  return {
    color: getMapTheme().activeOutline,
    weight: 1.8,
    opacity: 1,
    fillColor: activeWar.sides[participant.side].color,
    fillOpacity: 0.66,
    dashArray: activeWar.sides[participant.side].dashArray,
  };
};

const getSelectedCountryStyle = (country) => {
  if (!activeWar) return getMapTheme().selectedCountry;

  const participant = getWarParticipant(country);
  if (!participant) {
    return {
      color: getMapTheme().activeOutline,
      weight: 2.1,
      opacity: 1,
      fillColor: getMapTheme().mutedSelection,
      fillOpacity: 0.3,
      dashArray: null,
    };
  }

  return {
    color: getMapTheme().activeOutline,
    weight: 2.25,
    opacity: 1,
    fillColor: activeWar.sides[participant.side].color,
    fillOpacity: 0.7,
    dashArray: activeWar.sides[participant.side].dashArray,
  };
};

const refreshCountryStyles = () => {
  if (!countryLayer) return;

  countryLayer.setStyle(baseStyle);
  if (selectedLayer?.countryData) {
    selectedLayer.setStyle(getSelectedCountryStyle(selectedLayer.countryData));
    selectedLayer.bringToFront();
  }
};

const setTheme = (theme, { persist = false } = {}) => {
  const nextTheme = theme === 'dark' ? 'dark' : 'light';
  const didChange = activeTheme !== nextTheme;
  activeTheme = nextTheme;
  rootElement.dataset.theme = activeTheme;
  themeColorMeta.content = getMapTheme().themeColor;

  const nextThemeLabel = `Switch to ${activeTheme === 'dark' ? 'light' : 'dark'} mode`;
  themeToggleButton.setAttribute('aria-label', nextThemeLabel);
  themeToggleButton.setAttribute('aria-pressed', String(activeTheme === 'dark'));
  themeToggleButton.title = nextThemeLabel;

  if (persist) {
    followsSystemTheme = false;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, activeTheme);
    } catch {
      // The selected theme still applies for the current session.
    }
  }

  if (!didChange) return;

  activeTileLayers.labels.removeFrom(map);
  activeTileLayers.base.removeFrom(map);
  activeTileLayers = tileLayersByTheme[activeTheme];
  activeTileLayers.base.addTo(map);
  activeTileLayers.labels.addTo(map);
  equatorLayer.setStyle({ color: getMapTheme().equator });
  waterBoundaryLayer.eachLayer((layer) => {
    layer.setStyle({ color: getMapTheme().waterBoundary });
  });
  refreshCountryStyles();
};

setTheme(activeTheme);

const prepareBoundaryGeometry = (geoData) => {
  const cleanRing = (ring) => {
    const points = ring.filter(
      ([longitude, latitude]) => Number.isFinite(longitude) && Number.isFinite(latitude),
    );
    const first = points[0];
    const last = points.at(-1);

    if (first && (first[0] !== last[0] || first[1] !== last[1])) points.push([...first]);
    return points;
  };

  geoData.features = geoData.features.map((geoFeature) => {
    const numericCode = String(geoFeature.id ?? '').padStart(3, '0');

    if (numericCode === '010') {
      const coastline = geoFeature.geometry.coordinates[0][0];
      const [startLongitude, startLatitude] = coastline[0];

      // Close the polar polygon below Web Mercator's visible edge instead of across the map.
      coastline.splice(
        -1,
        1,
        [180, startLatitude],
        [180, -89.9],
        [-180, -89.9],
        [startLongitude, startLatitude],
      );
      return geoFeature;
    }

    if (numericCode === '643' || numericCode === '242') {
      const splitFeature = splitGeoJSON(geoFeature);
      splitFeature.geometry.coordinates = splitFeature.geometry.coordinates
        .map(([outerRing, ...innerRings]) => {
          const cleanOuterRing = cleanRing(outerRing);
          if (cleanOuterRing.length < 4) return null;

          return [
            cleanOuterRing,
            ...innerRings.map(cleanRing).filter((ring) => ring.length >= 4),
          ];
        })
        .filter(Boolean);
      return splitFeature;
    }

    return geoFeature;
  });

  return geoData;
};

const fitWorld = () => {
  map.flyToBounds(worldBounds, {
    padding: window.matchMedia('(max-width: 760px)').matches ? [10, 10] : [32, 32],
    duration: 0.9,
  });
};

const formatArea = (area) => {
  if (!Number.isFinite(area) || area <= 0) return 'Not available';
  const value = area < 100 ? preciseNumberFormat.format(area) : numberFormat.format(Math.round(area));
  return `${value} km²`;
};

const formatCoordinate = ([latitude, longitude] = []) => {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return 'Not available';

  const lat = `${Math.abs(latitude).toFixed(1)}°${latitude >= 0 ? 'N' : 'S'}`;
  const lng = `${Math.abs(longitude).toFixed(1)}°${longitude >= 0 ? 'E' : 'W'}`;
  return `${lat}, ${lng}`;
};

const escapeHTML = (value = '') =>
  String(value).replace(
    /[&<>'"]/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      })[character],
  );

const getMapStatus = () =>
  selectedLayer?.countryData?.name.common ?? activeWar?.name ?? 'World view';

const getCountryTooltipContent = (country, fallbackName) => {
  const name = country?.name.common ?? fallbackName;
  const participant = getWarParticipant(country);
  if (!participant) return escapeHTML(name);

  const alignment = participant.alignment ?? activeWar.sides[participant.side].label;
  return `<span>${escapeHTML(name)}</span><small>${escapeHTML(alignment)}</small>`;
};

const setWarDossierMinimized = (isMinimized) => {
  isWarDossierMinimized = isMinimized;
  warDossier.classList.toggle('is-minimized', isMinimized);
  toggleWarDossierButton.setAttribute('aria-expanded', String(!isMinimized));

  const label = `${isMinimized ? 'Restore' : 'Minimize'} historical overlay`;
  toggleWarDossierButton.setAttribute('aria-label', label);
  toggleWarDossierButton.title = label;
  warDossierToggleIcon.textContent = isMinimized ? '+' : '−';
};

const renderWarDossier = () => {
  if (!activeWar) {
    warDossier.hidden = true;
    return;
  }

  warDossier.hidden = false;
  warDossierTitle.textContent = activeWar.name;
  warDossierPeriod.textContent = `· ${activeWar.period}`;
  warDossierSummary.textContent = activeWar.summary;
  warSource.href = activeWar.source.url;
  warSource.title = activeWar.source.label;
  warSource.setAttribute('aria-label', `${activeWar.source.label} (opens in a new tab)`);

  warLegend.innerHTML = Object.values(activeWar.sides)
    .map(
      (side) => `
        <span>
          <i
            class="war-legend__swatch war-legend__swatch--${escapeHTML(side.pattern)}"
            style="--war-color: ${escapeHTML(side.color)}"
            aria-hidden="true"
          ></i>
          ${escapeHTML(side.label)}
        </span>
      `,
    )
    .join('');

  const country = selectedLayer?.countryData;
  if (!country) {
    warFact.className = 'war-fact war-fact--empty';
    warFact.innerHTML = `
      <p class="war-fact__kicker">Participant note</p>
      <h3>Choose a highlighted country</h3>
      <p>Click a highlighted country to see when it entered ${escapeHTML(activeWar.name)} and what role it played.</p>
    `;
    return;
  }

  const participant = getWarParticipant(country);
  if (!participant) {
    warFact.className = 'war-fact war-fact--empty';
    warFact.innerHTML = `
      <p class="war-fact__kicker">Not highlighted</p>
      <h3>${escapeHTML(country.name.common)}</h3>
      <p>This country is not among the principal participants included in this ${escapeHTML(activeWar.name)} layer.</p>
    `;
    return;
  }

  const side = activeWar.sides[participant.side];
  const alignment = participant.alignment ?? side.label;
  warFact.className = 'war-fact';
  warFact.innerHTML = `
    <p class="war-fact__kicker">
      <i style="--war-color: ${escapeHTML(side.color)}" aria-hidden="true"></i>
      ${escapeHTML(alignment)}
    </p>
    <div class="war-fact__country">
      <span aria-hidden="true">${escapeHTML(country.flag)}</span>
      <div>
        <h3>${escapeHTML(country.name.common)}</h3>
        <p>${escapeHTML(participant.entity)}</p>
      </div>
    </div>
    <dl>
      <div><dt>Entered</dt><dd>${escapeHTML(participant.joined)}</dd></div>
      <div><dt>Entry</dt><dd>${escapeHTML(participant.entry)}</dd></div>
      <div><dt>Role</dt><dd>${escapeHTML(participant.role)}</dd></div>
    </dl>
  `;
};

const setWarLayer = (warId) => {
  activeWar = getMajorWar(warId);
  if (!activeWar) setWarDossierMinimized(false);
  warLayerSelect.value = activeWar?.id ?? '';
  document.body.classList.toggle('has-war-layer', Boolean(activeWar));
  refreshCountryStyles();
  for (const { country, layer } of searchableCountries) {
    layer.setTooltipContent(getCountryTooltipContent(country, country.name.common));
  }
  renderWarDossier();
  mapStatus.textContent = getMapStatus();
  if (activeWar && countryLayer) fitWorld();
};

const formatCurrency = (currencies = {}) => {
  const entries = Object.entries(currencies);
  if (!entries.length) return 'Not available';

  return entries
    .map(([code, { name, symbol }]) => `${name} (${code}${symbol ? `, ${symbol}` : ''})`)
    .join(', ');
};

const nextCountryFact = (country) => {
  const facts = getCountryFacts(country);
  const index = countryFactIndexes.get(country.cca3) ?? 0;
  countryFactIndexes.set(country.cca3, (index + 1) % facts.length);

  return { text: facts[index], position: index + 1, total: facts.length };
};

const showNextCountryFact = (country) => {
  const fact = nextCountryFact(country);
  const factText = detailsElement.querySelector('[data-country-fact]');
  const factCount = detailsElement.querySelector('[data-country-fact-count]');

  if (factText) factText.textContent = fact.text;
  if (factCount) factCount.textContent = `${fact.position} / ${fact.total}`;
};

const renderEmptyProfile = () => {
  detailsElement.innerHTML = `
    <div class="empty-profile">
      <div class="empty-profile__globe" aria-hidden="true">
        <svg viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="31" />
          <path d="M9 40h62M40 9c9 9 14 19.3 14 31S49 62 40 71M40 9c-9 9-14 19.3-14 31S31 62 40 71" />
          <path d="M17 22.5c6.5 4 14.1 6 23 6s16.5-2 23-6M17 57.5c6.5-4 14.1-6 23-6s16.5 2 23 6" />
        </svg>
        <span>01</span>
      </div>
      <div>
        <h2>Choose anywhere</h2>
        <p>Click a country on the map or use search to open its field notes.</p>
      </div>
    </div>
  `;
};

const renderCountryProfile = (country) => {
  const languageList = Object.values(country.languages ?? {});
  const languages = country.atlas.languageSummary ?? (languageList.join(', ') || 'Not available');
  const languageCount = country.atlas.languageCount ?? (languageList.length || '—');
  const languageMetricLabel = country.atlas.languageMetricLabel ?? 'Official languages';
  const capital = country.atlas.capitalLabel ?? (country.capital?.join(', ') || 'No official capital');
  const areaRank = areaRanks.get(country.cca3);
  const borderCount = country.borders?.length ?? 0;
  const statusTags = [
    country.atlas.euMemberSince ? { label: 'EU member', kind: 'eu' } : null,
    country.atlas.natoMemberSince ? { label: 'NATO member', kind: 'nato' } : null,
    ...(country.atlas.statusTags ?? (country.unMember ? ['UN member'] : [])).map((label) => ({ label })),
    country.landlocked ? { label: 'Landlocked' } : null,
    country.independent ? { label: 'Independent' } : null,
  ].filter(Boolean);
  const osmUrl = `https://www.openstreetmap.org/#map=5/${country.latlng[0]}/${country.latlng[1]}`;
  const hasArea = Number.isFinite(country.area) && country.area > 0;
  const compactArea = country.area < 100
    ? preciseNumberFormat.format(country.area)
    : compactNumberFormat.format(country.area);
  const fact = nextCountryFact(country);

  detailsElement.innerHTML = `
    <article class="profile-card">
      <button class="profile-close" type="button" data-clear-country aria-label="Close country profile">×</button>
      <header class="profile-hero">
        <div class="profile-flag" role="img" aria-label="${escapeHTML(`Flag of ${country.name.common}`)}">
          ${country.flag}
        </div>
        <div class="profile-heading">
          <p class="eyebrow">Selected territory · ${escapeHTML(country.cca3)}</p>
          <h2>${escapeHTML(country.name.common)}</h2>
          <p>${escapeHTML(country.name.official)}</p>
        </div>
      </header>

      <div class="profile-tags">
        ${statusTags
          .map(
            ({ label, kind }) =>
              `<span${kind ? ` class="profile-tag--${kind}"` : ''}>${escapeHTML(label)}</span>`,
          )
          .join('')}
      </div>

      <div class="metric-grid">
        <div class="metric metric--wide">
          <span>Area</span>
          <strong title="${escapeHTML(formatArea(country.area))}">${hasArea ? compactArea : '—'}${hasArea ? ' <i>km²</i>' : ''}</strong>
          <small>${areaRank ? `World rank #${areaRank}` : hasArea ? 'Total territory' : 'Area unavailable'}</small>
        </div>
        <div class="metric">
          <span>Neighbors</span>
          <strong>${borderCount}</strong>
          <small>Land borders</small>
        </div>
        <div class="metric">
          <span>Languages</span>
          <strong>${escapeHTML(languageCount)}</strong>
          <small title="${escapeHTML(languageMetricLabel)}">${escapeHTML(languageMetricLabel)}</small>
        </div>
      </div>

      <dl class="fact-list">
        <div><dt>Capital</dt><dd>${escapeHTML(capital)}</dd></div>
        <div><dt>Subregion</dt><dd>${escapeHTML(country.subregion || country.region)}</dd></div>
        <div><dt>Languages</dt><dd>${escapeHTML(languages)}</dd></div>
        <div><dt>Currency</dt><dd>${escapeHTML(formatCurrency(country.currencies))}</dd></div>
        <div><dt>Calling code</dt><dd>${escapeHTML(formatCallingCode(country))}</dd></div>
        <div><dt>Internet domain</dt><dd>${escapeHTML(country.tld?.join(', ') || 'Not available')}</dd></div>
        <div><dt>Coordinates</dt><dd>${escapeHTML(formatCoordinate(country.latlng))}</dd></div>
      </dl>

      <div class="field-note">
        <div class="field-note__heading">
          <span>Field note <b data-country-fact-count>${fact.position} / ${fact.total}</b></span>
          <button type="button" data-next-fact aria-label="Show another fact about ${escapeHTML(country.name.common)}">
            Next note
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7v5h-5M4 17v-5h5" /><path d="M6.1 8.5A7 7 0 0 1 18.8 12M17.9 15.5A7 7 0 0 1 5.2 12" /></svg>
          </button>
        </div>
        <p data-country-fact aria-live="polite">${escapeHTML(fact.text)}</p>
      </div>

      <a class="map-link" href="${escapeHTML(osmUrl)}" target="_blank" rel="noreferrer">
        View local detail on OpenStreetMap
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M14 7l5 5-5 5" /></svg>
      </a>
    </article>
  `;

  detailsElement.querySelector('[data-clear-country]').addEventListener('click', () => {
    clearSelection();
  });
  detailsElement.querySelector('[data-next-fact]').addEventListener('click', () => {
    showNextCountryFact(country);
  });
};

const closeSearchResults = () => {
  searchResults.hidden = true;
  searchInput.setAttribute('aria-expanded', 'false');
  activeSearchIndex = -1;
};

const clearSelection = () => {
  if (selectedLayer) {
    countryLayer.resetStyle(selectedLayer);
    selectedLayer = null;
  }

  renderEmptyProfile();
  renderWarDossier();
  mapStatus.textContent = getMapStatus();
  document.body.classList.remove('has-selection');
};

const selectCountryLayer = (layer, shouldMoveMap = true) => {
  const country = layer.countryData;
  if (!country) return;

  if (selectedLayer && selectedLayer !== layer) {
    countryLayer.resetStyle(selectedLayer);
  }

  selectedLayer = layer;
  layer.setStyle(getSelectedCountryStyle(country));
  layer.bringToFront();
  renderCountryProfile(country);
  renderWarDossier();
  closeSearchResults();
  searchInput.value = '';
  mapStatus.textContent = country.name.common;
  document.body.classList.add('has-selection');

  if (shouldMoveMap) {
    const isMobile = window.matchMedia('(max-width: 760px)').matches;
    const maxZoom = country.area < 1_000 ? 7.5 : country.area < 20_000 ? 6.5 : 5.5;
    const options = {
      maxZoom,
      duration: 0.85,
      paddingTopLeft: isMobile ? [20, 70] : [50, 50],
      paddingBottomRight: isMobile ? [20, Math.round(window.innerHeight * 0.43)] : [50, 50],
    };

    map.flyToBounds(layer.getBounds(), options);
  }
};

const setActiveSearchResult = (index) => {
  const resultButtons = [...searchResults.querySelectorAll('button')];
  if (!resultButtons.length) return;

  activeSearchIndex = (index + resultButtons.length) % resultButtons.length;
  resultButtons.forEach((button, buttonIndex) => {
    button.classList.toggle('is-active', buttonIndex === activeSearchIndex);
  });
  resultButtons[activeSearchIndex].scrollIntoView({ block: 'nearest' });
};

const renderSearchResults = (query) => {
  const normalizedQuery = normalizeName(query);
  if (!normalizedQuery) {
    closeSearchResults();
    return;
  }

  visibleSearchResults = searchableCountries
    .map((entry) => {
      const country = entry.country;
      const names = [
        country.name.common,
        country.name.official,
        country.cca2,
        country.cca3,
        ...(country.altSpellings ?? []),
        ...(country.capital ?? []),
      ].map(normalizeName);
      const startsWith = names.some((name) => name.startsWith(normalizedQuery));
      const includes = names.some((name) => name.includes(normalizedQuery));
      return { ...entry, score: startsWith ? 0 : includes ? 1 : 2 };
    })
    .filter((entry) => entry.score < 2)
    .sort((a, b) => a.score - b.score || a.country.name.common.localeCompare(b.country.name.common))
    .slice(0, 7);

  searchResults.replaceChildren();
  activeSearchIndex = -1;

  if (!visibleSearchResults.length) {
    const empty = document.createElement('p');
    empty.className = 'search-results__empty';
    empty.textContent = 'No matching country found';
    searchResults.append(empty);
  } else {
    visibleSearchResults.forEach(({ country }, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('role', 'option');
      button.dataset.resultIndex = String(index);
      button.innerHTML = `
        <span class="result-flag" aria-hidden="true">${country.flag}</span>
        <span><strong>${escapeHTML(country.name.common)}</strong><small>${escapeHTML(country.capital?.[0] || country.region)} · ${escapeHTML(country.cca3)}</small></span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
      `;
      searchResults.append(button);
    });
  }

  searchResults.hidden = false;
  searchInput.setAttribute('aria-expanded', 'true');
};

const initializeCountries = () => {
  const geoData = prepareBoundaryGeometry(toGeoJSON(worldAtlas, worldAtlas.objects.countries));

  countryLayer = L.geoJSON(geoData, {
    style: baseStyle,
    onEachFeature: (geoFeature, layer) => {
      const country = lookupCountry(geoFeature);
      const displayName = country?.name.common ?? geoFeature.properties?.name ?? 'Unknown territory';
      layer.countryData = country;
      layer.bindTooltip(displayName, {
        sticky: true,
        direction: 'top',
        opacity: 1,
        className: 'country-tooltip',
      });

      if (!country) return;

      layer.on({
        mouseover: () => {
          mapElement.classList.add('is-hovering-country');
          layer.setTooltipContent(getCountryTooltipContent(country, displayName));
          if (layer !== selectedLayer) layer.setStyle(getHoverCountryStyle(country));
        },
        mouseout: () => {
          mapElement.classList.remove('is-hovering-country');
          if (layer !== selectedLayer) countryLayer.resetStyle(layer);
        },
        click: () => selectCountryLayer(layer),
      });

      searchableCountries.push({ country, layer });
    },
  }).addTo(map);

  searchableCountries = searchableCountries
    .filter(
      (entry, index, entries) =>
        entries.findIndex((candidate) => candidate.country.cca3 === entry.country.cca3) === index,
    )
    .sort((a, b) => a.country.name.common.localeCompare(b.country.name.common));

  countryCount.textContent = `${searchableCountries.length} mapped places`;
  mapStatus.textContent = 'World view';
  searchInput.disabled = false;
  randomButton.disabled = false;
  warLayerSelect.disabled = false;
  loadingElement.classList.add('is-hidden');
  window.setTimeout(() => loadingElement.remove(), 350);
  fitWorld();
};

for (const war of majorWars) {
  const option = document.createElement('option');
  option.value = war.id;
  option.textContent = `${war.name} · ${war.years}`;
  warLayerSelect.append(option);
}

searchInput.addEventListener('input', (event) => renderSearchResults(event.target.value));
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    setActiveSearchResult(activeSearchIndex + 1);
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault();
    setActiveSearchResult(activeSearchIndex - 1);
  }

  if (event.key === 'Enter' && visibleSearchResults.length) {
    event.preventDefault();
    const result = visibleSearchResults[activeSearchIndex >= 0 ? activeSearchIndex : 0];
    selectCountryLayer(result.layer);
  }

  if (event.key === 'Escape') {
    event.stopPropagation();
    closeSearchResults();
  }
});

searchResults.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-result-index]');
  if (!button) return;
  selectCountryLayer(visibleSearchResults[Number(button.dataset.resultIndex)].layer);
});

document.addEventListener('pointerdown', (event) => {
  if (!searchWrap.contains(event.target)) closeSearchResults();
});

document.addEventListener('keydown', (event) => {
  if (event.key === '/' && document.activeElement !== searchInput) {
    event.preventDefault();
    searchInput.focus();
  }

  if (event.key === 'Escape' && searchResults.hidden) {
    if (selectedLayer) clearSelection();
    else if (activeWar) {
      setWarLayer('');
      warLayerSelect.focus();
    }
  }
});

randomButton.addEventListener('click', () => {
  const options = searchableCountries.filter(({ country }) => country.independent);
  const choice = options[Math.floor(Math.random() * options.length)];
  if (choice) selectCountryLayer(choice.layer);
});

document.querySelector('#show-world').addEventListener('click', () => {
  clearSelection();
  fitWorld();
});
document.querySelector('#reset-map').addEventListener('click', fitWorld);
document.querySelector('#zoom-in').addEventListener('click', () => map.zoomIn());
document.querySelector('#zoom-out').addEventListener('click', () => map.zoomOut());
waterBoundariesButton.addEventListener('click', () => {
  setWaterBoundariesVisible(!map.hasLayer(waterBoundaryLayer));
});
warLayerSelect.addEventListener('change', (event) => setWarLayer(event.target.value));
toggleWarDossierButton.addEventListener('click', () => {
  setWarDossierMinimized(!isWarDossierMinimized);
});
closeWarLayerButton.addEventListener('click', () => {
  setWarLayer('');
  warLayerSelect.focus();
});
themeToggleButton.addEventListener('click', () => {
  setTheme(activeTheme === 'dark' ? 'light' : 'dark', { persist: true });
});
systemThemeQuery.addEventListener('change', (event) => {
  if (followsSystemTheme) setTheme(event.matches ? 'dark' : 'light');
});

map.on('zoom moveend', () => {
  zoomStatus.textContent = `Zoom ${map.getZoom().toFixed(2).replace(/\.00$/, '')}`;
});
map.on('zoomend', updateWaterLabels);

window.addEventListener('resize', () => {
  map.invalidateSize({ pan: false });
});

window.requestAnimationFrame(initializeCountries);
