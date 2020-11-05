import { GoogleSpreadsheet } from 'google-spreadsheet'

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

export default async (req, res) => {
    try {
        await doc.useServiceAccountAuth({
            client_email: process.env.SHEET_CLIENT_EMAIL,
            private_key: process.env.SHEET_PRIVATE_KEY
        })

        await doc.loadInfo()

        const sheet = doc.sheetsByIndex[1]

        const rows = await sheet.getRows()
        const pratos = rows.map((res) => ({
            prato: res.Pratos,
            preco: res.Preços,
            desc: res.Descrição,
            desconto: res.Desconto,
            foto: res.Foto
        }))
        res.json(pratos)
    } catch (err) {
        res.json({
            status: 'carregando...'
        })
    }

}