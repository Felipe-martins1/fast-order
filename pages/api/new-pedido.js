import { GoogleSpreadsheet } from 'google-spreadsheet';
import { fromBase64 } from "../../utils/base64";

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID);

export default async (req, res) => {
    await doc.useServiceAccountAuth({
        client_email: process.env.SHEET_CLIENT_EMAIL,
        private_key: fromBase64(process.env.SHEET_PRIVATE_KEY),
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[3];
    const data = JSON.parse(req.body);

    await sheet.addRow({
        Nome: data.Nome,
        Pedido: data.Pedido,
        Valor: "R$" + data.ValorPedido,
        Endereco: data.Endereco,
        FormaPagamento: data.FormaPagamento,
        Observacoes: data.Observacao
    });
    res.json({ status: true })
}
