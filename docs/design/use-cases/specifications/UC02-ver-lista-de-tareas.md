| **Caso de uso**      | **Ver cola de ejecución** |
| :---        | :---        |
| **Identificador**      | UC02 |
| **Actores**      | Usuario |
| **Precondición**   | El usuario está autenticado y tiene acceso al sistema. |
| **Resultado**   | El usuario puede ver un listado de las tareas en ejecución y en espera. |

**Resumen:**
Este caso de uso describe los pasos necesarios para que el usuario pueda ver un listado de las tareas en ejecución y en espera.

**Curso normal (básico):**

| **N**      | **Acción realizada por actor** | **Acción realizada por el sistema** |
| :---        | :---        | :---        |
| 1      | En el menú principal, selecciona la opción de "Tareas". |  |
| 2      |  | Solicita al servidor las tareas del equipo creadas por su usuario. |
| 3      |  | Muestra al usuario el listado de tareas pendientes de aprobación, en cola de espera y en progreso. |

**Curso alternativo (no hay tareas programadas):**

| **N**      | **Acción realizada por actor** | **Acción realizada por el sistema** |
| :---        | :---        | :---        |
| 3a      |  | Recibe un listado vacío del servidor. |
| 3b      |  | Muestra al usuario el mensaje "La cola de tareas está vacía". |

**Curso alternativo (hay una tarea en ejecución):**

| **N**      | **Acción realizada por actor** | **Acción realizada por el sistema** |
| :---        | :---        | :---        |
| 3a      |  | Recibe un listado vacío del servidor. |
| 3b      |  | Consulta al CNC worker el estado de la ejecución de la tarea actual. |
| 3c      |  | Muestra al usuario el listado de tareas pendientes de aprobación, en cola de espera y en ejecución, junto al estado de avance de la tarea en progreso. |
