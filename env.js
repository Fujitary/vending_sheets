// Rename this file to env.js and fill in your Sheet endpoint.
// MODE 1: Google Sheets Visualization API (Publish to web)
//   window.DATA_MODE = 'gviz';
//   window.SHEET_URL = 'https://docs.google.com/spreadsheets/d/XXXX/gviz/tq?tqx=out:json&sheet=Products';
//
// MODE 2: Plain JSON endpoint (e.g. Apps Script returning JSON array)
//   window.DATA_MODE = 'json';
//   window.SHEET_URL = 'https://script.google.com/macros/s/XXXX/exec';

// env.js（タブ名だけ差し替え）
const SHEET_ID = '10SwDaVpPFzcSapTrjaNZYKXdOAz5mPr7qKz5kOQOFb4';
const SHEET_TAB = 'Products'; // ← タブ名をここに（例: 'Sheet1' や 'シート1' でもOK）

window.DATA_MODE = 'gviz';
window.SHEET_URL =
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_TAB)}`;
