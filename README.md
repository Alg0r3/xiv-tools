# XIV Tools

A web application built with React.js and Node.js, offering some useful tools related to the game Final Fantasy XIV.

## Table of Contents

- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [Weather Forecast](#weather-forecast)
    - [API](#api)
        - [String Query](#string-query)
        - [ElasticSearch Query](#elasticsearch-query)
    - [Weather in Eorzea](#weather-in-eorzea)
        - [Forecasts](#forecasts)
- [Timezone Converter](#timezone-converter)

## Technologies

- ECMAScript 6
- [Node 14.17.4](#node)
- [React 17.0.1](#react)
- [MongoDB](#mongodb)
- [XIVAPI](https://xivapi.com)

## Setup

No real set up at the moment since the project is still in progress, though a basic one could be:

1. Clone this repository
2. Run `npm install` in the client folder 
3. Run `npm install` in the server folder 

## Usage

1. Run `nodemon index.js` in the server folder to launch the Node.js server
2. Run `npm start` in the client folder to run the app in the developpement mode
3. Go to `localhost:3000` to preview the web application in the browser

> The MongoDB database is currently down, so some errors may occur. 

## Node

Node.js is a JavaScript runtime environment built on Chrome’s V8 JavaScript engine. It allows its users to have their JavaScript code compiled outside of the DOM browser context.

That means that with Node.js, JavaScript can be used to do things that weren’t possible in the past like:
- Reading/writing files on a computer
- Connecting to a database
- Acting as a server for content

| Shines for | Not good for |
| - | - |
| Non-blocking | Data calculations
| Event-driven | Processor intensive
| Data-intensive | Blocking Operations
| I/O intensive | --- |

> For this project, Node will be used to set up a simple server that’ll listen to requests from the React front-end and answer accordingly with the data needed. 
>
> This will lighten the burden on the http requests sent to the XIV API, since the server will do all the heavy lifting.

## React

React is a JavaScript library for building user interfaces.

It is used to build components that represent logical reusable parts of the UI.

The beauty of React is that the simplicity of building a component has been brought down to its theoritical minimum: it's just a JavaScript function that returns HTML in a special syntax called JSX, allowing an easy time combining JavaScript with HTML markup.

> For this project, React will be used to display the data returned by the Node server.

## MongoDB

MongoDB is a document-oriented NoSQL database used for high volume data storage.

Instead of using tables and rows as in the traditional relational databases, MongoDB makes use of collections and documents. 

Documents consist of key-value pairs which are the basic unit of data in MongoDB. Collections contain sets of documents and function which is the equivalent of relational database tables.

Below are some of the key term differences between MongoDB and RDBMS:

| RDBMS | MongoDB | Difference |
| - | - | - |
| Table | Collection | In RDBMS, the table contains the columns and rows which are used to store the data whereas, in MongoDB, this same structure is known as a collection. The collection contains documents which in turn contains Fields, which in turn are key-value pairs |
| Row | Document | In RDBMS, the row represents a single, implicitly structured data item in a table. In MongoDB, the data is stored in documents.
| Column | Field | In RDBMS, the column denotes a set of data values. These in MongoDB are known as Fields |
| Joins | Embedded documents | In RDBMS, data is sometimes spread across various tables and in order to show a complete view of all data, a join is sometimes formed across tables to get the data. In MongoDB, the data is normally stored in a single collection, but separated by using Embedded documents. So there is no concept of joins in MongoDB |

> At the time, using MongoDB and Express to practice working with the MERN stack seemed to be a good idea, but thinking about it now, this project doesn't require a database at all since the data can just be stored locally in .JSON files.

# Weather Forecast

## API

Data can be obtained through unofficial APIs created by players from data mining the game’s files.

For this project, [XIVAPI](https://xivapi.com) seems to be the most appropriate.

<p align="center"><img src="docs/xivapi.PNG"></p>

XIVAPI provides data in a JSON format via a REST API and the ability to quickly search all game content via ElasticSearch.

> The idea behind REST is to treat all server URLs as access points for the various resources on the server.

> ElasticSearch is a powerful analytics and full text search engine that stores data in JSON format. It allows you to store, search, and analyze huge volumes of data quickly and in near real-time and give back answers in milliseconds.

### String Query

The typical way of querying a RESTful API is directly through the url. By adding a variable `id`, it becomes possible to dynamically get the maps from a specific region.

Due to the API limitation, it’s not possible to get multiple regions at the same time while filtering only the useful data through that type of querying.

That means the application will have to access XIVAPI every time it needs to get the maps from a specific region.

    https://xivapi.com/Search?indexes=Map&columns=ID,PlaceName.Name_de,PlaceName.Name_en,PlaceName.Name_fr,PlaceName.Name_ja,TerritoryType.WeatherRate&filters=GameContentLinks.TerritoryType!,GamePatch.Banner!,TerritoryType.Aetheryte!,TerritoryType.BGM!!,TerritoryType.PlaceNameIconID>-1,TerritoryType.WeatherRate>0,PlaceNameRegionTargetID=${id}

The possible values of `PlaceNameRegionTargetID`:

| Region | ID | Region | ID |
| - | - | - | - |
| La Noscea | 22 | Dravania | 498 |
| The Black Shroud | 23 | Gyr Abania | 2400 |
| Thanalan | 24 | Othard | 2401 |
| Coerthas | 25 | Hingashi | 2402 |
| Mor Dhona | 26 | Norvrandt | 2950 |
| Abalathia's Spine | 497 | --- | ---- |

### ElasticSearch Query

It was specified by the creators of the XIVAPI that the method of GET parameters for search was deprecated. ElasticSearch is the way to go for uncapped power for search.

To be able to access that functionality, a JSON payload must be sent with the ElasticSearch query in the "body" field. 

Search will switch to advanced mode whenever it sees a query in the "body" field.

The "body" field can, for example, be passed in the second argument of a fetch() method :

    const response = await fetch('https://xivapi.com/Search', {
        method: 'POST',
        body: JSON.stringify(MapsQuery)
    });

After reading the documentation and researching by trials and errors, the following ElasticSearch query is getting the needed data:

(same index as the precedent query)

    "query": {
        "bool": {
            "must": [
                {"exists": {"field": "GameContentLinks.TerritoryType"}},
                {"exists": {"field": "GamePatch.Banner"}},
                {"exists": {"field": "TerritoryType.Aetheryte"}}
            ],
            "must_not": [
                {"exists": {"field": "TerritoryType.BGM"}},
                {"term": {"TerritoryType.PlaceNameIconID": "-1"}},
                {"term": {"TerritoryType.WeatherRate": "0"}}
            ],
            "filter": {
                "terms": {
                    "PlaceNameRegion.ID": [
                        "22","23","24","25","26","497",
                        "498","2400","2401","2402","2950"
                    ]
                }
            }
        }
    }

## Weather in Eorzea

### Forecasts

In Final Fantasy XIV, the weather changes every 8 bells or every 1400 seconds, so in Eorzean times respectively at 00:00, 8:00am and 04:00pm.

In the game there are non-playable characters named Skywatchers who provide a 24-hour forecast for a given area. 

At the moment, it’s not possible to obtain the weather forecasts outside of these Skywatchers or directly from the API. Luckily, Rogueadyn’s SaintCoinach managed to deduced an algorithm making it possible:

[Weather Algorithm](https://github.com/xivapi/ffxiv-datamining/blob/master/docs/Weather.md)

    calculateForecastTarget: function(lDate) {
        var unixSeconds = parseInt(lDate.getTime() / 1000);
        var bell = unixSeconds / 175;
        var increment = (bell + 8 - (bell % 8)) % 24;
        
        var totalDays = unixSeconds / 4200;
        totalDays = (totalDays << 32) >>> 0;
        
        var calcBase = totalDays * 100 + increment;
        var step1 = (calcBase << 11) ^ calcBase;
        var step2 = (step1 >>> 8) ^ step1;
        
        return step2 % 100;
    }

[Time in Eorzea](https://ffxiv.gamerescape.com/wiki/Time)

To understand how this function runs, taking a quick look about how Eorzean time units and conversion work can be helpful:

| Earth Equivalent Unit | Eorzean Terminology | Earth Time Equivalent |
| - | - | - |
| Hour | Bell | 175 seconds |
| Day | Sun | 4200 seconds |

Code explanation:
- Converts the data passed as a parameter in unix seconds, then divides it by 175 to obtain the Eorzea hour time
- Increment variable is necessary for calculation, by adding it later in the code, it’ll make it so that 04:00pm is 0, 00:00 is 8 and 08:00am is 16
- Divides unixSeconds by 4200 to get the Eorzea day time, then truncate the result by shifting bits left and right
- Hash the data and return a number between 0 and 99 usable to forecast the weather

W.I.P.

# Timezone Converter

W.I.P.