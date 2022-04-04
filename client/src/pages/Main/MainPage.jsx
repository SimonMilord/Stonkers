import "./MainPage.scss";
import React, { Component } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar/navBar";
import Quote from "../../components/Quote/quote";
import Graph from "../../components/Graph/graph";
import DataTable from "../../components/DataTable/dataTable";
import TimeSelector from "../../components/TimeSelector/timeSelector";
import FooterMain from '../../components/Footer/footerMain';
import NewsSection from '../../components/NewsSection/newsSection';

const URL = process.env.REACT_APP_API_URL;
const KEY = process.env.REACT_APP_API_KEY;
const serverURL = process.env.REACT_APP_SERVER_URL;
let clientAuthToken = sessionStorage.getItem('clientAuthToken');
const defaultStock = "AAPL";
const defaultTime = (new Date().setFullYear(new Date().getFullYear() - 1)/1000).toFixed();
const today = (Date.now()/1000).toFixed();

let now = new Date();
const fromNews = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toISOString().split('T')[0];
const toNews = new Date().toISOString().split('T')[0];


export default class MainPage extends Component {
  state = {
    stock: defaultStock,
    stockName: "APPLE INC",
    stockQuote: {},
    stockFinancials: {},
    stockProfile: {},
    stockRatings: {},
    stockRecommendation: "",
    stockChartData: {},
    stockNewsArray: [],
    fromPeriod: defaultTime,
    userWatchlist: [],
    inWatchlist: false,
  };

  // Life cycle methods
  componentDidMount() {
    this.getStockProfile(defaultStock);
    this.getStockQuote(defaultStock);
    this.getStockPriceData(defaultStock, defaultTime); // Data required for the chart
    this.getStockFinancials(defaultStock);
    this.getStockRatings(defaultStock);
    this.getStockNews(defaultStock, fromNews, toNews);
    this.getWatchlist();
  }

  // ----- HANDLER FUNCTIONS -----

  // functions that call API request functions once a stock is searched
  handleQuoteData = (quote) => {
    this.setState({
      stock: quote,
    });
    this.getStockProfile(quote);
    this.getStockQuote(quote);
    this.getStockPriceData(quote, this.state.fromPeriod); // Data required for the chart
    this.getStockFinancials(quote);
    this.getStockRatings(quote);
    this.getStockNews(quote, fromNews, toNews);
    this.getWatchlist();
  };

  //functions that handles time period for graph
  handleTimeData = (period) => {
    this.setState({
      fromPeriod: period,
    }, () => {
      this.getStockPriceData(this.state.stock, this.state.fromPeriod);
    });
  }

