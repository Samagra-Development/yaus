const dashboard_table_data = require("../data/dashboard_table_data");
const main_dashboard_chart_data = require("../data/main_dashboard_chart_data");
const url_data = require("../data/Stats_For_Links");
const link_manager_data = require("../data/link_manager_data");
const recent_activity_data = require("../data/recent_activity_data");


const checkAPI = (req, res) => {
  res.send("Api is running.");
};

const getDashboardTableData = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.json(dashboard_table_data);
};

const getMainDashboardChartData = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.json(main_dashboard_chart_data);
};

const getLinkManagerData = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.json(link_manager_data);
};

const getRecentActivityData = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.json(recent_activity_data);
};

module.exports = {
  checkAPI,
  getDashboardTableData,
  getRecentActivityData,
  getLinkManagerData,
  getMainDashboardChartData,
};
