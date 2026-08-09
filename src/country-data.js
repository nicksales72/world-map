import sourceCountries from 'world-countries';

// The dependency is a broad ISO dataset, so this small overlay keeps volatile and
// role-sensitive fields current. Sources and the review date are documented in README.md.
const EU_MEMBER_SINCE = new Map([
  ['AUT', 1995],
  ['BEL', 1958],
  ['BGR', 2007],
  ['HRV', 2013],
  ['CYP', 2004],
  ['CZE', 2004],
  ['DNK', 1973],
  ['EST', 2004],
  ['FIN', 1995],
  ['FRA', 1958],
  ['DEU', 1958],
  ['GRC', 1981],
  ['HUN', 2004],
  ['IRL', 1973],
  ['ITA', 1958],
  ['LVA', 2004],
  ['LTU', 2004],
  ['LUX', 1958],
  ['MLT', 2004],
  ['NLD', 1958],
  ['POL', 2004],
  ['PRT', 1986],
  ['ROU', 2007],
  ['SVK', 2004],
  ['SVN', 2004],
  ['ESP', 1986],
  ['SWE', 1995],
]);

const COUNTRY_OVERRIDES = {
  ATA: {
    atlas: { statusTags: ['Antarctic Treaty area'] },
  },
  AUT: {
    languages: { deu: 'German' },
  },
  BFA: {
    atlas: {
      languageCount: '—',
      languageMetricLabel: 'Official / working',
      languageSummary: 'National languages (official); French and English (working)',
      facts: [
        'Burkina Faso recognizes its national languages as official; French and English serve as working languages.',
      ],
    },
  },
  BGR: {
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
    atlas: {
      facts: ['Bulgaria adopted the euro on 1 January 2026.'],
    },
  },
  BOL: {
    capital: ['Sucre', 'La Paz'],
    atlas: {
      capitalLabel: 'Sucre (constitutional); La Paz (seat of government)',
      languageCount: 37,
      languageMetricLabel: 'Official languages',
      languageSummary: 'Spanish and 36 Indigenous official languages',
      facts: [
        'Bolivia recognizes 37 official languages, including Spanish and 36 Indigenous languages.',
      ],
    },
  },
  CHE: {
    languages: {
      deu: 'German',
      fra: 'French',
      ita: 'Italian',
      roh: 'Romansh',
    },
    atlas: {
      capitalLabel: 'Bern (federal city)',
      facts: [
        "Bern is Switzerland's federal city; the constitution does not designate an official capital.",
      ],
    },
  },
  CHN: {
    borders: [
      'AFG',
      'BTN',
      'MMR',
      'IND',
      'KAZ',
      'NPL',
      'PRK',
      'KGZ',
      'LAO',
      'MNG',
      'PAK',
      'RUS',
      'TJK',
      'VNM',
    ],
  },
  CIV: {
    name: { common: "Côte d'Ivoire" },
  },
  CPV: {
    name: { common: 'Cabo Verde' },
  },
  CUB: {
    currencies: { CUP: { name: 'Cuban peso', symbol: '$' } },
    atlas: {
      facts: [
        'The convertible peso left circulation in 2021; the Cuban peso (CUP) is the current ISO-listed currency.',
      ],
    },
  },
  CUW: {
    currencies: { XCG: { name: 'Caribbean guilder', symbol: 'Cg' } },
    atlas: {
      facts: [
        'Curaçao replaced the Netherlands Antillean guilder with the Caribbean guilder in 2025.',
      ],
    },
  },
  FSM: {
    currencies: { USD: { name: 'United States dollar', symbol: '$' } },
  },
  GNQ: {
    capital: ['Ciudad de la Paz'],
    atlas: {
      facts: [
        "Ciudad de la Paz became Equatorial Guinea's capital by decree on 2 January 2026, replacing Malabo.",
      ],
    },
  },
  HKG: {
    capital: [],
    atlas: {
      capitalLabel: 'No official capital',
      facts: [
        'Hong Kong has no formally designated capital; Victoria is a historical city boundary, not its present capital.',
      ],
    },
  },
  IND: {
    languages: { hin: 'Hindi', eng: 'English' },
    atlas: {
      languageCount: 22,
      languageMetricLabel: 'Scheduled languages',
      languageSummary: 'Hindi and English (Union use); 22 scheduled languages',
      facts: [
        "India's constitution recognizes 22 scheduled languages; Hindi and English are used for Union government business.",
      ],
    },
  },
  ISR: {
    atlas: {
      capitalLabel: 'Jerusalem (status disputed)',
      languageCount: 2,
      languageMetricLabel: 'Language statuses',
      languageSummary: 'Hebrew (state language); Arabic (special status)',
      facts: [
        "Hebrew is Israel's state language, while Arabic has a constitutionally recognized special status.",
      ],
    },
  },
  LKA: {
    capital: ['Sri Jayawardenepura Kotte', 'Colombo'],
    borders: [],
    atlas: {
      capitalLabel: 'Sri Jayawardenepura Kotte (legislative); Colombo (executive and judicial)',
      facts: [
        "Sri Jayawardenepura Kotte is Sri Lanka's legislative capital; Colombo is its executive and judicial center.",
      ],
    },
  },
  MDA: {
    languages: { ron: 'Romanian' },
  },
  MLI: {
    atlas: {
      languageCount: 13,
      languageMetricLabel: 'Official languages',
      languageSummary: '13 national languages (official); French (working)',
      facts: [
        "Mali's 13 national languages are official languages; French now serves as a working language.",
      ],
    },
  },
  MSR: {
    capital: ['Plymouth', 'Brades'],
    atlas: {
      capitalLabel: 'Plymouth (de jure); Brades (government seat)',
      facts: [
        "Plymouth remains Montserrat's de jure capital, while the government operates from Brades.",
      ],
    },
  },
  NER: {
    atlas: {
      languageCount: 1,
      languageMetricLabel: 'National language',
      languageSummary: 'Hausa (national); French and English (working)',
      facts: [
        'Niger names Hausa as its national language, with French and English serving as working languages.',
      ],
    },
  },
  NRU: {
    atlas: {
      capitalLabel: 'No official capital; government offices are in Yaren',
      facts: [
        'Nauru has no official capital; its government offices are located in Yaren District.',
      ],
    },
  },
  PSE: {
    capital: ['East Jerusalem', 'Ramallah'],
    atlas: {
      capitalLabel: 'East Jerusalem (claimed); Ramallah (administrative center)',
      statusTags: ['UN observer state'],
    },
  },
  SLE: {
    currencies: { SLE: { name: 'Sierra Leonean leone', symbol: 'Le' } },
    atlas: {
      facts: [
        'The redenominated leone uses ISO code SLE; the old SLL currency code is obsolete.',
      ],
    },
  },
  SJM: {
    area: 61399,
    atlas: {
      capitalLabel: "No shared capital; Longyearbyen is Svalbard's administrative center",
      facts: [
        'Svalbard and Jan Mayen is an ISO statistical grouping of two separately administered Norwegian territories.',
      ],
    },
  },
  SWZ: {
    capital: ['Mbabane', 'Lobamba'],
    atlas: {
      capitalLabel: 'Mbabane (administrative); Lobamba (royal and legislative)',
      facts: [
        'Eswatini has two capitals: Mbabane is administrative, while Lobamba is royal and legislative.',
      ],
    },
  },
  SXM: {
    currencies: { XCG: { name: 'Caribbean guilder', symbol: 'Cg' } },
    languages: { nld: 'Dutch', eng: 'English' },
    atlas: {
      facts: [
        'Sint Maarten and Curaçao introduced the Caribbean guilder together in 2025.',
      ],
    },
  },
  TWN: {
    atlas: { statusTags: ['Self-governed; limited recognition'] },
  },
  UNK: {
    atlas: { statusTags: ['Partially recognized'] },
  },
  VAT: {
    unMember: false,
    atlas: {
      statusTags: ['UN observer (Holy See)'],
      facts: [
        'The Holy See, which represents Vatican City internationally, is a permanent UN observer rather than a UN member.',
      ],
    },
  },
  ZAF: {
    languages: {
      afr: 'Afrikaans',
      eng: 'English',
      nbl: 'Southern Ndebele',
      nso: 'Northern Sotho',
      sot: 'Southern Sotho',
      ssw: 'Swazi',
      tsn: 'Tswana',
      tso: 'Tsonga',
      ven: 'Venda',
      xho: 'Xhosa',
      zul: 'Zulu',
      sfs: 'South African Sign Language',
    },
    atlas: {
      capitalLabel: 'Pretoria (executive); Cape Town (legislative); Bloemfontein (judicial)',
      facts: [
        "South African Sign Language became South Africa's 12th official language in 2023.",
      ],
    },
  },
  ZWE: {
    currencies: { ZWG: { name: 'Zimbabwe Gold', symbol: 'ZiG' } },
    atlas: {
      facts: [
        "Zimbabwe Gold (ZWG), introduced in 2024, is Zimbabwe's current ISO-listed currency.",
      ],
    },
  },
};

