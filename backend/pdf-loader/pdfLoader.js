import fs from "fs";
import he from "he";
import PDFParser from "pdf2json";

const pdfParser = new PDFParser(this,1);

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    console.log(pdfParser.getRawTextContent())
    const textByPage = []
    for (let page of pdfData.Pages) {
        let text = []
        for (let line of page.Texts) {
            text.push(decodeURIComponent(line.R[0].T))
        }
        textByPage.push(text)
    }
    var inProgressStart, inProgressEnd
    for (let [i, textSegment] of textByPage.entries()) {
        if (textSegment == 'In-progress') {
            inProgressStart = i+2
        } else if (textSegment.includes('Degree Requirements')){
            inProgressEnd = i-1
        }
    }
    fs.writeFile("./content.txt", JSON.stringify(textByPage, false, ' '), ()=>{console.log("Done.");});
});

pdfParser.loadPDF("./dashboard.pdf");