import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createOrder, setSubmit } from "../../store/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { formTr } from "../../utils/translate";
import InputMask from "react-input-mask";
import "./form.css";

const FormCreateOrder = ({}) => {
  const dispatch = useDispatch();
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

    const dayMonth = dateParts[1].split(".");
    const hour = parseInt(dateParts[2], 10);
    const minute = parseInt(dateParts[3], 10);

    const currentYear = new Date().getFullYear();

    // Создаем объект Date
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
        name: "",
        customs: "",
        phone: "",
        type: "",
        date: "",
        agencyTitle: "",
        details: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().min(2, "min 2").required("required"),
        customs: Yup.string().required("required"),
        phone: Yup.string()
          // .min(12, "min 12")
          .required("required")
          .test(
            "min 12",
            "Enter phone number",
            (value) => !value || (value && !value.includes("_"))
          ),
        date: Yup.string()
          // .min(12, "min 12")
          .required("required")
          .test(
            "m",
            "Enter date",
            (value) => !value || (value && !value.includes("_"))
          ),
        type: Yup.string().required("required"),
      })}
      onSubmit={(body, actions) => {
        // collect data
        const formData = new FormData();
        Object.entries(body).map(([key, value]) => {
          if (key === "date") {
            return formData.append(`${key}`, parseCustomDateString(value));
          }
          if (key === "phone") {
            return formData.append(`${key}`, value.replace(/[^+\d]/g, ""));
          }
          return formData.append(`${key}`, value);
        });

        dispatch(createOrder(formData)).then((res) => {
          if (res?.payload?.status === 200) {
            dispatch(setSubmit(true));
            // reset form
            actions.resetForm();
          }
        });
      }}
    >
      {({ handleChange, handleBlur }) => (
        <div className="form" id="formFocus">
          <h2>{formTr.title[lang]}</h2>
          <Form>
            <ErrorMessage name="type" className="error" component="div" />
            <span>{formTr.type.title[lang]}</span>
            <div className="form-select">
              <div className="custom-radio">
                <label>
                  <Field
                    type="radio"
                    name="type"
                    value={formTr.type.privat.en}
                  />
                  <div className="custom-radio__label">
                    <span>{formTr.type.privat[lang]}</span>
                  </div>
                </label>
              </div>
              <div className="custom-radio">
                <label>
                  <Field
                    type="radio"
                    name="type"
                    value={formTr.type.guide.en}
                  />
                  <div className="custom-radio__label">
                    <span>{formTr.type.guide[lang]}</span>
                  </div>
                </label>
              </div>
            </div>

            <ErrorMessage name="name" className="error" component="div" />
            <Field
              className="form__input"
              type="text"
              placeholder={formTr.name[lang]}
              name="name"
            />
            <ErrorMessage
              name="agencyTitle"
              className="error"
              component="div"
            />
            <Field
              className="form__input"
              type="text"
              placeholder={formTr.agencyTitle[lang]}
              name="agencyTitle"
            />

            <ErrorMessage name="customs" className="error" component="div" />
            <Field
              className="form__input"
              type="number"
              placeholder={formTr.quanitity[lang]}
              name="customs"
            />

            <ErrorMessage name="phone" className="error" component="div" />
            <Field name="phone">
              {({ field }) => (
                <InputMask
                  {...field}
                  mask="+99(999) 999-9999"
                  id="phone"
                  placeholder={formTr.phone[lang]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form__input"
                />
              )}
            </Field>

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

            <Field
              className="form__input"
              as="textarea"
              placeholder={formTr.details[lang]}
              name="details"
            />

            <button className="form__submit buttonAndLink" type="submit">
              {formTr.send[lang]}
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
export default FormCreateOrder;
