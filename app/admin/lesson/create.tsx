import { SimpleForm, Create, TextInput, ReferenceInput, NumberInput, required } from "react-admin";

// Form tambah lesson baru (admin)
export const LessonCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput 
          source="title" 
          validate={[required()]} 
          label="Title"
        />
        <ReferenceInput
          source="unitId"
          reference="units"
        />
        <NumberInput
          source="order"
          validate={[required()]}
          label="Order"
        />
      </SimpleForm>
    </Create>
  );
};