  // function to add stock to watchlist
  handleAddStock = () => {
    axios.put(`${serverURL}/watchlist`, {
      symbol: this.state.stockProfile.ticker,
      name: this.state.stockProfile.name
    }, {
      headers: {
        authorization: `Bearer ${clientAuthToken}`,
      }
    }).then(response => {
      if (response.data.filter(e => e.symbol === this.state.stockProfile.ticker).length > 0) {
        this.setState({
          inWatchlist: true,
        });
      } else {
        this.setState({
          inWatchlist: false,
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  handleRemoveStock = (symbol) => {
    axios.put(`${serverURL}/watchlist/${symbol}`,
      {
        symbol: this.state.stockProfile.ticker,
        name: this.state.stockProfile.name
      }, {
        headers: {
          authorization: `Bearer ${clientAuthToken}`,
        }
      }
    )
    .then((response) => {
      if (response.data.filter(e => e.symbol === this.state.stockProfile.ticker).length > 0) {
        this.setState({
          inWatchlist: true,
        });
      } else {
        this.setState({
          inWatchlist: false,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  getWatchlist = () => {
    axios
    .get(`${serverURL}/watchlist`, {
      headers: {
        authorization: `Bearer ${clientAuthToken}`,
      },
    })
    .then((response) => {
      if (response.data.filter(e => e.symbol === this.state.stock).length > 0) {
        this.setState({
          inWatchlist: true,
        });
      } else {
        this.setState({
          inWatchlist: false,
        });
      }
      this.setState({
        userWatchlist: response.data
      });
      this.getStockProfile(this.state.stock);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // ----- API CALLS -----
  // API call to get Name and symbol of the company - SYMBOL LOOKUP
  // getStockName(symbol) {
  //   axios
  //     .get(`${URL}/search?q=${symbol}&token=${KEY}`)
  //     .then((res) => {
  //       this.setState({
  //         stockName: res.data.result[0].description,
  //         stock: res.data.result[0].symbol,
  //       });
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  // API call to get current price, percent change and $ change - QUOTE
  getStockQuote(symbol) {
    axios
      .get(`${URL}/quote?symbol=${symbol}&token=${KEY}`)
      .then((res) => {
        this.setState({
          stockQuote: res.data,
        });
      })
      .catch((err) => {
        alert(
          "Hi!, Please note the current version only supports US stocks for now."
        );
        this.setState({
          stockQuote: {
            "c": "N/A",
            "d": null,
            "dp": null,
            "h": null,
            "l": null,
            "pc": null,
          }
        });
      });
  }

  // API call to get financials data - BASIC FINANCIALS
  getStockFinancials(symbol) {
    axios
      .get(`${URL}/stock/metric?symbol=${symbol}&metric=all&token=${KEY}`)
      .then((res) => {
        this.setState({
          stockFinancials: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // API call to get company profile data - COMPANY PROFILE 2
  getStockProfile(symbol) {
    axios
      .get(`${URL}/stock/profile2?symbol=${symbol}&token=${KEY}`)
      .then((res) => {
        this.setState({
          stock: res.data.ticker,
          stockName: res.data.name,
          stockProfile: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // API call to get stock analysts ratings data and sets a recommendation value - RECOMMENDATION TRENDS
  getStockRatings(symbol) {
    axios
      .get(`${URL}/stock/recommendation?symbol=${symbol}&token=${KEY}`)
      .then((res) => {
        this.setState({
          stockRatings: res.data[0],
        });
        // cleaning up the array of analyst ratings and
        // aggregating values for readability
        let arr = Object.values(this.state.stockRatings);
        arr.splice(2, 1);
        arr.pop();
        let buys = arr[0] + arr[3];
        let hold = arr[1];
        let sells = arr[2] + arr[4];

        // Basic algorithm to come up with a final recommendation
        if (buys > arr[1] + hold + sells) {
          this.setState({
            stockRecommendation: "BUY",
          });
        } else if (buys + hold < sells) {
          this.setState({
            stockRecommendation: "SELL",
          });
        } else {
          this.setState({
            stockRecommendation: "HOLD",
          });
        }
      })
      .catch((err) => {
        this.setState({
          stockRecommendation: "N/A",
        });
      });
  }

    // API call to get the 5 years stock price data for the chart - CANDLES
    getStockPriceData(symbol, from) {
      axios
        .get(`${URL}/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${today}&token=${KEY}`)
        .then((res) => {
          this.setState(() => ({
            stockChartData: res.data,
          }));
        })
        .catch((err) => {
          console.error(err);
        })
    }

    // API call to get company specific news -- COMPANY NEWS
    getStockNews(symbol, fromNews, toNews) {
      axios
        .get(`${URL}/company-news?symbol=${symbol}&from=${fromNews}&to=${toNews}&token=${KEY}`)
        .then((res) => {
          this.setState(() => ({
            stockNewsArray: res.data.slice(0,10),
          }));
        }).catch((err) => {
          console.log(err);
        });
    }

  render() {
    document.title = this.state.stock
      ? `Stonkers - ${this.state.stock}`
      : "Stonkers"
    return (
      <>
        <NavBar getQuote={this.handleQuoteData} />
        <div className="mainPage">
          <div className="mainPage-top">
            <Quote
              quote={this.state.stockQuote}
              profile={this.state.stockProfile}
              addBtn = {this.handleAddStock}
              deleteBtn = {this.handleRemoveStock}
              inWatchlistStatus = {this.state.inWatchlist}
            />
          </div>
          <div className="mainPage-bottom">
            <div className="line-chart">
              <TimeSelector getTime={this.handleTimeData}/>
              <Graph
                chartData={this.state.stockChartData}
              />
            </div>
            <DataTable
              quote={this.state.stockQuote}
              financials={this.state.stockFinancials}
              profile={this.state.stockProfile}
              recommendation={this.state.stockRecommendation}
            />
            <NewsSection
              currentNews={this.state.stockNewsArray}
            />
          </div>
        </div>
        <FooterMain />
      </>
    );
  }
}
