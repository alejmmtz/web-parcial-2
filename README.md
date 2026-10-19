# Parcial práctico 2

Proyecto inicial de **Meeting Rooms API**, correspondiente al enunciado del parcial de reservas de salas. No es la solución. Completar únicamente **dos endpoints y tres pruebas unitarias** según el documento entregado por el docente.

## 1. Preparar y ejecutar

Requisitos: Docker Desktop abierto, Node.js compatible y Postman. Se admite Node 20 desde 20.19, Node 22 desde 22.13 y Node 24 desde 24.11. No hace falta instalar Nest CLI de forma global ni crear un proyecto nuevo.

Extraer **toda la carpeta** `parcial-practico-2` del ZIP, abrirla en el editor y ejecutar desde el directorio que contiene `package.json`:

```bash
npm ci
docker compose up -d --wait
npm run start:dev
```

Comprobar la instalación y el arranque antes de comenzar el tiempo de desarrollo. La opción `--wait` espera a que PostgreSQL esté listo. Mantener la terminal del servidor abierta durante las peticiones.

- API: `http://localhost:3003/api`.
- PostgreSQL local: puerto `5436`, base `reservations_exam`, usuario y contraseña locales `postgres`.
- No se necesita crear un `.env`. Los valores locales ya están configurados; `.env.example` es una referencia.
- La base y los puertos son distintos a los del pre parcial. No conectar este proyecto a la base de Library API.

Si un puerto está ocupado, informar al docente antes de cambiar la configuración. No detener ni borrar contenedores de otros ejercicios. Esta aplicación es solo para uso local y con datos ficticios.

### Primera comprobación

Enviar en Postman:

```text
GET http://localhost:3003/api/rooms
GET http://localhost:3003/api/reservations
```

Ambas peticiones deben responder `200`. En una base completamente vacía se crean dos salas y tres reservas:

| Reserva | Participantes | Estado | Sala |
| --- | --- | --- | --- |
| Sprint planning | 6 | active | Room A |
| Design review | 4 | active | Room B |
| Cancelled workshop | 8 | cancelled | Room A |

Obtener los IDs reales desde esas respuestas, no asumirlos. Los datos se conservan al reiniciar. El cargador de ejemplos no modifica una base que ya tenga salas o reservas.

## 2. Qué está terminado

- NestJS, TypeORM, PostgreSQL, Docker Compose y Jest.
- `RoomEntity`, `ReservationEntity`, la relación y los repositorios registrados.
- `GET /api`, `GET /api/rooms`, `GET /api/reservations` y `GET /api/reservations/:id`.
- `ReservationsService.create()`: busca la sala, lanza `NotFoundException` si no existe, asigna `active`, relaciona y guarda.
- `ReservationsService.findOne()`: busca la reserva con su sala y lanza `NotFoundException` si no existe.
- El pipe compartido `requestValidationPipe`, configurado para validar un DTO y rechazar propiedades adicionales.
- Los imports, la preparación de las pruebas y los mocks.

El proyecto inicial debe compilar. **Las rutas POST de creación y PATCH de cancelación aún no están declaradas**; pueden devolver `404` hasta completarlas. Eso no significa que la conexión a PostgreSQL falle.

No modificar la configuración, las entidades, los métodos resueltos, el cargador de datos ni el pipe compartido. No se piden nuevos endpoints para salas, búsquedas ni un CRUD completo.

## 3. Siete archivos de trabajo

Buscar `TODO` únicamente en:

1. `src/reservations/dto/create-reservation.dto.ts`
2. `src/reservations/reservations.controller.ts`
3. `src/reservations/reservations.service.ts`
4. `src/reservations/reservation-rules.service.ts`
5. `src/reservations/reservations.module.ts`
6. `src/reservations/reservation-rules.service.spec.ts`
7. `src/reservations/reservations.service.spec.ts`

Los imports que todavía no se utilizan están preparados para el desarrollo; no es necesario borrarlos para hacer funcionar el proyecto inicial.

### Crear una reserva

Completar `CreateReservationDto` y `POST /api/reservations`. Delegar en el servicio de creación ya implementado.

| Campo | Condición |
| --- | --- |
| `purpose` | Texto obligatorio, diferente de `""`, con máximo 80 caracteres. |
| `participants` | Número entero obligatorio entre 1 y 20. |
| `roomId` | Número entero obligatorio mayor o igual a 1. |

Aplicar `requestValidationPipe`. No convertir números enviados como texto. No permitir propiedades adicionales, incluido `status`; el servicio asigna el estado inicial. Respuestas: `201`, `400` o `404`, según el caso del enunciado.

### Cancelar una reserva

Completar `PATCH /api/reservations/:id/cancel`, sin body y con `ParseIntPipe` para el ID; el servicio de reglas, su registro e inyección, y `ReservationsService.cancel(id)`.

Una reserva activa debe quedar cancelada y guardada. Si ya está cancelada, debe responder `409` sin modificar ni guardar. ID inválido: `400`; reserva inexistente: `404`. La cancelación no elimina la reserva ni modifica participantes, propósito o sala.

El servicio de reglas comprueba el estado, no consulta ni guarda. El servicio principal debe respetar la regla antes de modificar. No crear dependencias manualmente con `new` dentro del servicio principal.

### Tres pruebas

Desde otra terminal, en la misma carpeta:

```bash
npm test
```

**Inicialmente fallan exactamente tres pruebas con mensajes `TODO TEST`. Es intencional.** Sustituir cada error por las comprobaciones solicitadas, conservando el `it` y la preparación de los archivos.

1. El servicio de reglas real rechaza una reserva ya cancelada mediante `ConflictException`.
2. Con dependencias simuladas, el servicio cancela una reserva activa, llama a la regla, guarda el estado y devuelve el resultado de `save()`.
3. El mock de la regla rechaza deliberadamente una reserva **activa**: el servicio propaga la excepción, conserva `active` y no llama a `save()`.

La tercera prueba comprueba la coordinación del servicio, no la regla real. No cambiar sus datos a `cancelled`. No utilizar `skip`, `todo`, `only`, casos vacíos ni sustituir el comportamiento por `toBeDefined()`. Estos tests no requieren Docker ni una base de datos.

## 4. Verificar y entregar

Usar `requests.http` como referencia para realizar las peticiones en Postman; no requiere instalar una extensión. Comprobar también por HTTP: los tests del servicio no ejecutan el controlador ni sus pipes.

Completar `exam-results.md` con los resultados obtenidos y el resumen de los tres tests. Entregar el repositorio y la rama con commits frecuentes, siguiendo las condiciones del enunciado. No incluir `node_modules`, `dist` ni `.env` privados.

Las reglas de no uso de IA del documento del parcial aplican también al trabajo con esta carpeta. Mantener nombres de entidades, atributos, métodos, archivos, rutas y tests en inglés.

Comprobaciones adicionales:

```bash
npm run build
npm run typecheck
```

No se solicitan frontend, autenticación, JWT, Passport, despliegue, librerías adicionales, pipes personalizados ni pruebas automatizadas de controladores.

Para detener únicamente la base de este proyecto conservando sus datos, ejecutar `docker compose stop` desde esta carpeta. No utilizar `down -v` para solucionar errores: eliminaría los datos del volumen. La sincronización de tablas está habilitada solo para esta base local descartable; no usar información real.
