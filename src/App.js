import {Card, CardContent, FormControl, MenuItem, Select} from '@material-ui/core';
import {useEffect, useState} from 'react';
import './App.css';
import InfoBox from './InfoBox'
import LineGraph from './LineGraph';
import Map from './Map'
import Table from './Table'
import {prettyPrintStat, sortData} from './util';
import "leaflet/dist/leaflet.css"
//https://corona.lmao.ninja/v3/covid-19/countries
function App() {
  const [countries,setcountries]=useState([])
  const [country,setcountry]=useState(['Worldwide']);
  const [countryInfo,setCountryInfo]=useState([]);
  const [tableData,setTableData]=useState([]);
  const [mapCenter,setMapCenter]=useState([20,77])
  const [mapZoom,setMapZoom]=useState(3)
  const [mapCountries,setMapCountries]=useState([]);
  const [casesType,setCasesType]=useState("cases");
 useEffect(()=>{
 fetch("https://corona.lmao.ninja/v3/covid-19/all")
   .then((response) => response.json())
   .then((data) => {
     setCountryInfo(data);
   });
 },[])
 console.log("center",mapCenter);
  useEffect(()=>
{
const getCountriesData=async ()=>{
  await fetch("https://corona.lmao.ninja/v3/covid-19/countries").
  then((response)=>response.json()).
  then((data)=>{
    const countries=data.map((country)=>({
      name:country.country,
      value:country.countryInfo.iso2,
    }));
    const sortedData=sortData(data)
    setcountries(countries);
    setMapCountries(data)
    setTableData(sortedData);
  });
  
}
getCountriesData();
},[])
const onCountryChange =async (event)=>{
  const countryCode=event.target.value;
  setcountry(countryCode)
  const url = countryCode === "Worldwide" ? "https://corona.lmao.ninja/v3/covid-19/all":
  ` https://corona.lmao.ninja/v3/covid-19/countries/${countryCode}`;
  await fetch(url).then(response=>response.json())
  .then((data)=>{
    setcountry(countryCode)
    setCountryInfo(data)
    setMapCenter([data.countryInfo.lat,data.countryInfo.long])
    console.log('countryinfo',mapCenter)
    setMapZoom(4)
  })
}
  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h2>COVID-19 TRACKER</h2>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_status">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
            title="Coranovirus cases"
            isred={casesType === "cases"}
            r
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
            title="Recovered"
            isgreen={casesType === "recovered"}
            g
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
            title="Deaths"
            isgray={casesType === "deaths"}
            y
          />
        </div>
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3 className="livecases">Live cases by country</h3>
          <Table className="app_right_table" countries={tableData} />
        </CardContent>
        <hr className="hr"/>
        <h3 className="app_right_world">worldwide {casesType}</h3>
        <LineGraph className="line" casesType={casesType} />
      </Card>
    </div>
  );
}

export default App;
