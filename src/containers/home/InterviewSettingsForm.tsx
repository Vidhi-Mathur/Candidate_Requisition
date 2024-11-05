import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";

const InterviewDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
  onSubmit: (values: IInterViewSettings) => void;
  setInterviewSettings: (settings: IInterViewSettings) => void;
}> = ({ handleTab, onSubmit, setInterviewSettings }) => {
  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode: "",
      interviewDuration: "",
      interviewLanguage: "",
    },
    validationSchema: Yup.object().shape({
        interviewMode: Yup.string().required("Interview mode is required"),
        interviewDuration: Yup.string().required("Interview duration is required"),
        interviewLanguage: Yup.string().required("Interview language is required"),
    }),
    onSubmit: (values) => {
      console.log({ 'Interview Settings': values })
      onSubmit(values)
      alert("Form successfully submitted");
    },
  });

  const selectChangeHandler = (name: string, value: string) => {
    setFieldValue(name, value);
    setInterviewSettings({ ...values, [name]: value }) 
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
      <Box position="relative" zIndex={5}>
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={selectChangeHandler}
          onBlur={setFieldTouched}
          value={values.interviewMode}
          error={errors.interviewMode}
          touched={touched.interviewMode}
        />
        </Box>
        <Box position="relative" zIndex={4}>
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={selectChangeHandler}
          onBlur={setFieldTouched}
          value={values.interviewDuration}
          error={errors.interviewDuration}
          touched={touched.interviewDuration}
        />
        </Box>
        <Box position="relative" zIndex={3}>
        <FormSelect
          label="Job Location"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={selectChangeHandler}
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
        />
        </Box>
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(1)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
