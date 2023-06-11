const router = require("express").Router();
const {
  checkAPI,
  getDashboardTableData,
  getLinkManagerData,
  getMainDashboardChartData,
  getRecentActivityData,
} = require("../controllers/data.controller");

router.get("/", checkAPI);
router.get("/dashboard_table", getDashboardTableData);
router.get("/main_dashboard_chart", getMainDashboardChartData);
router.get("/link_manager_data", getLinkManagerData);
router.get("/recent_activity_data", getRecentActivityData);

module.exports = router;
// for specific link stats

// app.get('/:customeHashID',(req, res) => {
//   res.set("Access-Control-Allow-Origin", "*");
//   const {customeHashID} =req.params;
//   console.log(req.params);
//   const singleID=url_data.find((single)=>single.customeHashID===customeHashID);
//   console.log(singleID);
//   if(!singleID){
//     return res.status(404).send('ID not found')
//   }
//   res.json(singleID);
// });
