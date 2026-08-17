import { SimpleForm, Create, TextInput, required } from "react-admin";

// Form tambah course baru (admin)
export const CourseCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput 
          source="title" 
          validate={[required()]} 
          label="Title"
        />
        <TextInput 
          source="imageSrc" 
          validate={[required()]} 
          label="Image"
        />
      </SimpleForm>
    </Create>
  );
};
