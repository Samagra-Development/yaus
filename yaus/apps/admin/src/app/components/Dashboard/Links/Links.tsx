// in src/posts.js
import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  NumberField,
} from 'react-admin';

const Links = () => (
  <List>
    <Datagrid>
      <NumberField source="hashid" />
      <TextField source="customHashId" />
      <TextField source="clicks" />
    </Datagrid>
  </List>
);

export default Links;
