import axios from 'axios';

export class ExchangeRateService {
  private static API_KEY = process.env.EXCHANGE_RATE_API_KEY || '';
  private static BASE_URL = 'https://open.er-api.com/v6/latest';

  static async convert(amount: number, from: string, to: string): Promise<number> {
    if (from === to) return amount;

    try {
      const response = await axios.get(`${this.BASE_URL}/${from}`);
      const rates = response.data.rates;

      if (!rates || !rates[to]) {
        throw new Error(`Taxa de câmbio não encontrada para a moeda ${to}`);
      }

      const rate = rates[to];
      // Tratamento de precisão com 2 casas decimais (arredondamento financeiro)
      return Math.round(amount * rate * 100) / 100;
    } catch (error) {
      throw new Error(`Erro ao buscar taxa de câmbio: ${(error as Error).message}`);
    }
  }
}
