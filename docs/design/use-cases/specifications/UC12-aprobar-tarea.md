| **Caso de uso**   | **Aprobar tarea**                                                |
| :---------------- | :--------------------------------------------------------------- |
| **Identificador** | UC12                                                             |
| **Actores**       | Administrador                                                    |
| **Precondición**  | Hay al menos una solicitud de ejecución de un usuario.           |
| **Resultado**     | El usuario puede ver un listado de las solicitudes y aprobarlas. |

**Resumen:**
Este caso de uso describe los pasos necesarios para que un administrador pueda ver un listado de las solicitudes de ejecución (tareas en estado "pendiente de aprobación") de los usuarios y aprobarlas.

**Curso normal (básico):**

| **N** | **Acción realizada por actor**                                                     | **Acción realizada por el sistema**           |
| :---- | :--------------------------------------------------------------------------------- | :-------------------------------------------- |
| 1     | En la vista de "Tareas", selecciona una tarea en estado "pendiente de aprobación". |                                               |
| 2     | Cliquea el botón de "Aprobar".                                                     |                                               |
| 3     |                                                                                    | Pregunta si realmente desea aprobar la tarea. |
| 4     | Selecciona la opción "Sí".                                                         |                                               |
| 5     |                                                                                    | Envía la solicitud al servidor.               |
| 6     |                                                                                    | Actualiza el listado de tareas.               |
