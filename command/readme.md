Паттерн "Команда" помогает разделить инициатора действия (не владеющего информацией о конкретной реализации этого действия) от исполнителя этого действия (заключающего в себе эту кокнретную реализацию). Пример: гость делает заказ в ресторане (инициатор) - официант записывает заказ и передает исполнителю (команда) - повар исполняет (получатель, исполнитель).

Команда представляет собой объект, в котором можно инкапсулировать текущее состояние. Команды можно хранить в истории, чтобы отменять или повторять. Можно делать составные команды (пользуясь паттерном "Компоновщик").