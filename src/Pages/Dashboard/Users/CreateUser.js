import Form from "../../../Components/Forms/Form";

export default function CreateUser() {
  return (
    <div className="container">
      <div className="parent">
        <h1>Create New User</h1>
        <Form
          button={"Create"}
          form={true}
          url={"user/create"}
          hasLocalStorage={false}
          pathname={`dashboard/users`}
          fulwidth={true}
        />
      </div>
    </div>
  );
}