const CALLING_CODE_OVERRIDES = {
  CAN: '+1',
  DOM: '+1 809, +1 829, +1 849',
  ESH: '+212 5288, +212 5289',
  KAZ: '+7',
  PRI: '+1 787, +1 939',
  RUS: '+7',
  SHN: '+290, +247',
  USA: '+1',
  VAT: '+39 06 698',
};

export const countries = sourceCountries.map((country) => {
  const override = COUNTRY_OVERRIDES[country.cca3] ?? {};
  const { atlas = {}, name, ...countryFields } = override;
  const commonNameChanged = name?.common && name.common !== country.name.common;

  return {
    ...country,
    ...countryFields,
    name: name ? { ...country.name, ...name } : country.name,
    altSpellings: commonNameChanged
      ? [...(countryFields.altSpellings ?? country.altSpellings ?? []), country.name.common]
      : (countryFields.altSpellings ?? country.altSpellings),
    atlas: {
      ...atlas,
      euMemberSince: EU_MEMBER_SINCE.get(country.cca3) ?? null,
    },
  };
});

const countryByCode = new Map(countries.map((country) => [country.cca3, country]));
const independentCountries = countries.filter((country) => country.independent && country.area > 0);
const listFormatter = new Intl.ListFormat('en-US', { style: 'long', type: 'conjunction' });
const areaFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
const factCache = new Map();

