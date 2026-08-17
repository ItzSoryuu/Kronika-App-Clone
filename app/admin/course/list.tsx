import { Datagrid, List, TextField } from "react-admin";

// Daftar course (admin)
export const CourseList = () => {
  return (
  <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="imageSrc" />
      </Datagrid>
    </List>
  );
};
