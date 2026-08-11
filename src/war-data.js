const expandParticipants = (groups) => {
  const participants = {};

  for (const { countries, ...participant } of groups) {
    for (const countryCode of countries) {
      if (Object.hasOwn(participants, countryCode)) {
        throw new Error(`Duplicate war participant country code: ${countryCode}`);
      }
      participants[countryCode] = { ...participant };
    }
  }

  return participants;
};

const warDefinitions = [
  {
    id: 'ww1',
    name: 'World War I',
    years: '1914–1918',
    period: '28 July 1914 – 11 November 1918',
    summary:
      'Principal sovereign belligerents are shown; dominions, colonies, and smaller belligerents are not exhaustive.',
    sides: {
      allies: {
        label: 'Entente & associates',
        color: '#39788b',
        borderColor: '#245664',
        dashArray: null,
        pattern: 'solid',
      },
      central: {
        label: 'Central Powers',
        color: '#c45a43',
        borderColor: '#913b2c',
        dashArray: '6 4',
        pattern: 'dashed',
      },
    },
    participantGroups: [
      {
        countries: ['AUT', 'HUN'],
        entity: 'Austria-Hungary',
        side: 'central',
        joined: '28 July 1914',
        entry: 'Austria-Hungary declared war on Serbia, opening the wider conflict.',
        role:
          'It fought major campaigns in the Balkans, on the Eastern Front, and against Italy.',
      },
      {
        countries: ['SRB'],
        entity: 'Kingdom of Serbia',
        side: 'allies',
        joined: '28 July 1914',
        entry: 'Serbia became a belligerent when Austria-Hungary declared war on it.',
        role:
          'Its army resisted the opening invasions, withdrew into exile, and later returned on the Macedonian Front.',
      },
      {
        countries: ['DEU'],
        entity: 'German Empire',
        side: 'central',
        joined: '1 August 1914',
        entry: 'Germany declared war on Russia after the July Crisis and Russian mobilization.',
        role:
          'It was the principal Central Power, fighting on both European fronts and at sea around the world.',
      },
      {
        countries: ['RUS'],
        entity: 'Russian Empire',
        side: 'allies',
        joined: '1 August 1914',
        entry: 'Russia entered open war when Germany declared war on it.',
        role:
          'It fought on the Eastern and Caucasus fronts until the revolutions led Russia out of the war.',
      },
      {
        countries: ['FRA'],
        entity: 'French Republic',
        side: 'allies',
        joined: '3 August 1914',
        entry: 'France entered when Germany declared war on it.',
        role:
          'It carried much of the Allied effort on the Western Front and fought in several overseas theaters.',
      },
      {
        countries: ['BEL'],
        entity: 'Kingdom of Belgium',
        side: 'allies',
        joined: '4 August 1914',
        entry: 'Neutral Belgium entered the war when German forces invaded.',
        role:
          'Belgian forces resisted the invasion while most of the country endured military occupation.',
      },
      {
        countries: ['GBR'],
        entity: 'United Kingdom & British Empire',
        side: 'allies',
        joined: '4 August 1914',
        entry: 'Britain declared war on Germany after the invasion of Belgium.',
        role:
          'It mobilized imperial land forces and used the Royal Navy to sustain a global war and blockade.',
      },
      {
        countries: ['JPN'],
        entity: 'Empire of Japan',
        side: 'allies',
        joined: '23 August 1914',
        entry: 'Japan declared war on Germany under its alliance with Britain.',
        role:
          'It seized German possessions in East Asia and the Pacific and protected Allied shipping.',
      },
      {
        countries: ['TUR'],
        entity: 'Ottoman Empire',
        side: 'central',
        joined: '29 October 1914',
        entry: 'Ottoman warships attacked Russian ports and vessels in the Black Sea.',
        role:
          'It fought in the Caucasus, Gallipoli, Mesopotamia, Sinai-Palestine, and Arabia.',
      },
      {
        countries: ['ITA'],
        entity: 'Kingdom of Italy',
        side: 'allies',
        joined: '23 May 1915',
        entry: 'After remaining neutral in 1914, Italy declared war on Austria-Hungary.',
        role:
          'It opened the Italian Front and later fought elsewhere in Europe and the Mediterranean.',
      },
      {
        countries: ['BGR'],
        entity: 'Kingdom of Bulgaria',
        side: 'central',
        joined: '14 October 1915',
        entry: 'Bulgaria declared war on Serbia and joined the Central Powers campaign there.',
        role:
          'It helped defeat Serbia and became the main Central Powers force on the Macedonian Front.',
      },
      {
        countries: ['ROU'],
        entity: 'Kingdom of Romania',
        side: 'allies',
        joined: '27 August 1916',
        entry: 'Romania declared war on Austria-Hungary and invaded Transylvania.',
        role:
          'Much of Romania was occupied after a counteroffensive, but it re-entered combat near the war’s end.',
      },
      {
        countries: ['USA'],
        entity: 'United States of America',
        side: 'allies',
        alignment: 'Associated Power',
        joined: '6 April 1917',
        entry: 'The United States declared war on Germany.',
        role:
          'It supplied finance, industry, naval power, and eventually a large army on the Western Front.',
      },
    ],
    source: {
      label: 'World War I sources',
      url: 'https://www.iwm.org.uk/history/how-the-world-went-to-war-in-1914',
    },
  },
  {
    id: 'ww2',
    name: 'World War II',
    years: '1939–1945',
    period: '1 September 1939 – 2 September 1945',
    summary:
      'Principal powers and selected major contributors are shown; occupied states, colonial forces, and smaller belligerents are not exhaustive.',
    sides: {
      allies: {
        label: 'Allies at entry',
        color: '#39788b',
        borderColor: '#245664',
        dashArray: null,
        pattern: 'solid',
      },
      axis: {
        label: 'Axis at entry',
        color: '#c45a43',
        borderColor: '#913b2c',
        dashArray: '6 4',
        pattern: 'dashed',
      },
      coAxis: {
        label: 'Axis co-belligerent',
        color: '#c49335',
        borderColor: '#85601e',
        dashArray: '1 4',
        pattern: 'dotted',
      },
    },
    participantGroups: [
      {
        countries: ['CHN'],
        entity: 'Republic of China',
        side: 'allies',
        joined: '7 July 1937',
        entry: 'Full-scale war with Japan began after the Marco Polo Bridge incident.',
        role:
          'China sustained the principal Asian land war against Japan and became a major Allied power.',
      },
      {
        countries: ['JPN'],
        entity: 'Empire of Japan',
        side: 'axis',
        joined: '7 July 1937',
        entry:
          'Japan’s conflict with China became full-scale war; it formally joined the Axis pact in 1940.',
        role: 'It conducted the Axis war across China, Southeast Asia, and the Pacific.',
      },
      {
        countries: ['DEU'],
        entity: 'Nazi Germany',
        side: 'axis',
        joined: '1 September 1939',
        entry: 'Germany invaded Poland, beginning World War II in Europe.',
        role:
          'It was the principal European Axis power and occupied much of continental Europe before its defeat.',
      },
      {
        countries: ['POL'],
        entity: 'Republic of Poland',
        side: 'allies',
        joined: '1 September 1939',
        entry: 'Poland entered the war resisting the German invasion.',
        role:
          'After occupation, its government-in-exile, armed forces abroad, and underground resistance kept fighting.',
      },
      {
        countries: ['GBR'],
        entity: 'United Kingdom & British Empire',
        side: 'allies',
        joined: '3 September 1939',
        entry: 'The United Kingdom declared war on Germany after its ultimatum expired.',
        role:
          'It led the continuing war after France fell and mobilized extensive imperial and Commonwealth forces.',
      },
      {
        countries: ['FRA'],
        entity: 'French Republic & Free France',
        side: 'allies',
        joined: '3 September 1939',
        entry: 'France declared war on Germany.',
        role:
          'France fought in 1939–40; Free French forces and the resistance continued after occupation.',
      },
      {
        countries: ['AUS'],
        entity: 'Commonwealth of Australia',
        side: 'allies',
        joined: '3 September 1939',
        entry: 'Australia announced that it was at war following Britain’s declaration.',
        role:
          'It made major naval, air, and land contributions in Europe, North Africa, Southeast Asia, and the Pacific.',
      },
      {
        countries: ['CAN'],
        entity: 'Dominion of Canada',
        side: 'allies',
        joined: '10 September 1939',
        entry: 'Canada independently declared war on Germany.',
        role:
          'It contributed major naval, air, industrial, and ground forces in the Atlantic and Europe.',
      },
      {
        countries: ['ITA'],
        entity: 'Kingdom of Italy',
        side: 'axis',
        alignment: 'Axis; Allied co-belligerent from 13 October 1943',
        joined: '10 June 1940',
        entry: 'Italy declared war on Britain and France.',
        role:
          'It fought in Europe and Africa before the royal government switched sides; northern Italy remained under an Axis regime.',
      },
      {
        countries: ['HUN'],
        entity: 'Kingdom of Hungary',
        side: 'axis',
        joined: '20 November 1940',
        entry: 'Hungary joined the Tripartite Pact.',
        role:
          'It participated in the invasions of Yugoslavia and the Soviet Union and remained a battlefield until 1945.',
      },
      {
        countries: ['ROU'],
        entity: 'Kingdom of Romania',
        side: 'axis',
        alignment: 'Axis; Allies from 23 August 1944',
        joined: '23 November 1940',
        entry: 'Romania joined the Tripartite Pact.',
        role:
          'It supplied oil and forces for the war against the USSR, then switched sides and fought through Central Europe.',
      },
      {
        countries: ['FIN'],
        entity: 'Republic of Finland',
        side: 'coAxis',
        joined: '26 June 1941',
        entry: 'Finland entered the Continuation War against the Soviet Union.',
        role:
          'It fought alongside Germany without joining the Axis pact, then expelled German forces from Finland.',
      },
      {
        countries: ['RUS'],
        entity: 'Soviet Union',
        side: 'allies',
        joined: '22 June 1941',
        entry: 'The Soviet Union entered the Allied war when Germany and its partners invaded.',
        role:
          'It bore the main European land war against Germany, captured Berlin, and later attacked Japan.',
      },
      {
        countries: ['USA'],
        entity: 'United States of America',
        side: 'allies',
        joined: '7 December 1941',
        entry: 'Japan attacked Pearl Harbor; the United States declared war the next day.',
        role:
          'It became the leading Allied industrial, naval, air, and expeditionary power in both main theaters.',
      },
    ],
    source: {
      label: 'World War II sources',
      url: 'https://encyclopedia.ushmm.org/content/en/article/world-war-ii-key-dates',
    },
  },
  {
    id: 'korean-war',
    name: 'Korean War',
    years: '1950–1953',
    period: '25 June 1950 – 27 July 1953',
    summary:
      'Core belligerents and selected major UN combat contributors are shown; medical and smaller troop contributors are not exhaustive.',
    sides: {
      unCommand: {
        label: 'South Korea & UN Command',
        color: '#39788b',
        borderColor: '#245664',
        dashArray: null,
        pattern: 'solid',
      },
      north: {
        label: 'North Korea & China',
        color: '#c45a43',
        borderColor: '#913b2c',
        dashArray: '6 4',
        pattern: 'dashed',
      },
      soviet: {
        label: 'Covert Soviet support',
        color: '#c49335',
        borderColor: '#85601e',
        dashArray: '1 4',
        pattern: 'dotted',
      },
    },
    participantGroups: [
      {
        countries: ['KOR'],
        entity: 'Republic of Korea',
        side: 'unCommand',
        joined: '25 June 1950',
        entry: 'South Korea entered the full-scale war when North Korean forces invaded.',
        role:
          'Its armed forces defended the South and later made up most of the UN-aligned ground strength.',
      },
      {
        countries: ['PRK'],
        entity: 'Democratic People’s Republic of Korea',
        side: 'north',
        joined: '25 June 1950',
        entry: 'North Korean forces crossed the 38th parallel in a general offensive.',
        role:
          'It initiated the conventional war and kept fighting with extensive Chinese and Soviet assistance.',
      },
      {
        countries: ['USA'],
        entity: 'United States of America',
        side: 'unCommand',
        joined: '27 June 1950',
        entry: 'President Truman ordered U.S. air and naval forces into combat under UN authority.',
        role:
          'It led UN Command and supplied most of its non-Korean troops, air power, naval power, and logistics.',
      },
      {
        countries: ['GBR'],
        entity: 'United Kingdom',
        side: 'unCommand',
        joined: '2 July 1950',
        entry: 'British warships entered combat off Korea.',
        role:
          'It made the second-largest non-Korean UN contribution, including naval forces and two infantry brigades.',
      },
      {
        countries: ['AUS'],
        entity: 'Commonwealth of Australia',
        side: 'unCommand',
        joined: '2 July 1950',
        entry: 'Royal Australian Air Force aircraft flew their first combat missions over Korea.',
        role: 'Australia contributed naval, air, and ground forces, including an infantry battalion.',
      },
      {
        countries: ['CAN'],
        entity: 'Canada',
        side: 'unCommand',
        joined: '5 July 1950',
        entry: 'Canada sent its first destroyers for UN service in the Far East.',
        role:
          'It contributed warships, air transport, pilots, and an infantry brigade that fought at Kapyong.',
      },
      {
        countries: ['CHN'],
        entity: 'People’s Republic of China',
        side: 'north',
        joined: '25 October 1950',
        entry: 'Chinese People’s Volunteers began their first major offensive.',
        role:
          'A mass Chinese ground intervention drove UN forces south and became the main opposing force.',
      },
      {
        countries: ['RUS'],
        entity: 'Soviet Union',
        side: 'soviet',
        joined: '1 November 1950',
        entry: 'Soviet-piloted MiG-15s began covert combat operations over Korea.',
        role:
          'The USSR supplied equipment, advisers, air defenses, aircraft, and secretly deployed fighter pilots.',
      },
      {
        countries: ['TUR'],
        entity: 'Republic of Turkey',
        side: 'unCommand',
        joined: '28 November 1950',
        entry: 'The Turkish Brigade first entered direct combat during the UN withdrawal at Kunu-ri.',
        role: 'It fielded one of the largest non-Korean UN ground contingents.',
      },
    ],
    source: {
      label: 'Korean War sources',
      url: 'https://www.britannica.com/event/Korean-War',
    },
  },
  {
    id: 'gulf-war',
    name: 'Gulf War',
    years: '1990–1991',
    period: '2 August 1990 – 28 February 1991',
    summary:
      'Iraq, Kuwait, and selected major coalition combatants are shown; the full multinational coalition is not exhaustive.',
    sides: {
      coalition: {
        label: 'Kuwait & coalition',
        color: '#39788b',
        borderColor: '#245664',
        dashArray: null,
        pattern: 'solid',
      },
      iraq: {
        label: 'Iraq',
        color: '#c45a43',
        borderColor: '#913b2c',
        dashArray: '6 4',
        pattern: 'dashed',
      },
    },
    participantGroups: [
      {
        countries: ['IRQ'],
        entity: 'Republic of Iraq',
        side: 'iraq',
        joined: '2 August 1990',
        entry: 'Iraqi land, air, and naval forces invaded Kuwait.',
        role:
          'Iraq occupied and annexed Kuwait before fighting the UN-authorized coalition’s air and ground campaigns.',
      },
      {
        countries: ['KWT'],
        entity: 'State of Kuwait',
        side: 'coalition',
        joined: '2 August 1990',
        entry: 'Kuwaiti forces resisted Iraq’s invasion.',
        role:
          'Its forces later operated from exile and joined the coalition campaign to liberate Kuwait.',
      },
      {
        countries: ['SAU'],
        entity: 'Kingdom of Saudi Arabia',
        side: 'coalition',
        joined: '6 August 1990',
        entry: 'Saudi Arabia authorized U.S. and coalition forces to deploy in its defense.',
        role:
          'It hosted the coalition buildup and contributed substantial air and ground forces.',
      },
      {
        countries: ['USA'],
        entity: 'United States of America',
        side: 'coalition',
        joined: '17 January 1991',
        entry: 'U.S.-led coalition air attacks began after the 1990 defensive buildup.',
        role:
          'It organized and commanded the coalition and supplied most of its personnel, air power, and logistics.',
      },
      {
        countries: ['GBR'],
        entity: 'United Kingdom',
        side: 'coalition',
        joined: '17 January 1991',
        entry: 'British aircraft joined the opening coalition air campaign.',
        role:
          'It provided the largest non-U.S. Western contingent, including strike aircraft and an armored division.',
      },
      {
        countries: ['FRA'],
        entity: 'French Republic',
        side: 'coalition',
        joined: '17 January 1991',
        entry: 'French aircraft attacked Iraqi positions during the opening air campaign.',
        role:
          'Operation Daguet contributed combat aircraft and a division-sized force on the western flank.',
      },
      {
        countries: ['EGY'],
        entity: 'Arab Republic of Egypt',
        side: 'coalition',
        joined: '24 February 1991',
        entry: 'Egyptian ground forces advanced into occupied Kuwait with the coalition offensive.',
        role:
          'Egypt supplied one of the largest Arab contingents and helped lead the direct advance into Kuwait.',
      },
    ],
    source: {
      label: 'Gulf War sources',
      url: 'https://history.state.gov/milestones/1989-1992/gulf-war',
    },
  },
];

export const majorWars = warDefinitions.map(({ participantGroups, ...war }) => ({
  ...war,
  participants: expandParticipants(participantGroups),
}));

export const getMajorWar = (warId) => majorWars.find((war) => war.id === warId) ?? null;