const shortList = (items, limit = 3) => {
  if (items.length <= limit) return listFormatter.format(items);
  return `${listFormatter.format(items.slice(0, limit))}, plus ${items.length - limit} more`;
};

const ordinal = (value) => {
  const remainder100 = value % 100;
  if (remainder100 >= 11 && remainder100 <= 13) return `${value}th`;
  if (value % 10 === 1) return `${value}st`;
  if (value % 10 === 2) return `${value}nd`;
  if (value % 10 === 3) return `${value}rd`;
  return `${value}th`;
};

const formatFactArea = (area) => `${areaFormatter.format(area)} km²`;

export const formatCallingCode = (country) => {
  const override = CALLING_CODE_OVERRIDES[country.cca3];
  if (override) return override;

  const { root, suffixes = [] } = country.idd ?? {};
  if (!root || !suffixes.length) return 'Not available';
  if (suffixes.length === 1) return `${root}${suffixes[0]}`;
  return suffixes.length <= 3
    ? suffixes.map((suffix) => `${root}${suffix}`).join(', ')
    : root;
};

export const getCountryFacts = (country) => {
  if (factCache.has(country.cca3)) return factCache.get(country.cca3);

  const name = country.name.common;
  const possessiveName = name.toLocaleLowerCase().endsWith('s') ? `${name}'` : `${name}'s`;
  const facts = [...(country.atlas.facts ?? [])];
  const borderCountries = (country.borders ?? [])
    .map((code) => countryByCode.get(code))
    .filter(Boolean);
  const borderNames = borderCountries.map((borderCountry) => borderCountry.name.common);

  if (country.atlas.euMemberSince) {
    const usesEuro = Object.hasOwn(country.currencies ?? {}, 'EUR');
    facts.push(
      `${name} has been an EU member since ${country.atlas.euMemberSince}${
        usesEuro ? ' and is one of the 21 EU countries that use the euro.' : '.'
      }`,
    );
  }

  if (country.independent && country.area > 0) {
    const nearestSizeMatch = independentCountries
      .filter((candidate) => candidate.cca3 !== country.cca3)
      .reduce((nearest, candidate) =>
        Math.abs(candidate.area - country.area) < Math.abs(nearest.area - country.area)
          ? candidate
          : nearest,
      );

    facts.push(
      `${possessiveName} closest match by area is ${nearestSizeMatch.name.common}, at ${formatFactArea(nearestSizeMatch.area)} versus ${formatFactArea(country.area)}.`,
    );
  }

  if (country.landlocked && borderCountries.length && borderCountries.every((neighbor) => neighbor.landlocked)) {
    facts.push(`${name} is doubly landlocked: every country on its border is also landlocked.`);
  } else if (country.landlocked) {
    facts.push(
      `${name} is landlocked${borderNames.length ? ` and shares boundaries with ${shortList(borderNames)}` : ''}.`,
    );
  } else if (borderNames.length) {
    facts.push(`${name} shares land boundaries with ${shortList(borderNames)}.`);
  } else {
    facts.push(`${name} has no land boundaries listed in this atlas.`);
  }

  if (country.independent && country.area > 0) {
    const regionalPeers = independentCountries
      .filter((peer) => peer.subregion === country.subregion)
      .sort((a, b) => b.area - a.area);
    const regionalRank = regionalPeers.findIndex((peer) => peer.cca3 === country.cca3) + 1;

    if (regionalRank && regionalPeers.length > 1) {
      facts.push(
        `By area, ${name} ranks ${ordinal(regionalRank)} of ${regionalPeers.length} independent countries in ${country.subregion}.`,
      );
    } else {
      const worldRank = [...independentCountries]
        .sort((a, b) => b.area - a.area)
        .findIndex((peer) => peer.cca3 === country.cca3) + 1;
      facts.push(`${name} ranks ${ordinal(worldRank)} among independent countries by area.`);
    }
  } else if (country.area > 0) {
    facts.push(`${name} covers ${formatFactArea(country.area)} according to the atlas metadata.`);
  }

  const [currencyCode, currency] = Object.entries(country.currencies ?? {})[0] ?? [];
  if (currencyCode && currency) {
    const otherUsers = independentCountries
      .filter(
        (candidate) =>
          candidate.cca3 !== country.cca3 && Object.hasOwn(candidate.currencies ?? {}, currencyCode),
      )
      .map((candidate) => candidate.name.common);

    facts.push(
      otherUsers.length
        ? `${currency.name} (${currencyCode}) is also used by ${shortList(otherUsers)}.`
        : `${currency.name} (${currencyCode}) is unique to ${name} among the independent countries in this atlas.`,
    );
  }

  const nativeName = [...new Set(Object.values(country.name.native ?? {}).map(({ common }) => common))]
    .find((value) => value && value.toLocaleLowerCase() !== name.toLocaleLowerCase());
  const demonym = country.demonyms?.eng?.m;

  if (nativeName) {
    facts.push(`A native-language form of the country's name is "${nativeName}".`);
  } else if (demonym) {
    facts.push(`The English demonym for a person from ${name} is "${demonym}".`);
  }

  if (country.name.official && country.name.official !== name) {
    facts.push(`${possessiveName} official state name is "${country.name.official}".`);
  }

  if (country.subregion || country.region) {
    facts.push(
      `${name} is grouped in ${country.subregion || country.region}${
        country.subregion && country.region ? `, within ${country.region}` : ''
      }.`,
    );
  }

  if (country.tld?.length) {
    facts.push(
      `${possessiveName} country-code internet ${country.tld.length === 1 ? 'domain is' : 'domains include'} ${shortList(country.tld)}.`,
    );
  }

  const uniqueFacts = [...new Set(facts.filter(Boolean))];
  factCache.set(country.cca3, uniqueFacts);
  return uniqueFacts;
};
