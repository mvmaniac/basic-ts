import axios, { AxiosResponse } from 'axios';
import * as Chart from 'chart.js';

import {
  CovidSummaryResponse,
  CountryInfoResponse,
  Country,
  CountryInfo
} from './covid/index';

// utils
function $<T extends HTMLElement = HTMLDivElement>(selector: string) {
  const element = document.querySelector(selector);
  return element as T;
}
function getUnixTimestamp(date: Date | string) {
  return new Date(date).getTime();
}

function createSpinnerElement(id: string) {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.setAttribute('id', id);
  wrapperDiv.setAttribute(
    'class',
    'spinner-wrapper flex justify-center align-center'
  );

  const spinnerDiv = document.createElement('div');
  spinnerDiv.setAttribute('class', 'ripple-spinner');
  spinnerDiv.appendChild(document.createElement('div'));
  spinnerDiv.appendChild(document.createElement('div'));

  wrapperDiv.appendChild(spinnerDiv);
  return wrapperDiv;
}

// DOM
const confirmedTotal = $<HTMLSpanElement>('.confirmed-total');
const deathsTotal = $<HTMLParagraphElement>('.deaths');
const recoveredTotal = $<HTMLParagraphElement>('.recovered');
const lastUpdatedTime = $<HTMLParagraphElement>('.last-updated-time');
const rankList = $<HTMLOListElement>('.rank-list');
const deathsList = $<HTMLOListElement>('.deaths-list');
const recoveredList = $<HTMLOListElement>('.recovered-list');
const deathSpinner = createSpinnerElement('deaths-spinner');
const recoveredSpinner = createSpinnerElement('recovered-spinner');

// state
let isDeathLoading = false;

// api
function fetchCovidSummary(): Promise<AxiosResponse<CovidSummaryResponse>> {
  const url = 'https://api.covid19api.com/summary';
  return axios.get(url);
}

enum CovidStatus {
  Confirmed = 'confirmed',
  Recovered = 'recovered',
  Deaths = 'deaths'
}

function fetchCountryInfo(
  countryName: string | undefined,
  status: CovidStatus
): Promise<AxiosResponse<CountryInfoResponse>> {
  // status params: confirmed, recovered, deaths
  const url = `https://api.covid19api.com/country/${countryName}/status/${status}`;
  return axios.get(url);
}

function setTotalConfirmedNumber(data: CovidSummaryResponse) {
  confirmedTotal.innerText = data.Countries.reduce(
    // eslint-disable-next-line no-return-assign, no-param-reassign
    (total: number, current: Country) => (total += current.TotalConfirmed),
    0
  ).toString();
}

function setTotalDeathsByWorld(data: CovidSummaryResponse) {
  deathsTotal.innerText = data.Countries.reduce(
    // eslint-disable-next-line no-return-assign, no-param-reassign
    (total: number, current: Country) => (total += current.TotalDeaths),
    0
  ).toString();
}

function setTotalRecoveredByWorld(data: CovidSummaryResponse) {
  recoveredTotal.innerText = data.Countries.reduce(
    // eslint-disable-next-line no-return-assign, no-param-reassign
    (total: number, current: Country) => (total += current.TotalRecovered),
    0
  ).toString();
}

function setCountryRanksByConfirmedCases(data: CovidSummaryResponse) {
  const sorted = data.Countries.sort(
    (a: Country, b: Country) => b.TotalConfirmed - a.TotalConfirmed
  );

  sorted.forEach((value: Country) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item flex align-center');
    li.setAttribute('id', value.Slug);

    const span = document.createElement('span');
    span.textContent = value.TotalConfirmed.toString();
    span.setAttribute('class', 'cases');

    const p = document.createElement('p');
    p.setAttribute('class', 'country');
    p.textContent = value.Country;

    li.appendChild(span);
    li.appendChild(p);
    rankList.appendChild(li);
  });
}

function setLastUpdatedTimestamp(data: CovidSummaryResponse) {
  lastUpdatedTime.innerText = new Date(data.Date).toLocaleString();
}

//
async function setupData() {
  const { data } = await fetchCovidSummary();

  console.log(data);

  setTotalConfirmedNumber(data);
  setTotalDeathsByWorld(data);
  setTotalRecoveredByWorld(data);
  setCountryRanksByConfirmedCases(data);
  setLastUpdatedTimestamp(data);
  // renderChart();
}

