import { GoogleSpreadsheet } from 'google-spreadsheet';
import { fromBase64 } from "../../utils/base64";

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID);

export default async (req, res) => {
    await doc.useServiceAccountAuth({
        client_email: process.env.SHEET_CLIENT_EMAIL,
        private_key: fromBase64(process.env.SHEET_PRIVATE_KEY),
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[1];
    const config = doc.sheetsByIndex[2]
    await config.loadCells('A1:A2')
    const password = config.getCellByA1('A2').value
    const data = JSON.parse(req.body);

    if (password == data.senha) {
        await sheet.addRow({
            Nome: data.Nome,
            Preços:
                'R$' +
                data.Preco.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                }),
            Descrição: data.descricao,
            Desconto: data.desconto + '%',
            PrecoFinal: (
                parseFloat(data.Preco) -
                (parseFloat(data.Preco) * data.desconto) / 100
            ),
            Foto: data.Foto,
        });


        res.json({ status: true });
    } else {
        res.json({
            status: false
        })
    }
};
