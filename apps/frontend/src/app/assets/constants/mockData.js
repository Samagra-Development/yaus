import dollor from "../icons/dollor.svg";
import heart from "../icons/heart.svg";
import cart from "../icons/cart.svg";
import profile from "../icons/homeProfile.svg";

export const colRecentActivities = [
  {
    title: "Created",
    dataIndex: "date",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Marketing Title",
    dataIndex: "org",
    filters: [
      {
        text: "Samagra Website",
        value: "Samagra Website",
      },
      {
        text: "My First Link",
        value: "My First Link",
      },
      {
        text: "Competency Passbook",
        value: "Competency Passbook",
      },
      {
        text: "Hackerank",
        value: "Hackerank",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
    width: "30%",
  },
  {
    title: "Activities",
    dataIndex: "url",
    filters: [
      {
        text: "samagra",
        value: "https://yaus.xyz/samagra",
      },
      {
        text: "first",
        value: "https://yaus.xyz/first",
      },
      {
        text: "pass",
        value: "https://yaus.xyz/pass",
      },
      {
        text: "hack",
        value: "https://yaus.xyz/hack",
      },
    ],
    onFilter: (value, record) => record.url.startsWith(value),
    filterSearch: true,
    width: "40%",
  },
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Kanika",
        value: "kanika",
      },
      {
        text: "Akshay",
        value: "akshay",
      },
      {
        text: "Chakshu",
        value: "chakshu",
      },
      {
        text: "Manav",
        value: "manav",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
    width: "30%",
  },
  {
    title: "Email",
    dataIndex: "email",
    filters: [
      {
        text: "kanikagola26@gmail.com",
        value: "kanikagola26@gmail.com",
      },
      {
        text: "akshay@gmail.com",
        value: "akshay@gmail.com",
      },
      {
        text: "chakshu@gmail.com",
        value: "chakshu@gmail.com",
      },
      {
        text: "manav@gmail.com",
        value: "manav@gmail.com",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
    width: "30%",
  },
];
export const data = [
  {
    date: "",
    org: "",
    url: <a href=""></a>,
    name: "",
    email: "",
  },
  {
    date: "",
    org: "",
    url: <a href=""></a>,
    name: "",
    email: "",
  },
  {
    date: "",
    org: "",
    url: <a href=""></a>,
    name: "",
    email: "",
  },
  {
    date: "",
    org: "",
    url: <a href=""></a>,
    name: "",
    email: "",
  },
];
export const piedata = [
  {
    type: "Week 1",
    value: 45,
  },
  {
    type: "Week 2",
    value: 55,
  },
  {
    type: "Week 3",
    value: 47,
  },
  {
    type: "Week 4",
    value: 61,
  },
  {
    type: "Week 5",
    value: 72,
  },
  {
    type: "Week 6",
    value: 34,
  },
];

export const count = [
  {
    today: "Clicks",
    title: "335",
    persent: "+30%",
    icon: dollor,
    bnb: "bnb2",
  },
  {
    today: "Installs",
    title: "-",
    persent: "+20%",
    icon: profile,
    bnb: "bnb2",
  },
  {
    today: "Open",
    title: "+144",
    persent: "20%",
    icon: heart,
    bnb: "redtext",
  },
  {
    today: "Views",
    title: "82",
    persent: "10%",
    icon: cart,
    bnb: "bnb2",
  },
];

export const columns = [
  {
    title: "Date",
    dataIndex: "date",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Short URL",
    dataIndex: "url",
    filters: [
      {
        text: "samagra",
        value: "https://yaus.xyz/samagra",
      },
      {
        text: "first",
        value: "https://yaus.xyz/first",
      },
      {
        text: "pass",
        value: "https://yaus.xyz/pass",
      },
      {
        text: "hack",
        value: "https://yaus.xyz/hack",
      },
    ],
    onFilter: (value, record) => record.url.startsWith(value),
    filterSearch: true,
    width: "35%",
  },
  {
    title: "Views",
    dataIndex: "views",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Installs",
    dataIndex: "install",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Clicks",
    dataIndex: "clicks",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Opens",
    dataIndex: "open",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

export const myData = [
  { x: "Jan", y: 45 },
  { x: "Feb", y: 42 },
  { x: "Mar", y: 53 },
  { x: "Apr", y: 62 },
  { x: "May", y: 64 },
  { x: "Jun", y: 54 },
  { x: "Jul", y: 59 },
  { x: "Aug", y: 47 },
  { x: "Sep", y: 0 },
  { x: "Oct", y: 0 },
  { x: "Nov", y: 0 },
  { x: "Dec", y: 0 },
];

export const colBulkLink = [
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
  },
  {
    title: "Email Id",
    dataIndex: "EmailId",
    key: "EmailId",
  },
  {
    title: "URL",
    dataIndex: "Url",
    key: "Url",
  },
  {
    title: "UTM Source",
    dataIndex: "utm_src",
    key: "utm_src",
  },
  {
    title: "UTM Campaign",
    dataIndex: "utm_camp",
    key: "utm_camp",
  },
  {
    title: "Short URL",
    dataIndex: "ShortUrl",
    key: "ShortUrl",
  },
];

export const dashboardTable = [
  {
    url: " https://yaus.xyz/education",
    date_created: "2022-07-09",
    no_of_clicks: "3",
    no_of_views: "8",
    no_of_opens: "5",
    no_of_installs: "89",
    userID: "0fe6ff38-fc46-11ec-b939-0242ac120001",
    projectID: "0fe6ff38-fc46-11ec-b939-0242ac120002",
  },
  {
    url: " https://yaus.xyz/govt",
    date_created: "2022-06-22",
    no_of_clicks: "33",
    no_of_views: "28",
    no_of_opens: "95",
    no_of_installs: "64",
    userID: "0fe6ff38-fc46-11ec-b939-0242ac120007",
    projectID: "0fe6ff38-fc46-11ec-b939-0242ac120003",
  },
  {
    url: " https://yaus.xyz/design",
    date_created: "2022-07-19",
    no_of_clicks: "34",
    no_of_views: "86",
    no_of_opens: "19",
    no_of_installs: "23",
    userID: "0fe6ff38-fc46-11ec-b939-0242ac120008",
    projectID: "0fe6ff38-fc46-11ec-b939-0242ac120004",
  },
  {
    url: " https://yaus.xyz/create",
    date_created: "2022-07-03",
    no_of_clicks: "31",
    no_of_views: "68",
    no_of_opens: "55",
    no_of_installs: "32",
    userID: "0fe6ff38-fc46-11ec-b939-0242ac120009",
    projectID: "0fe6ff38-fc46-11ec-b939-0242ac120005",
  },
  {
    url: " https://yaus.xyz/create",
    date_created: "2022-06-15",
    no_of_clicks: "78",
    no_of_views: "15",
    no_of_opens: "46",
    no_of_installs: "85",
    userID: "0fe6ff38-fc46-11ec-b939-0242ac120000",
    projectID: "0fe6ff38-fc46-11ec-b939-0242ac120006",
  },
];

export const linkManagerData = [
  {
    url: " https://yaus.xyz/sunbird437",
    date_created: "2022-07-09",
    title: "Test",
    no_of_clicks: "335",
    no_of_opens: "144",
  },
  {
    url: " https://yaus.xyz/sunbird842",
    date_created: "2022-06-22",
    title: "Test",
    no_of_clicks: "125",
    no_of_opens: "110",
  },
  {
    url: " https://yaus.xyz/sunbird371",
    date_created: "2022-07-19",
    no_of_clicks: "194",
    title: "Test",
    no_of_opens: "139",
  },
  {
    url: " https://yaus.xyz/sunbird752",
    date_created: "2022-07-03",
    title: "Test",
    no_of_clicks: "168",
    no_of_opens: "128",
  },
  {
    url: " https://yaus.xyz/create",
    date_created: "2022-06-15",
    no_of_clicks: "178",
    title: "Test",
    no_of_opens: "146",
  },
];

export const recentActivityData = [
  {
    activity: " https://yaus.xyz/design_draft",
    date_created: "2022-07-19",
    title: "Design Draft",
    name: "Chakshu",
    email: "chakshu@gmail.com",
  },
  {
    activity: " https://yaus.xyz/education_proposal",
    date_created: "2022-07-09",
    title: "Education Proposal",
    name: "Kanika",
    email: "kanikagola26@gmail.com",
  },
  {
    activity: " https://yaus.xyz/Tax_bill",
    date_created: "2022-07-03",
    title: "Tax Expense",
    name: "Manav",
    email: "manav@gmail.com",
  },
  {
    activity: " https://yaus.xyz/govt_docs",
    date_created: "2022-06-22",
    title: "Goverment Docs",
    name: "Akshay",
    email: "akshay@gmail.com",
  },
  {
    activity: " https://yaus.xyz/property_stats",
    date_created: "2022-06-15",
    title: "Property Stats",
    name: "Shruti",
    email: "shruti@gmail.com",
  },
];

export const mainDashboardChart = [
  {
    month: "jan",
    url_created: "53",
  },
  {
    month: "feb",
    url_created: "62",
  },
  {
    month: "mar",
    url_created: "70",
  },
  {
    month: "apr",
    url_created: "67",
  },
  {
    month: "may",
    url_created: "77",
  },
  {
    month: "jun",
    url_created: "84",
  },
  {
    month: "jul",
    url_created: "90",
  },
  {
    month: "aug",
    url_created: "95",
  },
];
