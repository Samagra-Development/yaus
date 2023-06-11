const mongoose=require('mongoose')

const dashboardSchema=mongoose.Schema({
    "type": "object",
  "properties": {
    "url": {
      "type": "string"
    },
    "date-created": {
      "type": "date string"
    },
    "no_of_clicks": {
      "type": "integer"
    },
    "no_of_views": {
      "type": "integer"
    },
    "no_of_opens": {
      "type": "integer"
    },
    "userID": {
      "type": "string"
    },
    "projectID": {
      "type": "string"
    },
    "per_day_clicks": {
      "type": "integer"
    },
    "per_week_clicks": {
      "type": "integer"
    },
    "per_year_clicks": {
      "type": "integer"
    }
  },
  "required": [
    "url",
    "date-created",
    "no_of_clicks",
    "no_of_views",
    "no_of_opens",
    "userID",
    "projectID",
    "per_day_clicks",
    "per_week_clicks",
    "per_year_clicks"
  ]
    
})
const Dashboard=mongoose.model('Dashboard',dashboardSchema)



 module.exports=Dashboard;