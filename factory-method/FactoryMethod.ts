/**
 * Общий интерфейс продукта - в данном случае транспортного средства
 */
interface IVehicle {
  type: string;
  deliver(): void;
}

/**
 * Конкретный класс продукта - грузовой самолет
 */
class AviaVehicle implements IVehicle {
  readonly type = 'avia';

  deliver() {
    console.log(`${this.type} vehicle has delivered your goods to the airport.`);
  }
}

/**
 * Конкретный класс продукта - поезд
 */
class RailwayVehicle implements IVehicle {
  readonly type = 'railway';

  deliver() {
    console.log(`${this.type} vehicle has delivered your goods to the railway station.`);
  }
}

/**
 * Абстрактный класс Создателя. Реализует основную бизнес-логику
 * Абстрактный метод createVehicle() требует от конкретных подклассов реализации определенного типа продукта
 */
abstract class ALogistics {
  protected abstract createVehicle(): IVehicle;

  public planDelivery() {
    const vehicle = this.createVehicle();
    vehicle.deliver();
  }
}

/**
 * Конкретный класс Создателя, соотносится с классом AviaVehicle
 */
class AviaLogistics extends ALogistics {
  createVehicle() {
    return new AviaVehicle();
  }
}

/**
 * Конкретный класс Создателя, соотносится с классом RailwayVehicle
 */
class RailwayLogistics extends ALogistics {
  createVehicle() {
    return new RailwayVehicle();
  }
}

/**
 * Клиентский код использует конкретный подкласс Создателя, который инкапсулирует тип создаваемого продукта
 */
function logisticsApp() {
  const logistics = new AviaLogistics();
  logistics.planDelivery();
}

logisticsApp();