import React from "react";
import { useSelector } from "react-redux";
import { formTr } from "../../../../../utils/translate";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";
const FormPut = ({ getPutModal, onClosePut, data }) => {
  const lang = useSelector((state) => state.user.lang);
  function parseCustomDateString(customString) {
    let dateParts = customString.match(
      /Data: (\d{2}.\d{2}) Ora precisa:(\d{2}):(\d{2})/
    );

    if (!dateParts) {
      dateParts = customString.match(
        /Date: (\d{2}.\d{2}) Time:(\d{2}):(\d{2})/
      );
    }
    if (!dateParts) {
      dateParts = customString.match(/(\d{2}.\d{2}) (\d{2}):(\d{2})/);
    }

    const dayMonth = dateParts[1].split(".");
    const hour = parseInt(dateParts[2], 10);
    const minute = parseInt(dateParts[3], 10);

    const currentYear = new Date().getFullYear();

    const parsedDate = new Date(
      currentYear,
      parseInt(dayMonth[1]) - 1,
      parseInt(dayMonth[0]),
      hour,
      minute
    );

    return parsedDate;
  }

  return (
    <Formik
      initialValues={{
        customs: data.customs,
        date: data.date,
        details: data.details,
      }}
      validationSchema={Yup.object({
        customs: Yup.string().required("required"),

        date: Yup.string()
          // .min(12, "min 12")
          .required("required")
          .test(
            "m",
            "Enter date",
            (value) => !value || (value && !value.includes("_"))
          ),
      })}
      onSubmit={(body, actions) => {
        // collect data

        const formData = new FormData();
        Object.entries(body).map(([key, value]) => {
          if (key === "date") {
            return formData.append(`${key}`, parseCustomDateString(value));
          }

          return formData.append(`${key}`, value);
        });

        getPutModal(formData).then((res) => {
          if (res?.payload === 200) {
            onClosePut();
          }
        });
      }}
    >
      {({ handleChange, handleBlur }) => (
        <Form>
          <div className="form_put">
            <span style={{ marginBottom: "10px" }}>
              {formTr.quanitity[lang]}
            </span>
            <ErrorMessage name="customs" className="error" component="div" />
            <Field
              className="form__input"
              type="number"
              placeholder={formTr.quanitity[lang]}
              name="customs"
            />

            <span style={{ marginBottom: "10px" }}>{formTr.date[lang]}</span>
            <ErrorMessage name="date" className="error" component="div" />

            <Field name="date">
              {({ field }) => (
                <InputMask
                  {...field}
                  mask={formTr.dateInput.mask[lang]}
                  id="date"
                  placeholder={formTr.dateInput.plac[lang]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form__input"
                />
              )}
            </Field>
            <span style={{ marginBottom: "10px" }}>{formTr.details[lang]}</span>
            <Field
              className="form__input"
              as="textarea"
              placeholder={formTr.details[lang]}
              name="details"
            />
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClosePut}>
              Exit
            </button>
            <button type="submit">Confirm</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormPut;
