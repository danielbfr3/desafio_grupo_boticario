interface ICashbackParameter {
  minValue: number;
  maxValue: number;
  cashbackPercentage: number;
}

interface ICashbackResponse {
  percentage: number;
  value: number;
}

class CashbackModule {
  private cashbackParameters: ICashbackParameter[];

  constructor() {
    // Cashback values should be in a external source in future
    this.cashbackParameters = [
      {
        minValue: 0,
        maxValue: 1000,
        cashbackPercentage: 10,
      },
      {
        minValue: 1001,
        maxValue: 1500,
        cashbackPercentage: 15,
      },
      {
        minValue: 1500,
        maxValue: 9999999,
        cashbackPercentage: 15,
      },
    ];
  }

  public calculateCashback(orderValue: number): ICashbackResponse {
    let cashbackResponse: ICashbackResponse = {
      percentage: 0,
      value: 0,
    };

    this.cashbackParameters.forEach(param => {
      if (orderValue > param.minValue && orderValue <= param.maxValue) {
        const percentage = param.cashbackPercentage;
        const value = (orderValue * param.cashbackPercentage) / 100;

        cashbackResponse = {
          percentage,
          value,
        };
      }
    });

    return cashbackResponse;
  }
}

export default CashbackModule;
