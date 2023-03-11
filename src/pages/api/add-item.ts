import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const KEY = 'secret_Vfh7puQ5LEVQSvEP21bwExQdyqNwJhAuRAh2O4xc7UK';

const notion = new Client({
  auth: KEY,
});
const dbID = '92d0a4d6eb8841b8aa4217d186e104b9';

async function addItem(name: string) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: dbID },
      properties: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
type Data = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: 'No name' });
  }

  try {
    await addItem(String(name));
    res.status(200).json({ message: `Success ${name}` });
  } catch (error) {
    res.status(400).json({ message: `Fail Add ${name}` });
  }
}
