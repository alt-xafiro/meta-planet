'use client';

import { useInterval } from 'usehooks-ts';

import { useEffect, useState } from 'react';

import { getRandomNumber } from '@shared/lib';

const FREQUENCY = Math.round(1000 / 45);
const LETTERS = 'acemnorsuvwxz';
const DIGITS = '0123456789';

type MatrixUnit = {
  text: string;
  matrix: boolean;
  sentenceCase?: boolean;
};

type MatrixText = string | MatrixUnit[];

type MatrixData = {
  text: string;
  matrixText?: MatrixText;
  sentenceCase?: boolean;
};

const getRandomChar = (chars: string) =>
  chars[Math.round(getRandomNumber(0, chars.length - 1))];

const getMatrixLetter = (letter: string) => {
  if (letter.match(/[,.]/)) {
    return letter;
  }

  if (letter.match(/[0-9]/)) {
    return getRandomChar(DIGITS);
  }

  if (letter.match(/[A-Z]/)) {
    return getRandomChar(LETTERS).toUpperCase();
  }

  return getRandomChar(LETTERS);
};

const getMatrixSentence = (sentence: string, sentenceCase?: boolean) => {
  let matrixSentence = '';

  for (const letter of sentence) {
    matrixSentence += getMatrixLetter(letter);
  }

  return sentenceCase
    ? `${matrixSentence[0].toUpperCase()}${matrixSentence.slice(1).toLowerCase()}`
    : matrixSentence;
};

const getMatrixText = (matrixText: MatrixText, sentenceCase?: boolean) =>
  typeof matrixText === 'string'
    ? getMatrixSentence(matrixText, sentenceCase)
    : matrixText
        .map((sentence) =>
          sentence.matrix
            ? getMatrixSentence(sentence.text, sentence.sentenceCase)
            : sentence.text
        )
        .join('');

export const useMatrixText = (data: MatrixData, isMatrix: boolean) => {
  const [matrixText, setMatrixText] = useState<string>(data.text);

  useInterval(
    () => {
      setMatrixText(
        getMatrixText(data.matrixText ?? data.text, data.sentenceCase)
      );
    },
    isMatrix ? FREQUENCY : null
  );

  useEffect(() => {
    if (!isMatrix) {
      setMatrixText(data.text);
    }
  }, [data, isMatrix]);

  return matrixText;
};