function setDeathsList(data: CountryInfoResponse) {
  const sorted = data.sort(
    (a: CountryInfo, b: CountryInfo) =>
      getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date)
  );

  sorted.forEach((value: CountryInfo) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item-b flex align-center');

    const span = document.createElement('span');
    span.textContent = value.Cases.toString();
    span.setAttribute('class', 'deaths');

    const p = document.createElement('p');
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);

    li.appendChild(span);
    li.appendChild(p);

    deathsList!.appendChild(li);
  });
}

function setTotalDeathsByCountry(data: CountryInfoResponse) {
  deathsTotal.innerText = data[0].Cases.toString();
}

function setRecoveredList(data: CountryInfoResponse) {
  const sorted = data.sort(
    (a: CountryInfo, b: CountryInfo) =>
      getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date)
  );

  sorted.forEach((value: CountryInfo) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item-b flex align-center');

    const span = document.createElement('span');
    span.textContent = value.Cases.toString();
    span.setAttribute('class', 'recovered');

    const p = document.createElement('p');
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);

    li.appendChild(span);
    li.appendChild(p);

    recoveredList?.appendChild(li);
  });
}

function clearDeathList() {
  if (!deathsList) {
    return;
  }

  deathsList.innerHTML = '';
}

function clearRecoveredList() {
  recoveredList.innerHTML = '';
}

function setTotalRecoveredByCountry(data: CountryInfoResponse) {
  recoveredTotal.innerText = data[0].Cases.toString();
}

function startLoadingAnimation() {
  deathsList.appendChild(deathSpinner);
  recoveredList.appendChild(recoveredSpinner);
}

function endLoadingAnimation() {
  deathsList.removeChild(deathSpinner);
  recoveredList.removeChild(recoveredSpinner);
}

function renderChart(data: number[], labels: string[]) {
  const lineChart = $('#lineChart') as HTMLCanvasElement;
  const ctx = lineChart.getContext('2d') as CanvasRenderingContext2D;
  const defaultLabel = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July'
  ];
  const defaultData = [0, 10, 5, 2, 20, 30, 45];

  Chart.defaults.color = '#f5eaea';
  Chart.defaults.font.family = 'Exo 2';

  const chart = new Chart.Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Confirmed for the last two weeks',
          backgroundColor: '#feb72b',
          borderColor: '#feb72b',
          data
        }
      ]
    },
    options: {}
  });
}

function setChartData(data: CountryInfoResponse) {
  const chartData = data.slice(-14).map((value: CountryInfo) => value.Cases);
  const chartLabel = data
    .slice(-14)
    .map((value: CountryInfo) =>
      new Date(value.Date).toLocaleDateString().slice(5, -1)
    );

  renderChart(chartData, chartLabel);
}

async function handleListClick(event: Event) {
  let selectedId;

  if (
    event.target instanceof HTMLParagraphElement ||
    event.target instanceof HTMLSpanElement
  ) {
    selectedId = event.target.parentElement
      ? event.target.parentElement.id
      : undefined;
  }

  if (event.target instanceof HTMLLIElement) {
    selectedId = event.target.id;
  }

  if (isDeathLoading) {
    return;
  }

  clearDeathList();
  clearRecoveredList();
  startLoadingAnimation();

  isDeathLoading = true;

  const { data: deathResponse } = await fetchCountryInfo(
    selectedId,
    CovidStatus.Deaths
  );

  const { data: recoveredResponse } = await fetchCountryInfo(
    selectedId,
    CovidStatus.Recovered
  );

  const { data: confirmedResponse } = await fetchCountryInfo(
    selectedId,
    CovidStatus.Confirmed
  );

  console.log(confirmedResponse);

  endLoadingAnimation();
  setDeathsList(deathResponse);
  setTotalDeathsByCountry(deathResponse);
  setRecoveredList(recoveredResponse);
  setTotalRecoveredByCountry(recoveredResponse);
  setChartData(confirmedResponse);

  isDeathLoading = false;
  // console.log(data);
}

// events
function initEvents() {
  if (!rankList) {
    return;
  }

  rankList.addEventListener('click', handleListClick);
}

// methods
function startApp() {
  console.log('start app...');
  setupData();
  initEvents();
}

startApp();
