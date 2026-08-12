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
      'Principal belligerents and major imperial contributors are shown. Present-day polygons are proxies for 1914 borders; smaller belligerents and colonial forces are not exhaustive.',
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
        countries: ['MNE'],
        entity: 'Kingdom of Montenegro',
        side: 'allies',
        joined: '1 August 1914',
        entry: 'Montenegro joined Serbia and Russia against Austria-Hungary.',
        role:
          'Its army fought Austria-Hungary and covered Serbia’s retreat before Montenegro was occupied in 1916.',
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
        entity: 'United Kingdom',
        side: 'allies',
        joined: '4 August 1914',
        entry: 'Britain declared war on Germany after the invasion of Belgium.',
        role:
          'It mobilized imperial land forces and used the Royal Navy to sustain a global war and blockade.',
      },
      {
        countries: ['AUS'],
        entity: 'Commonwealth of Australia',
        side: 'allies',
        joined: '4 August 1914',
        entry: 'Britain’s declaration of war automatically placed Australia at war with Germany.',
        role:
          'Australian forces fought in the Pacific, at Gallipoli, in the Middle East, and on the Western Front.',
      },
      {
        countries: ['CAN'],
        entity: 'Dominions of Canada & Newfoundland',
        side: 'allies',
        joined: '4 August 1914',
        entry:
          'Britain’s declaration of war automatically placed Canada and the separate Dominion of Newfoundland at war.',
        role:
          'Canada fielded the Canadian Expeditionary Force, while Newfoundland also sent forces to Gallipoli and the Western Front.',
      },
      {
        countries: ['NZL'],
        entity: 'Dominion of New Zealand',
        side: 'allies',
        joined: '4 August 1914',
        entry: 'Britain’s declaration of war automatically placed New Zealand at war with Germany.',
        role:
          'New Zealand occupied German Samoa and fought at Gallipoli, on the Western Front, and in Sinai-Palestine.',
      },
      {
        countries: ['ZAF'],
        entity: 'Union of South Africa',
        side: 'allies',
        joined: '4 August 1914',
        entry: 'Britain’s declaration placed South Africa at war; its government approved active service.',
        role:
          'South African forces conquered German South West Africa and served in East Africa, Egypt, and Europe.',
      },
      {
        countries: ['IND', 'PAK', 'BGD', 'MMR'],
        entity: 'British India',
        side: 'allies',
        joined: '4 August 1914',
        entry:
          'British India entered with the British Empire; these polygons approximate its 1914 territory.',
        role:
          'About 1.5 million Indian Army personnel served in Europe, Africa, Gallipoli, and the Middle East.',
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
        countries: ['PRT'],
        entity: 'Portuguese Republic',
        side: 'allies',
        joined: '9 March 1916',
        entry: 'Germany declared war after Portugal seized German ships at Britain’s request.',
        role:
          'Portugal fought German forces in Africa and sent an expeditionary corps to the Western Front.',
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
        countries: ['GRC'],
        entity: 'Kingdom of Greece',
        side: 'allies',
        joined: '28 June 1917',
        entry: 'The Venizelos government formally declared war on the Central Powers.',
        role:
          'Greek forces made a substantial contribution to the final Allied offensive on the Macedonian Front.',
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
      'Principal belligerents and major contributors are shown. The 1937 Sino-Japanese War is included as the Asian theater’s precursor; present-day polygons and smaller forces are not exhaustive.',
    sides: {
      allies: {
        label: 'Allied alignment',
        color: '#39788b',
        borderColor: '#245664',
        dashArray: null,
        pattern: 'solid',
      },
      axis: {
        label: 'Axis alignment',
        color: '#c45a43',
        borderColor: '#913b2c',
        dashArray: '6 4',
        pattern: 'dashed',
      },
      coAxis: {
        label: 'Co-belligerent with Axis',
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
          'After German and Soviet occupation, its government-in-exile, armed forces abroad, and underground resistance kept fighting.',
      },
      {
        countries: ['GBR'],
        entity: 'United Kingdom',
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
        countries: ['NZL'],
        entity: 'Dominion of New Zealand',
        side: 'allies',
        joined: '3 September 1939',
        entry: 'New Zealand declared war on Germany in its own right.',
        role:
          'It made major land, naval, and air contributions in the Mediterranean, Europe, and Pacific.',
      },
      {
        countries: ['IND', 'PAK', 'BGD'],
        entity: 'British India',
        side: 'allies',
        joined: '3 September 1939',
        entry:
          'British India entered with Britain; these present-day polygons approximate its wartime territory.',
        role:
          'Its armed forces grew to about 2.5 million and fought in Africa, Italy, the Middle East, Malaya, and Burma.',
      },
      {
        countries: ['MMR'],
        entity: 'British Burma',
        side: 'allies',
        joined: '3 September 1939',
        entry: 'Burma entered as a British colony and became a major battlefield after Japan invaded.',
        role:
          'Allied forces, local troops, and resistance movements fought a long campaign to retake Burma from Japan.',
      },
      {
        countries: ['ZAF'],
        entity: 'Union of South Africa',
        side: 'allies',
        joined: '6 September 1939',
        entry: 'South Africa declared war on Germany after a parliamentary decision.',
        role:
          'Its forces fought in East and North Africa, Madagascar, and Italy, while its ports supported Allied shipping.',
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
        countries: ['DNK'],
        entity: 'Kingdom of Denmark',
        side: 'allies',
        joined: '9 April 1940',
        entry: 'Germany invaded neutral Denmark, whose conventional forces surrendered that day.',
        role:
          'Denmark remained occupied, but resistance, merchant sailors, and Free Danish forces supported the Allies.',
      },
      {
        countries: ['NOR'],
        entity: 'Kingdom of Norway',
        side: 'allies',
        joined: '9 April 1940',
        entry: 'Germany invaded neutral Norway.',
        role:
          'Its government-in-exile, armed forces, resistance, and large merchant fleet continued the war after occupation.',
      },
      {
        countries: ['BEL'],
        entity: 'Kingdom of Belgium',
        side: 'allies',
        joined: '10 May 1940',
        entry: 'Germany invaded neutral Belgium.',
        role:
          'After the 18-day campaign, Belgian forces abroad, the resistance, and the Belgian Congo supported the Allies.',
      },
      {
        countries: ['NLD'],
        entity: 'Kingdom of the Netherlands',
        side: 'allies',
        joined: '10 May 1940',
        entry: 'Germany invaded the neutral Netherlands.',
        role:
          'Its government-in-exile, navy, merchant fleet, resistance, and overseas forces continued fighting.',
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
        countries: ['GRC'],
        entity: 'Kingdom of Greece',
        side: 'allies',
        joined: '28 October 1940',
        entry: 'Greece entered the war when Italy invaded from occupied Albania.',
        role:
          'It repelled Italy before German occupation; exiled forces, merchant shipping, and resistance kept fighting.',
      },
      {
        countries: ['SVK'],
        entity: 'Slovak Republic',
        side: 'axis',
        alignment: 'Axis; major anti-Axis uprising from 29 August 1944',
        joined: '1 September 1939',
        entry: 'Slovak forces joined Germany’s invasion of Poland.',
        role:
          'The Axis client state later fought the USSR; resistance forces launched the Slovak National Uprising in 1944.',
      },
      {
        countries: ['HUN'],
        entity: 'Kingdom of Hungary',
        side: 'axis',
        joined: '11 April 1941',
        entry: 'Hungarian forces invaded Yugoslavia alongside the Axis.',
        role:
          'It participated in the invasions of Yugoslavia and the Soviet Union and remained a battlefield until 1945.',
      },
      {
        countries: ['ROU'],
        entity: 'Kingdom of Romania',
        side: 'axis',
        alignment: 'Axis; Allies from 23 August 1944',
        joined: '22 June 1941',
        entry: 'Romania joined Germany’s invasion of the Soviet Union.',
        role:
          'It supplied oil and forces for the war against the USSR, then switched sides and fought through Central Europe.',
      },
      {
        countries: ['SRB'],
        entity: 'Kingdom of Yugoslavia & Yugoslav Partisans',
        side: 'allies',
        alignment: 'Allied Yugoslavia (present-day Serbia proxy)',
        joined: '6 April 1941',
        entry: 'Axis powers invaded Yugoslavia.',
        role:
          'After rapid occupation, rival resistance movements fought on; the Partisans became a major Allied army.',
      },
      {
        countries: ['HRV'],
        entity: 'Independent State of Croatia',
        side: 'axis',
        joined: '15 June 1941',
        entry: 'The German-Italian client state joined the Tripartite Pact after Yugoslavia’s partition.',
        role:
          'Its forces fought the Partisans and supported the Axis, while many Croats also served in the resistance.',
      },
      {
        countries: ['FIN'],
        entity: 'Republic of Finland',
        side: 'coAxis',
        alignment: 'Co-belligerent with Germany; fought Germany from September 1944',
        joined: '26 June 1941',
        entry: 'Finland entered the Continuation War against the Soviet Union.',
        role:
          'It fought alongside Germany without joining the Axis pact, then expelled German forces from Finland.',
      },
      {
        countries: ['RUS'],
        entity: 'Soviet Union',
        side: 'allies',
        alignment: 'Invaded Poland in 1939; Allied power from 22 June 1941',
        joined: '17 September 1939',
        entry: 'The Soviet Union invaded eastern Poland under the secret terms of the Nazi-Soviet pact.',
        role:
          'After earlier expansion and war with Finland, it bore the main European land war against Germany from June 1941 and later attacked Japan.',
      },
      {
        countries: ['BGR'],
        entity: 'Kingdom of Bulgaria',
        side: 'axis',
        alignment: 'Axis; Allies from 8 September 1944',
        joined: '13 December 1941',
        entry: 'Bulgaria declared war on Britain and the United States.',
        role:
          'It occupied Balkan territory without declaring war on the USSR, then switched sides and fought Germany.',
      },
      {
        countries: ['PHL'],
        entity: 'Commonwealth of the Philippines',
        side: 'allies',
        joined: '8 December 1941',
        entry: 'Japanese forces attacked the U.S.-administered Philippine Commonwealth.',
        role:
          'Filipino and U.S. forces fought the invasion, and a large guerrilla resistance continued through occupation.',
      },
      {
        countries: ['THA'],
        entity: 'Kingdom of Thailand',
        side: 'axis',
        alignment: 'Japanese ally; Free Thai movement supported Allies',
        joined: '8 December 1941',
        entry: 'Thailand briefly resisted a Japanese invasion before agreeing to an alliance.',
        role:
          'Its government declared war on Britain and the United States, while the Free Thai movement aided the Allies.',
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
      {
        countries: ['BRA'],
        entity: 'United States of Brazil',
        side: 'allies',
        joined: '22 August 1942',
        entry: 'Brazil declared war on Germany and Italy after Axis submarines sank Brazilian ships.',
        role:
          'It defended the South Atlantic, hosted strategic air bases, and sent an expeditionary force to Italy.',
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
      'Core belligerents and all 16 states that deployed combat units under UN Command are shown. Medical-support states are not highlighted; fighting ended with an armistice, not a peace treaty.',
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
        countries: ['NLD'],
        entity: 'Kingdom of the Netherlands',
        side: 'unCommand',
        joined: 'July 1950',
        entry: 'A Dutch destroyer joined UN naval operations; an infantry battalion followed later in 1950.',
        role:
          'The Netherlands contributed rotating warships and a ground battalion that fought throughout the war.',
      },
      {
        countries: ['NZL'],
        entity: 'New Zealand',
        side: 'unCommand',
        joined: 'July 1950',
        entry: 'New Zealand dispatched two frigates for UN service around Korea.',
        role:
          'It maintained a naval presence and fielded an artillery regiment that fought with Commonwealth forces.',
      },
      {
        countries: ['FRA'],
        entity: 'French Republic',
        side: 'unCommand',
        joined: 'July 1950',
        entry: 'France assigned a naval vessel to UN operations; a volunteer infantry battalion followed.',
        role:
          'The French battalion fought with the U.S. 2nd Infantry Division in major campaigns through 1953.',
      },
      {
        countries: ['PHL'],
        entity: 'Republic of the Philippines',
        side: 'unCommand',
        joined: '19 September 1950',
        entry: 'The first Philippine Expeditionary Force battalion arrived in Korea.',
        role:
          'Five Philippine battalion combat teams served in succession under UN Command.',
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
        countries: ['ZAF'],
        entity: 'Union of South Africa',
        side: 'unCommand',
        joined: '19 November 1950',
        entry: 'No. 2 Squadron of the South African Air Force began combat operations from Japan.',
        role:
          'Its fighter pilots flew thousands of ground-attack and interdiction sorties with a U.S. fighter group.',
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
        countries: ['THA'],
        entity: 'Kingdom of Thailand',
        side: 'unCommand',
        joined: 'November 1950',
        entry: 'Thai ground and naval contingents arrived for service under UN Command.',
        role: 'Thailand contributed an infantry regiment, warships, and an air transport unit.',
      },
      {
        countries: ['TUR'],
        entity: 'Republic of Turkey',
        side: 'unCommand',
        joined: '28 November 1950',
        entry: 'The Turkish Brigade first entered direct combat during the UN withdrawal at Kunu-ri.',
        role: 'It fielded one of the largest non-Korean UN ground contingents.',
      },
      {
        countries: ['GRC'],
        entity: 'Kingdom of Greece',
        side: 'unCommand',
        joined: 'December 1950',
        entry: 'A Greek transport flight and infantry battalion deployed to Korea.',
        role:
          'Greek aircraft supported UN logistics while its battalion fought with U.S. formations.',
      },
      {
        countries: ['BEL'],
        entity: 'Kingdom of Belgium',
        side: 'unCommand',
        joined: '31 January 1951',
        entry: 'The Belgian-Luxembourg battalion arrived in Korea.',
        role:
          'Belgian troops served as an infantry battalion in major defensive and offensive operations.',
      },
      {
        countries: ['LUX'],
        entity: 'Grand Duchy of Luxembourg',
        side: 'unCommand',
        joined: '31 January 1951',
        entry: 'A Luxembourg platoon arrived as part of the Belgian-Luxembourg battalion.',
        role:
          'Two successive volunteer contingents fought within the combined battalion.',
      },
      {
        countries: ['COL'],
        entity: 'Republic of Colombia',
        side: 'unCommand',
        joined: 'May 1951',
        entry: 'A Colombian frigate entered Korean waters; an infantry battalion followed in June.',
        role:
          'Colombia was the only Latin American state to provide UN combat forces, both naval and ground.',
      },
      {
        countries: ['ETH'],
        entity: 'Ethiopian Empire',
        side: 'unCommand',
        joined: 'May 1951',
        entry: 'The first Ethiopian Kagnew Battalion arrived for service with UN Command.',
        role:
          'Three successive Kagnew battalions fought attached to the U.S. 7th Infantry Division.',
      },
    ],
    source: {
      label: 'Korean Ministry of Patriots and Veterans Affairs contributor list',
      url: 'https://mpva.go.kr/english/contents.do?key=1829',
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
        countries: ['CAN'],
        entity: 'Canada',
        side: 'coalition',
        joined: '24 August 1990',
        entry: 'Three Canadian warships sailed for coalition operations in the Persian Gulf.',
        role:
          'Canada enforced the embargo and contributed CF-18 combat aircraft, naval forces, transports, and a field hospital.',
      },
      {
        countries: ['SYR'],
        entity: 'Syrian Arab Republic',
        side: 'coalition',
        joined: 'September 1990',
        entry: 'Syria deployed an armored division to Saudi Arabia as part of the Arab coalition force.',
        role:
          'Its large ground contingent joined the coalition facing Iraqi forces in and around Kuwait.',
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
  {
    id: 'vietnam-war',
    name: 'Vietnam War',
    years: '1954–1975',
    period: '1954 – 30 April 1975',
    summary:
      'Principal belligerents and major foreign combat contributors are shown. No single start date is universally accepted. Vietnam’s present-day polygon represents opposing Vietnamese forces that the map cannot separate.',
    sides: {
      south: {
        label: 'South Vietnam’s allies',
        color: '#39788b',
        borderColor: '#245664',
        dashArray: null,
        pattern: 'solid',
      },
      northSupport: {
        label: 'North Vietnamese military support',
        color: '#c45a43',
        borderColor: '#913b2c',
        dashArray: '6 4',
        pattern: 'dashed',
      },
      divided: {
        label: 'Divided Vietnam (polygon proxy)',
        color: '#c49335',
        borderColor: '#85601e',
        dashArray: '1 4',
        pattern: 'dotted',
      },
    },
    participantGroups: [
      {
        countries: ['VNM'],
        entity: 'North Vietnam, South Vietnam & Viet Cong',
        side: 'divided',
        alignment: 'Opposing Vietnamese forces (present-day polygon proxy)',
        joined: '1954',
        entry:
          'The Geneva settlement ended French rule and provisionally divided Vietnam as rival states and insurgent forces emerged.',
        role:
          'North Vietnam and the Viet Cong fought to reunify the country under communist rule; South Vietnam fought to survive with foreign support until Saigon fell in 1975.',
      },
      {
        countries: ['AUS'],
        entity: 'Commonwealth of Australia',
        side: 'south',
        joined: 'July 1962',
        entry: 'The Australian Army Training Team Vietnam began arriving in South Vietnam.',
        role:
          'Australia later deployed a task force and substantial ground, air, and naval forces.',
      },
      {
        countries: ['USA'],
        entity: 'United States of America',
        side: 'south',
        joined: '8 March 1965',
        entry: 'U.S. Marines landed at Da Nang as the first regular American ground combat units.',
        role:
          'The United States was South Vietnam’s principal external ally and supplied most allied combat and logistical power.',
      },
      {
        countries: ['KOR'],
        entity: 'Republic of Korea',
        side: 'south',
        joined: 'September 1964',
        entry: 'South Korea deployed its first military contingent to South Vietnam.',
        role:
          'It later supplied the largest non-U.S. foreign troop contingent, including two army divisions and a marine brigade.',
      },
      {
        countries: ['NZL'],
        entity: 'New Zealand',
        side: 'south',
        joined: 'June 1964',
        entry: 'New Zealand deployed a non-combat engineer detachment; an artillery battery followed in 1965.',
        role:
          'New Zealand artillery, infantry companies, medical teams, and other personnel served with allied forces.',
      },
      {
        countries: ['CHN'],
        entity: 'People’s Republic of China',
        side: 'northSupport',
        joined: '1965',
        entry: 'China began deploying anti-aircraft and engineering units to North Vietnam.',
        role:
          'Chinese personnel protected and repaired northern infrastructure while China supplied arms and matériel.',
      },
      {
        countries: ['RUS'],
        entity: 'Soviet Union',
        side: 'northSupport',
        joined: '1965',
        entry: 'Soviet missile specialists began strengthening North Vietnam’s air defenses.',
        role:
          'The USSR supplied aircraft, missiles, weapons, matériel, and advisers to North Vietnam.',
      },
      {
        countries: ['THA'],
        entity: 'Kingdom of Thailand',
        side: 'south',
        joined: '1967',
        entry: 'Thailand deployed the Queen’s Cobras volunteer regiment to South Vietnam.',
        role:
          'It later fielded a division-sized force, while Thai bases supported the wider U.S. air campaign.',
      },
    ],
    source: {
      label: 'Encyclopaedia Britannica Vietnam War overview',
      url: 'https://www.britannica.com/event/Vietnam-War',
    },
  },
  {
    id: 'afghanistan-war',
    name: 'War in Afghanistan',
    years: '2001–2021',
    period: '7 October 2001 – 30 August 2021',
    summary:
      'Opposing Afghan forces and selected major coalition combat contributors are shown. Afghanistan’s present-day polygon represents a changing war between the Taliban, al-Qaeda, the Northern Alliance, and the later Afghan republic.',
    sides: {
      coalition: {
        label: 'Afghan government’s coalition allies',
        color: '#39788b',
        borderColor: '#245664',
        dashArray: null,
        pattern: 'solid',
      },
      contested: {
        label: 'Contested Afghanistan (polygon proxy)',
        color: '#c49335',
        borderColor: '#85601e',
        dashArray: '1 4',
        pattern: 'dotted',
      },
    },
    participantGroups: [
      {
        countries: ['AFG'],
        entity: 'Taliban, al-Qaeda, Northern Alliance & Afghan republic',
        side: 'contested',
        alignment: 'Opposing Afghan forces (present-day polygon proxy)',
        joined: '7 October 2001',
        entry:
          'U.S. and British strikes opened the intervention against Taliban and al-Qaeda targets alongside anti-Taliban Afghan forces.',
        role:
          'The Taliban regime fell in 2001 but regrouped against the new republic and foreign coalition, retaking Kabul in August 2021.',
      },
      {
        countries: ['USA'],
        entity: 'United States of America',
        side: 'coalition',
        joined: '7 October 2001',
        entry: 'The United States opened Operation Enduring Freedom with air strikes.',
        role:
          'It led the coalition and conducted counterterrorism, counterinsurgency, training, and support missions until withdrawal.',
      },
      {
        countries: ['GBR'],
        entity: 'United Kingdom',
        side: 'coalition',
        joined: '7 October 2001',
        entry: 'British forces joined the opening strikes and subsequent ground campaign.',
        role:
          'Britain initially led ISAF and later fought a sustained campaign in Helmand while training Afghan forces.',
      },
      {
        countries: ['AUS'],
        entity: 'Commonwealth of Australia',
        side: 'coalition',
        joined: '11 October 2001',
        entry: 'Australia began Operation Slipper, its contribution to the coalition campaign.',
        role:
          'It deployed special operations, air, logistical, reconstruction, combat, and training forces, especially in Uruzgan.',
      },
      {
        countries: ['CAN'],
        entity: 'Canada',
        side: 'coalition',
        joined: 'October 2001',
        entry: 'Canada began Operation Apollo and deployed naval, air, and special operations forces.',
        role:
          'Canada later fielded ground forces, led demanding combat operations in Kandahar, and trained Afghan forces.',
      },
      {
        countries: ['FRA'],
        entity: 'French Republic',
        side: 'coalition',
        joined: 'October 2001',
        entry: 'France began deploying naval and air forces in support of coalition operations.',
        role:
          'France contributed naval aviation, air, special operations, and ground forces before ending its combat mission in 2012.',
      },
      {
        countries: ['DEU'],
        entity: 'Federal Republic of Germany',
        side: 'coalition',
        joined: 'January 2002',
        entry: 'German forces deployed with the first UN-authorized ISAF contingents.',
        role:
          'Germany led security and reconstruction operations in northern Afghanistan and trained Afghan forces.',
      },
      {
        countries: ['ITA'],
        entity: 'Italian Republic',
        side: 'coalition',
        joined: 'January 2002',
        entry: 'Italian forces deployed with the first ISAF contingents.',
        role:
          'Italy later led ISAF’s western regional command and contributed combat, reconstruction, and training forces.',
      },
      {
        countries: ['DNK'],
        entity: 'Kingdom of Denmark',
        side: 'coalition',
        joined: 'January 2002',
        entry: 'Denmark deployed special operations and air personnel to the U.S.-led campaign.',
        role:
          'It later fielded a sustained combat contingent alongside British forces in Helmand.',
      },
      {
        countries: ['NLD'],
        entity: 'Kingdom of the Netherlands',
        side: 'coalition',
        joined: '2002',
        entry: 'Dutch forces joined Operation Enduring Freedom and ISAF missions.',
        role:
          'The Netherlands contributed air, naval, special operations, reconstruction, and combat forces, notably in Uruzgan.',
      },
      {
        countries: ['POL'],
        entity: 'Republic of Poland',
        side: 'coalition',
        joined: 'March 2002',
        entry: 'Poland deployed its first military contingent to Afghanistan.',
        role:
          'It later led a large combat task force responsible for security operations in Ghazni province.',
      },
    ],
    source: {
      label: 'NATO Afghanistan timeline',
      url: 'https://www.nato.int/en/what-we-do/operations-and-missions/nato-and-afghanistan',
    },
  },
];

export const majorWars = warDefinitions.map(({ participantGroups, ...war }) => ({
  ...war,
  participants: expandParticipants(participantGroups),
}));

export const getMajorWar = (warId) => majorWars.find((war) => war.id === warId) ?? null;
