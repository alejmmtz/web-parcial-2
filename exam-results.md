# Resultados del parcial práctico 2

Registrar resultados reales después de implementar y probar los endpoints. Sustituir los IDs de ejemplo por los utilizados.

| Petición y datos utilizados                                 | Código esperado | Código obtenido | Observación                                               |
| ----------------------------------------------------------- | --------------- | --------------- | --------------------------------------------------------- |
| Crear una reserva con datos válidos y sala existente.       | 201             | 201             |                                                           |
| Crear con participants como texto.                          | 400             | 400             |                                                           |
| Crear con una propiedad adicional, como status.             | 400             | 400             |                                                           |
| Crear con una sala inexistente.                             | 404             | 404             | Error corresponde notFound lanzado por el servicio        |
| Cancelar una reserva activa y consultar el cambio guardado. | 200             | 200 OK          |                                                           |
| Cancelar de nuevo la misma reserva.                         | 409             | 409 Conflict    | Se puede evidenciar mi mensaje de excepción personalizado |
| Intentar cancelar con ID abc.                               | 400             | 400 BadRequest  |                                                           |
| Intentar cancelar con un ID entero inexistente.             | 404             | 404 NotFound    | Error corresponde notFound lanzado por el servicio        |

## Pruebas unitarias

Registrar el resultado de `npm test`.

| Caso                                                          | Resultado obtenido                                      |
| ------------------------------------------------------------- | ------------------------------------------------------- |
| 1. La regla real rechaza una reserva cancelada.               | PASS src/reservations/reservations.service.spec.ts      |
| 2. El servicio cancela y guarda una reserva activa.           | PASS src/reservations/reservation-rules.service.spec.ts |
| 3. Si la regla simulada rechaza, conserva active y no guarda. | PASS src/reservations/reservation-rules.service.spec.ts |

Resumen de ejecución: pendiente.

| Propiedad      | Resultado obtenido    |
| -------------- | --------------------- |
| 1. Test Suites | 2 passed, 2 total     |
| 2. Tests       | 3 passed, 3 total     |
| 3. Snapshots   | 0 total               |
| 4. Time        | 1.37 s, estimated 2 s |
