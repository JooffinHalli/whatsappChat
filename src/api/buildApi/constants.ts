export const API_HOST = _API_HOST_;

export const DEFAULT_ERRORS = {
  connection: 'Нет связи с сервером',
  unknown: 'Неизвестная ошибка на сервере',
  wrongStatus: 'получен некорректный стутус от сервера',
  wrongHeaders: 'Получены некорректные заголовки от сервера',
  resType: 'Получен некорректный тип данных от сервера',
  typeGuard: 'Получена некорректная структура данных от сервера',
  abort: 'Запрос отменен'
} as const;