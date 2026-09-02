# World Map

A completely vibecoded interactive world map; it includes fun facts, country capitals, spoken languages, country search, and a very very pretty ui. I literally touched/read no code, so use at your own risk. Thank you Sam Altman for helping me become geographically literate. 

# Usage 

First, request a [CARTO basemap API key](https://carto.com/basemaps/apikey), then add it to `.env`:

```dotenv
VITE_CARTO_API_KEY=your_key_here
```

Then run:

```shell
npm install 
npm run dev
```

# Information I Did Not Write or Review

Country metadata comes from `world-countries`, with a reviewed overlay for time-sensitive and role-sensitive fields. The overlay was last checked on 9 August 2026 against the [EU member-state list](https://european-union.europa.eu/principles-countries-history/eu-countries_en), the [NATO member-country list](https://www.nato.int/en/about-us/organization/nato-member-countries), the [European Commission euro-area list](https://economy-finance.ec.europa.eu/euro/eu-countries-and-euro_en), the [SIX ISO 4217 currency list](https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-one.xml), and relevant official government sources. Boundaries come from Natural Earth through `world-atlas`; disputed boundaries and territorial groupings can differ between sources.

The optional war layers are curated views of principal belligerents and major combat contributors, reviewed on 12 August 2026. They use present-day country polygons only as geographic proxies for historical states, empires, divided countries, and changing borders; they are not territorial maps. Entry dates refer to the declaration, invasion, deployment, or first combat event explained in each country factoid. Sources include [Imperial War Museums on World War I](https://www.iwm.org.uk/history/how-the-world-went-to-war-in-1914), [Veterans Affairs Canada on Canada in World War I](https://www.veterans.gc.ca/en/remembrance/wars-and-conflicts/first-world-war), the [US Holocaust Memorial Museum World War II timeline](https://encyclopedia.ushmm.org/content/en/article/world-war-ii-key-dates), the [Korean Ministry of Patriots and Veterans Affairs contributor list](https://mpva.go.kr/english/contents.do?key=1829), the [U.S. Office of the Historian on the Gulf War](https://history.state.gov/milestones/1989-1992/gulf-war), [Encyclopaedia Britannica on the Vietnam War](https://www.britannica.com/event/Vietnam-War), and [NATO’s Afghanistan timeline](https://www.nato.int/en/what-we-do/operations-and-missions/nato-and-afghanistan).

# Screenshots 

![Main ScreenShot](images/main.png)
![World Map Fact](images/fact.png)
![War Mode](images/war.png)
![Dark Main ScreenShot](images/main-dark.png)
![Dark World Map Fact](images/fact-dark.png)
![Dark War Mode](images/war-dark.png)
