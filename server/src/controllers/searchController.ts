import { Request, Response } from 'express';
import * as fs from 'fs';

let searchTimeout: NodeJS.Timeout;
let abortController: AbortController;

const search = (req: Request, res: Response) => {
  const { email, number } = req.body;

  // Отменить предыдущий запрос, если он сушествует
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  if (abortController) {
    abortController.abort();
  }

  abortController = new AbortController();
  const { signal } = abortController;

  // Симуляция заддержки 5 секунд
  searchTimeout = setTimeout(() => {
    fs.readFile('src/users.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        if (!signal.aborted) {
          res.status(500).json({ message: 'Internal server error' });
        }
        return;
      }

      const users = JSON.parse(data);

      const filteredUsers = users.filter((user: { email: string; number: string; }) => {
        return (
          (email && user.email.toLowerCase().includes(email.toLowerCase())) ||
          (number && user.number.includes(number))
        );
      });

      if (!signal.aborted) {
        res.json(filteredUsers);
      }
    });
  }, 5000);

  signal.addEventListener('abort', () => {
    if (!res.headersSent) {
      res.status(400).json({ message: 'Search aborted' });
    }
  });
};

const cancelSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  if (abortController) {
    abortController.abort();
  }
};

export { search, cancelSearch };

