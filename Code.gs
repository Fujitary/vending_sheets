function doGet(e) {
  const sheet = SpreadsheetApp.openById('PUT_SPREADSHEET_ID').getSheetByName('Products');
  const values = sheet.getDataRange().getDisplayValues();
  const headers = values.shift().map(h => (h || '').toString().trim().toLowerCase());

  const idx = {};
  ['id','name','price','image_url','image_w','image_h','fit','active','sort'].forEach(k => {
    idx[k] = headers.indexOf(k);
  });

  const rows = values.map(r => ({
    id:       (r[idx.id] || '').toString().trim(),
    name:     (r[idx.name] || '').toString().trim(),
    price:    Number(r[idx.price] || 0),
    image_url:(r[idx.image_url] || '').toString().trim(),
    image_w:  Number(r[idx.image_w] || 120),
    image_h:  Number(r[idx.image_h] || 160),
    fit:      ((r[idx.fit] || 'contain').toString().toLowerCase() === 'cover') ? 'cover' : 'contain',
    active:   (r[idx.active] || 'TRUE').toString().toLowerCase() !== 'false',
    sort:     Number(r[idx.sort] || 9999)
  })).filter(x => x.id && x.name && x.active);

  rows.sort(function(a,b){ return a.sort - b.sort; });

  const output = ContentService.createTextOutput(JSON.stringify(rows));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
