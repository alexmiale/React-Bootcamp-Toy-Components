/**
 * This class is included for reference.
 * It contains how to make a React Hook Form with input field validation.
 * @author Christopher Curtis
 */
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// This defines the schema for the form used, expand here for form input validation
const schema = z.object({
  name: z.string().min(3, { message: "Name must be atleast 3 characters" }),
  id: z
    .number({ invalid_type_error: "ID field is required" })
    .min(0, { message: "ID must be atleast 0" }),
});
type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: FormData) => void;
}

/**
 * Creates a React Hook Form, with fields as defined in the above schema.
 * @returns a React-Hook-Form component
 */
const UpdateForm = ({ onSubmit }: Props) => {
  // These variables are used for interacting with the form's state
  const {
    register, // Tracks the form fields
    handleSubmit, // Calls the on-submit logic
    formState: { errors, isValid }, // Tracks errors and wether or not the form is valid
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // We return the react markup needed for the component
  return (
    <>
      <header>
        <b>Update Form</b>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">
            ID
          </label>
          <input
            {...register("id", { valueAsNumber: true })}
            id="id"
            type="number"
            className="form-control"
          />
          {errors.id && <p className="text-danger">{errors.id.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            className="form-control"
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        <button disabled={!isValid} className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default UpdateForm;
