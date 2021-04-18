import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import emailjs from 'emailjs-com';

const Support = () => {

  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSubjectChange = event => {
    event.preventDefault();
    setSubject(event.target.value);
  }

  const handleContentChange = event => {
    event.preventDefault();
    setContent(event.target.value);
  }

  const sendEmail = () => {
    const templateId = 'template_ylswnko';
    const replyEmail = 'windrisapp@gmail.com'

    sendFeedback(templateId, {message: content, from_name: 'usuario', to_name: 'adm', reply_to: replyEmail})
  }

  const sendFeedback = (templateId, variables) => {
    emailjs.send(
      'service_92uu25u', templateId, 
      variables, 'user_Z5ragRN1iflFMiK6XYAUe'
      ).then(res => {
        console.log('Email successfully sent!')
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }

  const resetEmail = () => {
    setSubject('');
    setContent('');
  }


  return (
    <>
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              Enviar mensagem
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Assunto</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput 
                      onChange={handleSubjectChange} 
                      value={subject} lazy={1} 
                      id="text-input" 
                      name="text-input" 
                      placeholder="Escreva aqui o assunto" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Título</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                    onChange={handleContentChange} 
                    value={content} lazy={1} 
                      name="textarea-input" 
                      id="textarea-input" 
                      rows="9"
                      placeholder="Escreva aqui sua mensagem" 
                    />
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton onClick={sendEmail} type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton onClick={resetEmail} type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Support
