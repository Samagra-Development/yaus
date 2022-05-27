import * as React from "react";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { PostList } from "./posts";

const App = () => (
  <Admin
    dataProvider={jsonServerProvider("https://jsonplaceholder.typicode.com")}
  >
    <Resource name="posts" list={PostList} options={{}} />
  </Admin>
);

export default App;