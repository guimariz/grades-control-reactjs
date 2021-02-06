import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import * as api from '../api/apiService';

Modal.setAppElement('#root');

export default function ModalGrade({ onSave, onClose, selectedGrade }) {
  const { id, student, subject, type } = selectedGrade;
  const [gradeValue, setGradeValue] = useState(selectedGrade.value);
  const [gradeValidation, setGradeValidation] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const validation = api.getValidationFromGradeType(type);
    setGradeValidation(validation);
  }, [type]);

  useEffect(() => {
    const { minValue, maxValue } = gradeValidation;

    if (gradeValue < minValue || gradeValue > maxValue) {
      setErrorMessage(
        `O valor da nota deve ser entre ${minValue} e ${maxValue} (inclusive)`
      );
      return;
    }

    setErrorMessage('');
  }, [gradeValue, gradeValidation]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    console.log(event);
    if (event.key === '[') {
      onClose(null);
    }
  };

  const handleFormSubmit = (event) => {};

  return (
    <div>
      <Modal isOpen={true}>
        <form OnSubmit={handleFormSubmit}></form>

        <div className="input-field">
          <input id="inputName" type="text" value={student} readOnly />
          <label className="active" htmlFor="inputName">
            Nome do aluno:
          </label>
        </div>
        <div className="input-field">
          <input id="inputSubject" type="text" value={subject} readOnly />
          <label className="active" htmlFor="inputName">
            Disciplina:
          </label>
        </div>
        <div className="input-field">
          <input id="inputType" type="text" value={type} readOnly />
          <label className="active" htmlFor="inputName">
            Tipo de avaliação:
          </label>
        </div>

        <div className="input-field">
          <input
            id="inputGrade"
            type="number"
            min={gradeValidation.minValue}
            max={gradeValidation.maxValue}
          />
        </div>
      </Modal>
    </div>
  );
}
