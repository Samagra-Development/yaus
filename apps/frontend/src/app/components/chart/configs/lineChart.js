import { mainDashboardChart } from "app/assets/constants/mockData";

async function action() {
  return mainDashboardChart;
}

action();

action()
  .then((dataset) => {
    const month = dataset.map(function (index) {
      return index.month;
    });

    const url_created = dataset.map(function (index) {
      return index.url_created;
    });

    console.log(month);
    console.log(url_created);

    for (let i = 0; i < month.length; i++) {
      lineChart.options.xaxis.categories[i] = month[i];
    }

    for (let i = 0; i < url_created.length; i++) {
      lineChart.series[0].data[i] = url_created[i];
    }
  })
  .catch((error) => {
    console.log("fetch data failed", error);
  });
const lineChart = {
  series: [
    // {
    //   name: "Mobile apps",
    //   data: [350, 40, 300, 220, 500, 250, 400, 230, 500],
    //   offsetY: 0,
    // },
    {
      name: "Link Generated",
      data: [],
      offsetY: 0,
    },
  ],

  options: {
    chart: {
      width: "100%",
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },

    legend: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },

    yaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: ["#8c8c8c"],
        },
      },
    },

    xaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: [
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
          ],
        },
      },
      categories: ["jkrl", "ehnjdkf"],
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  },
};

export default lineChart;
