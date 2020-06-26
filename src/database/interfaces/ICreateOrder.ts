export default interface ICreateOrder {
  userCpf: string;
  status: 'Aprovado' | 'Em validação' | 'Reprovado';
  orderValue: number;
  cashbackPercentage: number;
  cashbackValue: number;
}
