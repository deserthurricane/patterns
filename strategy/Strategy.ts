/**
 * Контекст - конкретный класс, в котором используются
 * результаты работы алгоритма из Стратегии
 */
class RectangleContext {
  width: number;
  height: number;

  strategy: CalcStrategy;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  
  setStrategy(strategy: CalcStrategy) {
    this.strategy = strategy;
  }
  
  main() {
    const result = this.strategy.execute([this.width, this.height]);
    console.log(result);
  }
}

/**
 * Абстрактный класс Стратегия, определяющий интерфейс взаимодействия с Контекстом
 * (можно переделать ссылку на весь Контекст или же конкретные параметры из него)
 * и тип получаемого значения в результате выполнения выбранного в Контексте алгоритма
 */
abstract class CalcStrategy {
  abstract execute(sizes: [number, number]): number;
}

class SquareStrategy extends CalcStrategy {
  execute(sizes: [number, number]): number {
    return sizes[0] * sizes[1];
  }
}

class PerimeterStrategy extends CalcStrategy {
  execute(sizes: [number, number]): number {
    return (sizes[0] + sizes[1]) * 2;
  }
}

const rect = new RectangleContext(2, 3);
rect.setStrategy(new SquareStrategy());
rect.main(); // 6

rect.setStrategy(new PerimeterStrategy());
rect.main(); // 10
