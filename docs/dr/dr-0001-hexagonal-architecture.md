# DR-0001: Separación hexagonal del frontend

## Estado

Propuesto

## Contexto

La aplicación actual es una única app Next.js, con la lógica de negocio distribuida entre páginas, hooks, contextos y servicios técnicos. Esto hace que la UI, el framework y las dependencias del navegador queden acopladas a decisiones que deberían poder evolucionar de forma independiente.

Hoy existen señales claras de ese acoplamiento:

- `apiRequest()` y `getEventSource()` encapsulan acceso remoto y composición de URLs en `src/services/apiService.ts`
- `useAuth()` mezcla navegación, validación remota y lectura de sesión en `src/hooks/useauth.ts`
- los providers de `src/contexts` concentran estado, side effects y acceso a APIs
- las páginas de negocio de `src/app/(authenticated)` hacen orquestación y render al mismo tiempo
- los tests unitarios actuales dependen en gran medida de mocks de módulos y patching de funciones

## Decisión

Adoptar una arquitectura hexagonal dentro de la misma app Next.js, reorganizando el código en tres zonas principales:

- dominio: reglas, entidades y puertos
- aplicación: casos de uso y orquestación
- infraestructura: clientes técnicos, persistencia, HTTP, streaming y otros detalles de plataforma

La UI de Next/React quedará como capa de presentación y composición.

Además:

- los puertos y contratos se definirán en el lado de dominio/aplicación
- las implementaciones técnicas se expondrán como clientes o implementaciones de puerto
- los tests del dominio usarán stubs o dobles de prueba in-memory en lugar de parchear funciones globales o módulos cuando sea posible
- los tests E2E seguirán usando Playwright, pero la lógica de negocio deberá quedar fuera del alcance de esos tests

## Consecuencias

### Positivas

- el dominio podrá probarse de forma aislada
- se reducirá el acoplamiento con React, Next y `window`/`localStorage`
- cualquier migración futura de framework de UI será menos costosa
- será más simple introducir nuevos clientes técnicos para HTTP, sesión o streaming
- el diseño quedará documentado y trazable

### Negativas

- habrá una migración incremental con duplicación temporal de puntos de entrada
- será necesario introducir mappers entre contratos de API y modelos de dominio
- algunas pruebas existentes deberán reescribirse para usar stubs en vez de mocks de implementación
- la organización inicial tendrá más carpetas y más abstracciones

## Criterios de aceptación

- la app sigue compilando y funcionando como antes
- los tests existentes siguen pasando o se actualizan sin perder cobertura útil
- la capa de presentación deja de ser la única responsable de la lógica de negocio
- los nuevos nombres dejan clara la diferencia entre puerto, cliente e infraestructura

## Alternativas consideradas

1. mantener la estructura actual y sólo mejorar tests
2. mover todo a un monorepo
3. adoptar una arquitectura por capas clásica sin puertos explícitos

Las tres fueron descartadas porque no resuelven el acoplamiento entre dominio y framework con el nivel de separación buscado.

## Próximos pasos

- crear la estructura base de dominio, aplicación e infraestructura
- extraer el cliente de API y el cliente de sesión
- mover gradualmente la lógica de `useAuth()`, `ItemsProvider` y los providers relacionados hacia casos de uso
- actualizar los tests unitarios para que los stubs vivan junto al dominio
- revisar los E2E para mantenerlos centrados en flujos completos
