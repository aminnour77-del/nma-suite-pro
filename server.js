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
    
    doc.rect(0, 0, 595, 100).fill('#1e293b');
    doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(26).text('NMA PRECISION SUITE PRO', 50, 30);
    doc.fillColor('#4ade80').font('Helvetica').fontSize(10).text('VERBALE DI CANTIERE E COLLAUDO', 50, 65);
    
    doc.moveDown(3);
    doc.fillColor('#0f172a').font('Helvetica-Bold').fontSize(14).text('COORDINATE E DATI SITO', 50, 120);
    doc.font('Helvetica').fontSize(10).text(`Coordinate GPS:`, 50, 140).font('Helvetica-Bold').fillColor('#ef4444').text(data.gps, 150, 140);
    
    doc.fillColor('#334155').font('Helvetica-Bold').fontSize(12).text('1. OPERE DI SCAVO E MOVIMENTO TERRA', 50, 180);
    doc.font('Helvetica').fontSize(10).fillColor('#000000');
    doc.text(`Dimensioni Trincea: ${data.scavoLunghezza}m x ${data.scavoLarghezza}m x ${data.scavoProfondita}m`, 50, 200);
    doc.font('Helvetica-Bold').fillColor('#16a34a').text(`Volume Calcolato: ${data.scavoVolume} m³`, 50, 215);
    
    doc.fillColor('#334155').font('Helvetica-Bold').fontSize(12).text('2. TUBAZIONI E TRACCIATO CAD', 50, 250);
    doc.font('Helvetica').fontSize(10).fillColor('#000000');
    doc.text(`Materiale: ${data.material} - ${data.diameter}`, 50, 270);
    doc.text(`Normativa: ${data.standard}`, 50, 285);
    doc.font('Helvetica-Bold').fillColor('#3b82f6').text(`Metratura Totale Rilevata CAD: ${data.metratura} metri`, 50, 305);
    
    doc.fillColor('#334155').font('Helvetica-Bold').fontSize(12).text('3. POSA AEREA E STAFFAGGIO', 50, 345);
    doc.font('Helvetica').fontSize(10).fillColor('#000000');
    doc.text(`Accesso: ${data.aereaAccesso} | Zincatura: ${data.aereaZincatura}`, 50, 365);
    doc.font('Helvetica-Bold').fillColor('#f59e0b').text(`Fissaggi Previsti (1 per 1.5m): ${data.staffePreviste} collari/staffe`, 50, 380);
    
    doc.fillColor('#334155').font('Helvetica-Bold').fontSize(12).text('4. DISTINTA MATERIALI (TAGLIO E SALDATURE)', 50, 420);
    doc.font('Helvetica').fontSize(10).fillColor('#000000');
    doc.text(`Barre commerciali da ordinare (6m): ${data.barre} verghe`, 50, 440);
    doc.text(`Sfrido stimato: ${data.sfrido} metri`, 50, 455);
    doc.font('Helvetica-Bold').fillColor('#ef4444').text(`Giunzioni/Saldature stimate: ${data.giunti} punti`, 50, 470);
    
    doc.end();
});

app.listen(3000, () => console.log(`\n✅ NMA Suite PRO (Motore Distinta ISO) su http://localhost:3000\n`));
