
import classes from "./NewPost.module.css";
import Modal from "../components/Modal";
import { Link , Form, redirect} from "react-router-dom";
export default function NewPost() {


  
  return (
    <Modal>
      <Form method="post" className={classes.form} >
        <p>
          <label htmlFor="body">Text</label>
          <textarea
            id="body"
            name="body"
            required
            rows={3}
          
          ></textarea>
        </p>

        <p>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            name="author"
            required
     
          ></input>
        </p>
        <p className={classes.actions}>
          <Link to={'/'} className={classes.button}>
            Cancel
          </Link>
          <button className={classes.button}>Submit</button>
        </p>
      </Form>
    </Modal>
  );
}


export async function action({request}){
  const formData = await request.formData();
  const postData = Object.fromEntries(formData)
  await fetch("https://json-server-avob.onrender.com/posts", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return redirect('/');
}