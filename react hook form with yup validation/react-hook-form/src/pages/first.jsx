import React from 'react'
import { useState } from 'react'
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import { Check, Eye, EyeOff } from 'react-feather'
import classnames from "classnames";
import './first.css'




const ReactHookForm = () => {

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };


  const SignupSchema = yup.object().shape({
    // gptan: yup.string().required('GPTAN is required').min(4, 'GPTAN must be atleast 4 characters'),
    // mid: yup.string().required('Group Medicaid ID is required').min(4, 'Group Medicaid ID must be atleast 4 characters'),
    password: yup.string().min(6, 'Password must be at least 6 characters').max(40, 'The NPPES password must not be greater than 40 characters').required(),

    name: yup
      .string()
      .matches(/^[A-Za-z]+$/, "Name can only contain letters")
      .min(3, "Last Name must be at least 3 characters")
      .required("Last Name is required"),
    state_id: yup
      .object()
      .shape({
        value: yup.string().required("Value is required."),
        label: yup.string().required("Label is required."),
      })
      .nullable()
      .required("Please select an option."),
    message: yup.string().required('Remarks is required').min(10, 'Remarks must be atleast 10 characters'),
    type: yup
      .string()
      .oneOf(["yes", "no"], "Please select a practice role")
      .required("Please select a practice role"),
    fileUpload: yup
      .mixed()
      .test("required", "File is required", (value) => {
        return value && value.length > 0;
      })
      .test("fileSize", "File size is too large", (value) => {
        return value && value[0] && value[0].size <= 2000000; // 2MB
      })
      .test("fileType", "Unsupported file format", (value) => {
        return (
          value &&
          value[0] &&
          ["image/jpeg", "image/png", "application/pdf"].includes(value[0].type)
        );
      }),

  });



  const defaultValues = {
    name: '',
    password: '',
    state_id: "",
    message: "",
    type: "",
    fileUpload: "",


  }


  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
    setValue, // <-- Add this line to access setValue
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = (data) => {
    console.log("data value", data);
  };


  const states = [
    { value: '1', label: 'Alaska' },
    { value: '2', label: 'Nadra' },
  ]
  return (
    <div>
      <h1 className='p-20 text-center'>React Hook Form with yup validation</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='w-50 m-auto p-20 border round'>

        <div className='padding-b'>
          <label className='block padding-y-small' htmlFor="name">
            Name*
          </label>
          <Controller
            id="name"
            name="name"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Enter Name"
                invalid={errors.name && true}
                className={classnames('custom-form w-100', { 'is-invalid': errors.message })}
              />
            )}
          />
          {errors.name && (
            <p className='red'>{errors.name.message}</p>
          )}
        </div>

        <div className='padding-b'>
          <label className='block padding-y-small' htmlFor='password'>
            Password*
          </label>
          <Controller
            id="password"
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <div className='pass-style'>
                  <input
                    {...field}
                    type={showPassword ? 'text' : 'password'} // Toggle input type
                    placeholder="Enter your password"
                    // invalid={!!errors.password} // Highlight input on error
                    // invalid={errors.password && true}
                    className={classnames(' pass-input custom-form  w-100', { 'is-invalid': errors.message })}
                  />

                  <div
                    onClick={togglePasswordVisibility}
                    style={{ cursor: 'pointer' }}
                    className='pass-eye'
                  >
                    {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                  </div>

                </div>
                {errors.password && <p className='red'>{errors.password.message}</p>
                }
              </>
            )}
          />
        </div>

        <div className='padding-b'>
          <label htmlFor="state" className='block padding-y-small'>State*</label>
          <Controller
            id="state"
            control={control}
            name="state_id"
            render={({ field }) => (
              <Select
                isClearable
                options={states}
                classNamePrefix="select"
                className={classnames("react-select", {
                  "is-invalid": errors.state_id,
                })}
                {...field}
              />
            )}
          />
          {errors.state_id && <p className='red'>Select a state from the list</p>}

        </div>
        
        <div className='padding-b'>

          <label htmlFor="message" className='block padding-y-small'>Remarks*</label>
          <div className='padding-b'>
            <Controller
              name="message"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <textarea
                  {...field}
                  rows="10"
                  cols="50"
                  placeholder="Update your Remarks..."
                  className={classnames('custom-form w-100', { 'is-invalid': errors.message })}
                />
              )}
            />
            {errors.message && <p className='red'>{errors.message.message}</p>}
          </div>

          <div className='padding-b'>
            <label className='block padding-y-small'>Select Type*</label>
            <div className="">
              <Controller
                name="type"
                control={control}
                rules={{ required: "Please select a practice role" }}
                render={({ field }) => (
                  <div className="custom-checks ">
                    <div className="custom-form-check">
                      <input
                        {...field}
                        type="radio"
                        id="select-type-1"
                        value="yes"
                        checked={field.value === "yes"}
                        onChange={() => field.onChange("yes")}
                      />
                      <label className="" htmlFor="select-type-1">
                        Yes
                      </label>
                    </div>

                    <div className="custom-form-check">
                      <input
                        {...field}
                        type="radio"
                        id="select-type-2"
                        value="no"
                        checked={field.value === "no"}
                        onChange={() => field.onChange("no")}
                      />
                      <label className="" htmlFor="select-type-2">
                        No
                      </label>
                    </div>
                  </div>
                )}
              />
              {errors.type && (
                <p className="red">
                  {errors.type.message}
                </p>
              )}
            </div>

          </div>

          <div className="mb-2">
            <label htmlFor="fileUpload" className='block padding-y-small'>Upload Document*</label>
            <Controller
              name="fileUpload"
              control={control}
              render={({ field: { onChange } }) => (
                <input
                  className={`upload ${errors.fileUpload ? 'is-invalid' : ''}`}
                  type="file"
                  id="fileUpload"
                  onChange={(e) => onChange(e.target.files)}
                />
              )}
            />
            {errors.fileUpload && <p className='red'>{errors.fileUpload.message}</p>}
            <p className='padding-y-small'>(25MB maximum per file)</p>
          </div>

        </div>
        <button type='submit' className='btn'> Submit</button>

      </form>

    </div>
  )
}

export default ReactHookForm
