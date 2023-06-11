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
export const homeData = [
  {
    date: "2022-08-17",
    name: "Smart India Hackathon",
    url: <a href="https://yaus.xyz/SIH">https://yaus.xyz/SIH</a>,
    views: "82",
    install: "-",
    clicks: "335",
    open: "144",

    action: (
      <Button onClick={() => setVisible(true)} type="primary">
        Show Statistics
      </Button>
    ),
  },
  {
    date: "2022-07-19",
    name: "Sunbird",
    url: (
      <a href=" https://yaus.xyz/sunbird842"> https://yaus.xyz/sunbird842</a>
    ),
    views: "56",
    install: "-",
    clicks: "121",
    open: "140",
    action: (
      <Button onClick={() => setVisible(true)} type="primary">
        Show Statistics
      </Button>
    ),
  },
  {
    date: "2022-07-19",
    name: "Sunbird",
    url: (
      <a href=" https://yaus.xyz/sunbird371"> https://yaus.xyz/sunbird371</a>
    ),
    views: "68",
    install: "-",
    clicks: "125",
    open: "110",
    action: (
      <Button onClick={() => setVisible(true)} type="primary">
        Show Statistics
      </Button>
    ),
  },
  {
    date: "2022-07-19",
    name: "Sunbird",
    url: (
      <a href="https://yaus.xyz/sunbird437">https://yaus.xyz/sunbird437</a>
    ),
    views: "56",
    install: "-",
    clicks: "124",
    open: "149",
    action: (
      <Button onClick={() => setVisible(true)} type="primary">
        Show Statistics
      </Button>
    ),
  },
  {
    date: "2022-07-19",
    name: "Sunbird",
    url: (
      <a href="https://yaus.xyz/sunbird752">https://yaus.xyz/sunbird752</a>
    ),
    views: "96",
    install: "-",
    clicks: "134",
    open: "131",
    action: (
      <Button onClick={() => setVisible(true)} type="primary">
        Show Statistics
      </Button>
    ),
  },
  {
    date: "2022-07-03",
    name: "Competency Passbook",
    url: <a href="https://yaus.xyz/passbook">https://yaus.xyz/create</a>,
    views: "68",
    install: "-",
    clicks: "168",
    open: "128",
    action: (
      <Button onClick={() => setVisible(true)} type="primary">
        Show Statistics
      </Button>
    ),
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
