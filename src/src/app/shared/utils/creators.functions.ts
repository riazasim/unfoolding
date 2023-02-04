import * as mime from 'mime';

export function createExcelOnlyInput(): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = `${mime.getType('.xls')},${mime.getType('.xlsx')},`;
  return input;
}

export function createCSVOnlyInput(): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = `${mime.getType('.csv')},${mime.getType('.csv')},`;
  return input;
}

export function createImageOnlyInput(): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  return input;
}
