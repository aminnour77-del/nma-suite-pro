const express = require('express');
const PDFDocument = require('pdfkit');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/generate-pdf', (req, res) => {
    const data = req.body;
    const doc = new PDFDocument({ margin: 0, size: 'A4' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=Verbale_NMA_Suite_Pro.pdf');
    doc.pipe(res);
    
    // Intestazione
    doc.rect(0, 0, 595, 100).fill('#1e293b');
    doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(26).text('NMA PRECISION SUITE PRO', 50, 30);
    doc.fillColor('#4ade80').font('Helvetica').fontSize(10).text('VERBALE DI CANTIERE E COLLAUDO', 50, 65);
    
    // Dati Cantiere e GPS
    doc.moveDown(3);
    doc.fillColor('#0f172a').font('Helvetica-Bold').fontSize(14).text('COORDINATE E DATI SITO', 50, 120);
    doc.font('Helvetica').fontSize(10).text(`Coordinate GPS:`, 50, 140).font('Helvetica-Bold').fillColor('#ef4444').text(data.gps, 150, 140);
    
    // Scavi
    doc.fillColor('#334155').font('Helvetica-Bold').fontSize(12).text('1. OPERE DI SCAVO', 50, 180);
    doc.font('Helvetica').fontSize(10).fillColor('#000000');
    doc.text(`Volume Terra Stimato: ${data.scavoLunghezza}m x ${data.scavoLarghezza}m x ${data.scavoProfondita}m`, 50, 200);
    
    // Tubazioni
    doc.fillColor('#334155').font('Helvetica-Bold').fontSize(12).text('2. TUBAZIONI E SALDATURA', 50, 240);
    doc.font('Helvetica').fontSize(10).fillColor('#000000');
    doc.text(`Materiale: ${data.material} - ${data.diameter}`, 50, 260);
    doc.text(`Normativa: ${data.standard}`, 50, 280);
    
    // Posa Aerea
    doc.fillColor('#334155').font('Helvetica-Bold').fontSize(12).text('3. POSA AEREA', 50, 320);
    doc.font('Helvetica').fontSize(10).fillColor('#000000');
    doc.text(`Accesso: ${data.aereaAccesso} | Zincatura: ${data.aereaZincatura}`, 50, 340);
    
    doc.end();
});

app.listen(3000, () => console.log(`\n✅ NMA Suite PRO Attiva su http://localhost:3000\n`));
