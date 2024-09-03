| **Caso de uso**   | **Restaurar tarea**                                                                                                   |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------- |
| **Identificador** | UC11                                                                                                                  |
| **Actores**       | Usuario                                                                                                               |
| **Precondición**  | El usuario está autenticado y tiene acceso al sistema.<br />Hay al menos una tarea en estado "cancelada" o "fallida". |
| **Resultado**     | El usuario cambia el estado de una tarea a "pendiente de aprobación".                                                 |

**Resumen:**
Este caso de uso describe los pasos necesarios para que el usuario pueda restaurar una tarea cancelada o fallida a su estado inicial.

**Curso normal (básico):**

| **N** | **Acción realizada por actor**                                                   | **Acción realizada por el sistema**             |
| :---- | :------------------------------------------------------------------------------- | :---------------------------------------------- |
| 1     | En la vista de "Tareas", selecciona una tarea en estado "cancelada" o "fallida". |                                                 |
| 2     | Cliquea el botón de "Restaurar".                                                 |                                                 |
| 4     |                                                                                  | Pregunta si realmente desea restaurar la tarea. |
| 5     | Selecciona la opción "Sí".                                                       |                                                 |
| 3     |                                                                                  | Envía la solicitud al servidor.                 |
| 8     |                                                                                  | Actualiza el listado de tareas.                 |

**Curso alternativo (el usuario se retracta):**

| **N** | **Acción realizada por actor** | **Acción realizada por el sistema** |
| :---- | :----------------------------- | :---------------------------------- |
| 5a    | Cliquea "No".                  |                                     |
| 5b    |                                | Cierra el mensaje de confirmación.  |
