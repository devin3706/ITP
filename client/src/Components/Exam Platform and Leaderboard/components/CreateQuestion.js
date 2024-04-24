import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray} from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { handleAddQuestion, handleChangeQuestion, handleChangeOption, handleChangeAnswer } from '../helper/helper';
import Header from './Header';
import Footer from './Footer';

const validationSchema = Yup.object().shape({
  examName: Yup.string()
    .required('Exam name is required')
    .matches(
      /^(?=.*(?:Accounting|Business Studies|Economics|Business Statistics))(?=.*(?:A\/L))(?=.*20\d{2})/,
      'Invalid exam name format. Please follow the specified format.'
    ),
  questions: Yup.array().of(
    Yup.object().shape({
      question: Yup.string()
        .required('Question is required')
        .matches(/.*\?$/, 'Question must end with a question mark (?)'),
      options: Yup.array().of(Yup.string().required('Option is required')),
    })
  ),
  answers: Yup.array().of(
    Yup.number()
      .required('Answer is required')
      .oneOf([0, 1, 2], 'Correct answer index should be between 0 and 2.')
  ),
});

const AddQuestionPage = () => {
  const initialValues = {
    examName: '',
    questions: [
      { id: 1, question: '', options: ['', '', ''] },
      { id: 2, question: '', options: ['', '', ''] },
      { id: 3, question: '', options: ['', '', ''] },
      { id: 4, question: '', options: ['', '', ''] },
      { id: 5, question: '', options: ['', '', ''] },
    ],
    answers: [null, null, null, null, null],
  };

  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    handleAddQuestion(values.examName, values.questions, values.answers, () => {
      setSubmitting(false);
    });
  };

  return (
    <div style={{ backgroundColor: '#ECF0F5' }}>
      <Header />
      <div className="container text-center col-8">
        <h2 className="alert alert-info border border-primary mt-4">Add Questions</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, values }) => (
            <Form>
              <div className="input-group mt-5">
                <label className="input-group-text text-bg-secondary border border-dark w-15" htmlFor="examName">Exam Name:</label>
                <Field type="text" id="examName" name="examName" className="form-control border border-dark" />
                <ErrorMessage name="examName" component="div" className="text-danger" />
              </div>
              <FieldArray name="questions">
                {({ push, remove }) => (
                  <>
                    {values.questions.map((question, questionIndex) => (
                      <div key={question.id} className="form-group text-center">
                        <div className="input-group mt-5">
                          <label className="input-group-text text-bg-secondary border border-dark w-15" htmlFor={`questions.${questionIndex}.question`}>Question {questionIndex + 1}:</label>
                          <Field type="text" name={`questions.${questionIndex}.question`} className="form-control border border-dark" />
                          <ErrorMessage name={`questions.${questionIndex}.question`} component="div" className="text-danger" />
                        </div>
                        <FieldArray name={`questions.${questionIndex}.options`}>
                          {({ push, remove }) => (
                            <>
                              {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="input-group align-items-center mt-3">
                                  <label className="input-group-text text-bg-secondary border border-dark w-15" htmlFor={`questions.${questionIndex}.options.${optionIndex}`}>Option:</label>
                                  <Field type="text" name={`questions.${questionIndex}.options.${optionIndex}`} className="form-control border border-dark" />
                                  <ErrorMessage name={`questions.${questionIndex}.options.${optionIndex}`} component="div" className="text-danger" />
                                </div>
                              ))}
                            </>
                          )}
                        </FieldArray>
                        <div className="input-group mt-3">
                          <label className="input-group-text text-bg-secondary border border-dark w-15" htmlFor={`answers.${questionIndex}`}>Correct Answer:</label>
                          <Field type="number" name={`answers.${questionIndex}`} className="form-control border border-dark" />
                          <ErrorMessage name={`answers.${questionIndex}`} component="div" className="text-danger" />
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </FieldArray>
              <button type="submit" className="btn btn-primary mt-3 mb-5" disabled={isSubmitting}>Add Questions</button>
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </div>
  );
};

export default AddQuestionPage;